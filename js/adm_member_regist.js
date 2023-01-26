let CHECK_ID = false;
let CHECK_PHONE01 = false;
let CHECK_PHONE02 = false;

$(function() {
    // 체크박스 이벤트 활성화
    setCheckboxEvent($('.all_checkbox'),$('.other_checkbox'), $('#joinAgree'));
})

// 아이디 onchange 이벤트
function changeId() {
    CHECK_ID = false;
}

// 휴대폰 번호 onchange 이벤트
function changePhone() {
    CHECK_PHONE01 = false;
    CHECK_PHONE02 = false;
}

// 중복확인
function checkId() {
    $('.error').hide();
    const $id = $('#id');
    const $error = $id.parent().find('.error');

    if(isId($id.val())) {
        commonAjax(
            'GET',
            '/user/chk/'+$id.val(),
            false,
            false,
            {},
            function(response) {
                const result = response.data;
                if(result) {
                    CHECK_ID = true;
                    $error.text('사용 가능한 아이디입니다.');
                    $error.show();
                }else {
                    CHECK_ID = false;
                    $error.text('이미 사용중인 아이디입니다.');
                    $error.show();
                }
            },
            function(error) {

            });

    }else {
        $error.text('아이디는 5~20자의 영소문자 혹은 영소문자, 숫자 조합으로 입력해주세요.');
        $error.show();
    }
}

// 인증요청
function sendMsg() {
    $('.error').hide();
    CHECK_PHONE01 = false;
    const $phone = $('#phone');

    if(isPhone($phone.val())) {
        commonAjax(
            'GET',
            '/user/reqNum?phoneNo='+$phone.val(),
            false,
            false,
            {},
            function(response) {
                if(response.data) {
                    setTimer();
                    CHECK_PHONE01 = true;
                    $('#phone_btn01').attr("disabled", true);
                }
            },
            function(error) {

            });

    }else {
        $phone.parent().find('.error').show();
    }
}

// 인증확인
function confirmMsg() {
    $('.error').hide();
    CHECK_PHONE02 = false;

    const $msgNo = $('#msg_no');
    const $error = $msgNo.parent().find('.error');

    if(!CHECK_PHONE01) {
        $error.text('인증요청을 진행하세요.');
        $error.show();

    }else if(!isNum($msgNo.val())) {
        $error.text('인증번호를 확인하세요.');
        $error.show();

    }else {
        commonAjax(
            'POST',
            '/user/resNum?authNo='+$msgNo.val()+'&phoneNo='+$('#phone').val(),
            false,
            false,
            {},
            function(response) {
                const result = response.data;
                if(result) {
                    timerOff(function() {
                        CHECK_PHONE02 = true;
                        $('.timer').hide();
                        $('#phone_btn01').attr("disabled", false);
                        $error.text('인증되었습니다.');
                        $error.show();
                    });
                }else {
                    $error.text('인증번호가 일치하지 않습니다.');
                    $error.show();
                }
            },
            function(error) {

            });
    }
}

// 타이머
function setTimer() {
    const $timer = $('.timer');
    $timer.text('');
    $timer.show();

    timerOn(60, $timer, function() {
        CHECK_PHONE01 = false;
        $timer.hide();
        $('#phone_btn01').attr("disabled", false);

        const $error = $('#msg_no').parent().find('.error');
        $error.text('인증요청을 다시 진행하세요.');
        $error.show();
    });
}

// 등록
function save() {
    $('.error').hide();
    const $id = $('#id');
    const $email = $('#email');
    const $password = $('#password');
    const $confirm_password = $('#confirm_password');
    const $username = $('#username');
    const $phone = $('#phone');
    const $agree = $('#agree');

    if(!CHECK_ID) {
        const $error = $id.parent().find('.error');
        $error.text('아이디 중복확인을 해주세요.');
        $error.show();
        $id.focus();

    }else if(!isEmail($email.val())) {
        $email.parent().find('.error').show();
        $email.focus();

    }else if(!isPassword($password.val())) {
        $password.parent().find('.error').show();
        $password.focus();

    }else if(!isPassword($confirm_password.val())) {
        const $error = $confirm_password.parent().find('.error');
        $error.text('8~16자의 영문자, 숫자를 조합하여 입력해주세요.');
        $error.show();
        $confirm_password.focus();

    }else if($password.val() !== $confirm_password.val()) {
        const $error = $confirm_password.parent().find('.error');
        $error.text('비밀번호가 일치하지 않습니다.');
        $error.show();
        $confirm_password.focus();

    }else if(!isName($username.val())) {
        $username.parent().find('.error').show();
        $username.focus();

    }else if(!CHECK_PHONE01 || !CHECK_PHONE02) {
        const $error = $('#msg_no').parent().find('.error');
        $error.text('휴대폰 인증을 진행하세요.');
        $error.show();
        $phone.focus();

    }else if(!$('.other_checkbox:eq(0)').is(':checked') || !$('.other_checkbox:eq(1)').is(':checked')) {
        $agree.parent().find('.error').show();
        $agree.focus();

    }else {
        modalConfirm('회원등록을 진행하시겠습니까?', '취소', '등록', function() {
            let submitData = {};
            submitData['user_id'] = $id.val();
            submitData['email'] = $email.val();
            submitData['password'] = $password.val();
            submitData['user_name'] = $username.val();
            submitData['phone_no'] = $phone.val();
            submitData['marketing_allowed'] = $('.other_checkbox:eq(2)').is(':checked') ? 'Y' : 'N';

            commonAjax(
                'POST',
                '/user/add',
                true,
                false,
                submitData,
                function(response) {
                    if(response.id) {
                        modalAlert('등록되었습니다.',function() {
                            location.href='main.html?menu=adm_member';
                        });
                    }else {
                        modalAlert('오류가 발생하였습니다.');
                    }
                },
                function(error) {

                });
        })
    }
}