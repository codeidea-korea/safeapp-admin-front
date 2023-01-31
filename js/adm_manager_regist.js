let CHECK_NICK = false;
let CHECK_EMAIL = false;
let CHECK_PHONE01 = false;
let CHECK_PHONE02 = false;

$(function() {
    // 체크박스 이벤트 활성화
    setCheckboxEvent($('.all_checkbox'),$('.other_checkbox'), $('#joinAgree'));
})

// 아이디 onchange 이벤트
function changeNick() {
    CHECK_NICK = false;
}

// 이메일 onchange 이벤트
function changeEmail() {
    CHECK_EMAIL = false;
}

// 휴대폰 번호 onchange 이벤트
function changePhone() {
    CHECK_PHONE01 = false;
    CHECK_PHONE02 = false;
}

// 닉네임 중복확인
function checkNick() {
    $('.error').hide();
    const $nick = $('#nick');
    const $error = $nick.parent().find('.error');

    if(isNickname($nick.val())) {
        commonAjax(
            'GET',
            '/admin/chkAdminId/'+$nick.val(),
            false,
            false,
            {},
            function(response) {
                if(response.data) {
                    CHECK_NICK = true;
                    $error.text('사용 가능한 닉네임입니다.');
                    $error.show();
                }else {
                    CHECK_NICK = false;
                    $error.text('이미 사용중인 닉네임입니다.');
                    $error.show();
                }
            },
            function(error) {

            });

    }else {
        $error.text('닉네임은 2~16자의 영소문자 또는 한글 또는 숫자로 입력해주세요.');
        $error.show();
    }
}

// 이메일 중복확인
function checkEmail() {
    $('.error').hide();
    const $email = $('#email');
    const $error = $email.parent().find('.error');

    if(isEmail($email.val())) {
        commonAjax(
            'GET',
            '/admin/chkEmail/'+$email.val(),
            false,
            false,
            {},
            function(response) {
                if(response.data) {
                    CHECK_EMAIL = true;
                    $error.text('사용 가능한 이메일입니다.');
                    $error.show();
                }else {
                    CHECK_EMAIL = false;
                    $error.text('이미 사용중인 이메일입니다.');
                    $error.show();
                }
            },
            function(error) {

            });

    }else {
        $error.text('이메일을 다시 확인해주세요.');
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
            '/admin/reqNum?phoneNo='+$phone.val(),
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
            '/admin/resNum?authNo='+$msgNo.val()+'&phoneNo='+$('#phone').val(),
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
    const $nick = $('#nick');
    const $email = $('#email');
    const $password = $('#password');
    const $confirm_password = $('#confirm_password');
    const $username = $('#username');
    const $phone = $('#phone');
    const $agree = $('#agree');

    if(!CHECK_NICK) {
        const $error = $nick.parent().find('.error');
        $error.text('닉네임 중복확인을 해주세요.');
        $error.show();
        $nick.focus();

    }else if(!CHECK_EMAIL) {
        const $error = $email.parent().find('.error');
        $error.text('이메일 중복확인을 해주세요.');
        $error.show();
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
        modalConfirm('등록을 진행하시겠습니까?', '취소', '등록', function() {
            let submitData = {};
            submitData['admin_id'] = $nick.val();
            submitData['admin_name'] = $username.val();
            submitData['admin_type'] = 0;
            submitData['email'] = $email.val();
            submitData['marketing_allowed'] = $('.other_checkbox:eq(2)').is(':checked') ? 0 : 1;
            submitData['memo'] = $('#text_word').val();
            submitData['password'] = $password.val();
            submitData['phone_no'] = $phone.val();

            commonAjax(
                'POST',
                '/admin/add',
                true,
                false,
                submitData,
                function(response) {
                    if(response && response.id) {
                        modalAlert('등록되었습니다.',function() {
                            location.href='main.html?menu=adm_manager_list';
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