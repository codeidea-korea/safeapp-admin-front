let CHECK_NICK = false;
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

// 휴대폰 번호 onchange 이벤트
function changePhone() {
    CHECK_PHONE01 = false;
    CHECK_PHONE02 = false;
}

// 중복확인
function checkNick() {
    $('.error').hide();
    const $nick = $('#nick');
    const $error = $nick.parent().find('.error');

    if(isNickname($nick.val())) {
        // TODO : 닉네임 중복 확인 로직

        CHECK_NICK = true;
        $error.text('사용 가능한 닉네임입니다.');
        $error.show();

    }else {
        $error.text('닉네임은 2~16자의 영소문자 또는 한글 또는 숫자로 입력해주세요.');
        $error.show();
    }
}

// 인증요청
function sendMsg() {
    $('.error').hide();
    CHECK_PHONE01 = false;
    const $phone = $('#phone');

    if(isPhone($phone.val())) {
        // TODO : 휴대폰 번호 인증 요청

        setTimer();
        CHECK_PHONE01 = true;
        $('#phone_btn01').attr("disabled", true);

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
        // TODO : 휴대폰 인증번호 확인

        timerOff(function() {
            CHECK_PHONE02 = true;
            $('.timer').hide();
            $('#phone_btn01').attr("disabled", false);
            $error.text('인증되었습니다.');
            $error.show();
        });
    }
}

// 타이머
function setTimer() {
    const $timer = $('.timer');
    $timer.text('');
    $timer.show();

    timerOn(5, $timer, function() {
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
        modalConfirm('등록을 진행하시겠습니까?', '취소', '등록', function() {
            // TODO : 관리자 등록

            /*commonAjax(
                'GET',
                '/users?pageNo='+PAGE_NO+'&pageSize='+PAGE_SIZE,
                false,
                false,
                {},
                function(response) {
                    console.log('response',response);
                    result = response.data;
                },
                function(error) {
                    console.log('error',error);
                });*/

            let submitData = {};
            submitData['nickname'] = $nick.val();
            submitData['email'] = $email.val();
            submitData['password'] = $password.val();
            submitData['username'] = $username.val();
            submitData['phone'] = $phone.val();
            submitData['comments'] = $('#text_word').val();
            submitData['other_checkbox01'] = $('.other_checkbox:eq(0)').is(':checked') ? 'Y' : 'N';
            submitData['other_checkbox02'] = $('.other_checkbox:eq(1)').is(':checked') ? 'Y' : 'N';
            submitData['other_checkbox03'] = $('.other_checkbox:eq(2)').is(':checked') ? 'Y' : 'N';

            console.log(submitData)

            modalAlert('등록되었습니다.',function() {
                location.href='main.html?menu=adm_manager_list';
            });
        })
    }
}