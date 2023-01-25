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
    // TODO : Admin 정보 가져오기
    PK = new URL(window.location.href).searchParams.get('pk');

    setInfo();
}

// 사용자 정보 뿌려주기
function setInfo(data) {
    // TODO : 데이터 바인딩

    $('#nick').val('111');
    ORG_NICK = '111';
    $('#email').val(222);
    $('#username').val(333);
    $('#phone').val(1234567890);
    ORG_PHONE = 1234567890;
    $('#text_word').val('asdfasdfasd');
}

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
        // TODO : 비밀번호 변경 로직

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

        openModal('confirm');
    }
}

// 인증요청
function sendMsg() {
    $('.error').hide();
    CHECK_PHONE01 = false;
    const $phone = $('#phone');

    if(isPhone($phone.val())) {
        // TODO : 인증 요청 로직

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
        // TODO : 인증 확인 로직

        timerOff(function() {
            CHECK_PHONE02 = true;
            $('.timer').hide();
            $('#phone_btn01').attr("disabled", false);
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
    const $phone = $('#phone');
    const $username = $('#username');

    if(ORG_NICK !== $nick.val() && !CHECK_NICK) {
        const $error = $nick.parent().find('.error');
        $error.text('닉네임 중복확인을 해주세요.');
        $error.show();
        $nick.focus();

    }else if(!isEmail($email.val())) {
        $email.parent().find('.error').show();
        $email.focus();

    }else if(!isName($username.val())) {
        $username.parent().find('.error').show();
        $username.focus();

    }else if((Number(ORG_PHONE) !== Number($phone.val())) && (!CHECK_PHONE01 || !CHECK_PHONE02)) {
        const $error = $('#msg_no').parent().find('.error');
        $error.text('휴대폰 인증을 진행하세요.');
        $error.show();
        $phone.focus();

    }else {
        modalConfirm('정보를 저장하시겠습니까?', '취소', '저장', function() {
            // TODO : Admin 정보 수정 로직

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
            submitData['pk'] = PK;
            submitData['nickname'] = $nick.val();
            submitData['email'] = $email.val();
            submitData['username'] = $username.val();
            submitData['phone'] = $phone.val();
            submitData['comments'] = $('#text_word').val();

            console.log(submitData)

            modalAlert('저장되었습니다.',function() {
                location.reload();
            });
        });
    }
}