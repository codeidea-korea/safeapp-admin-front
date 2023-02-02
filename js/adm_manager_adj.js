let CHECK_NICK = true;
let CHECK_PHONE01 = true;
let CHECK_PHONE02 = true;
let ORG_NICK = '';
let ORG_PHONE = '';
let PK = 0;

$(function() {
    init();
});

// 최초 실행 함수
function init() {
    setInfo();
}

// 사용자 정보 뿌려주기
function setInfo() {
    PK = new URL(window.location.href).searchParams.get('pk');
    commonAjax(
        'GET',
        '/admin/find/'+PK,
        false,
        false,
        {},
        function(response) {
            $('#nick').val(response.admin_id);
            $('#email').text(response.email);
            $('#username').val(response.admin_name);
            $('#phone').val(response.phone_no);
            $('#text_word').val(response.memo);

            ORG_NICK = response.admin_id;
            ORG_PHONE = response.phone_no;
        },
        function(error) {

        });
}

// 닉네임 onchange 이벤트
function changeNick() {
    CHECK_NICK = false;
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
                const result = response.data;
                if(result) {
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

// 비밀번호 변경
function updatePassword() {
    $('.layerpop .error').hide();

    if(!isPassword($('#password01').val())) {
        $('#password01').parent().find('.error').show();

    }else if(!isPassword($('#password02').val())) {
        const $error = $('#password02').parent().find('.error');
        $error.text('8~16자의 영문자, 숫자를 조합하여 입력해주세요.');
        $error.show();

    }else if($('#password01').val() !== $('#password02').val()) {
        const $error = $('#password02').parent().find('.error');
        $error.text('비밀번호가 일치하지 않습니다.');
        $error.show();

    }else {
        commonAjax(
            'PATCH',
            '/admin/editPass?newPass1='+$('#password01').val()+'&newPass2='+$('#password02').val()+'&adminId='+ORG_NICK,
            false,
            false,
            {},
            function(response) {
                if(response.result) {
                    openModal('confirm');
                }
            },
            function(error) {

            });
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

// 저장
function save() {
    $('.error').hide();

    const $nick = $('#nick');
    const $email = $('#email');
    const $phone = $('#phone');
    const $username = $('#username');

    if(ORG_NICK !== $nick.val() && !CHECK_NICK) {
        const $error = $nick.parent().find('.error');
        $error.text('닉네임 중복확인을 해주세요.');
        $error.show();
        $nick.focus();

    }else if(!isName($username.val())) {
        $username.parent().find('.error').show();
        $username.focus();

    }else {
        modalConfirm('정보를 저장하시겠습니까?', '취소', '저장', function() {
            let submitData = {};
            submitData['admin_id'] = $nick.val();
            submitData['admin_name'] = $username.val();
            submitData['email'] = $('#email').text();
            submitData['phone_no'] = $phone.val();
            submitData['memo'] = $('#text_word').val();

            commonAjax(
                'PUT',
                '/admin/edit/'+PK,
                true,
                false,
                submitData,
                function(response) {
                    if(response && response.id) {
                        modalAlert('저장되었습니다.',function() {
                            location.reload();
                        });
                    }else {
                        modalAlert('오류가 발생하였습니다.');
                    }
                },
                function(error) {

                });
        });
    }
}