let CHECK_PHONE01 = false;
let CHECK_PHONE02 = false;
let USER_PK = 0;

// 휴대폰 번호 onchange 이벤트
function changePhone() {
    CHECK_PHONE01 = false;
    CHECK_PHONE02 = false;
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

// 비밀번호 재설정
function checkUser() {
    $('.error').hide();

    const $email = $('#email');
    const $username = $('#username');

    if(!isEmail($email.val())) {
        $email.parent().find('.error').show();

    }else if(!isName($username.val())) {
        $username.parent().find('.error').show();

    }else if(!CHECK_PHONE01 || !CHECK_PHONE02) {
        const $error = $('#msg_no').parent().find('.error');
        $error.text('휴대폰 인증을 진행하세요.');
        $error.show();

    }else {
        // TODO : 비밀번호 재설정

        if(true) {
            // 계정이 존재한다면
            USER_PK = 1;
            setResetPasswordForm();

        }else {
            // 계정이 존재하지 않는다면
            modalAlert('계정이 존재하지 않습니다.');

        }
    }
}

// 비밀번호 재설정 엘리먼트 셋팅
function setResetPasswordForm() {
    $('.cont').html(
        `
        <div class="box">
            <div class="box-header well" data-original-title="">
                <h2 class="fs-xlg">비밀번호 재설정</h2>
            </div>
            <div class="box-content">
                <div class="lgn_box form_table mt30">
                    <form>
                        <table class="mb30">
                            <tbody>
                            <tr>
                                <td class="bg">새 비밀번호</td>
                                <td>
                                    <input type="password" id="password" name="password" autocomplete="off" placeholder="비밀번호를 입력해주세요.">
                                    <label class="error" style="display: none">8~16자의 영문자, 숫자를 조합하여 입력해주세요.</label>
                                </td>
                            </tr>
                            <tr>
                                <td class="bg">비밀번호 확인</td>
                                <td>
                                    <input type="password" id="confirm_password" name="confirm_password" autocomplete="off" placeholder="비밀번호를 다시 입력해주세요.">
                                    <label class="error" style="display: none">비밀번호가 일치하지 않습니다.</label>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </form>

                    <div class="tac">
                        <input type="button" class="submit form_btn btn btn_m" value="확인" onclick="resetPassword()">
                    </div>
                </div>
            </div>
        </div>
        `
    );
}

// 비밀번호 재설정
function resetPassword() {
    $('.error').hide();

    const $password = $('#password');
    const $confirm_password = $('#confirm_password');

    if(!isPassword($password.val())) {
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

    }else {
        // TODO : 비밀번호 재설정
        // USER_PK 이용

        modalAlert('비밀번호가 변경되었습니다.', function() {
           location.href='/main.html?menu=adm_login';
        });
    }
}