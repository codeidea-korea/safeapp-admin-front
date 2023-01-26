let CHECK_PHONE01 = true;
let CHECK_PHONE02 = true;
let ORG_PHONE = '';
let PK = 0;
let USER_INFO = {};

$(function() {
    init();
});

// 최초 실행 함수
function init() {
    setInfo();
}

// 회원정보, 프로젝트 목록 탭 클릭 이벤트
function moveTab(type) {
    const url = type === 1 ? 'main.html?menu=adm_member_adj' : 'main.html?menu=adm_member_project';
    location.href = url + '&pk='+PK;
}

// 사용자 정보 뿌려주기
function setInfo() {
    const data = getInfo();

    $('#id').text(data.user_id);
    $('#email').val(data.email);
    $('#phone').val(data.phone_no);
    ORG_PHONE = data.phone_no;
    $('#username').val(data.user_name);

    $('#table02_01').text(data.created_at.substring(0,10));
    $('#table02_02').text('???');
    $('#table02_03').text('???');
    $('#table02_05').text('???');
    $('#table02_06').text('???');

    $('#table03_01').text('회원가입 : 동의함');
    $('#table03_02').text('회원가입 : 동의함');
    if(data.marketing_allowed === 'Y') {
        $('#table03_03 input[type=radio]:eq(0)').attr('checked',true);
    }else {
        $('#table03_03 input[type=radio]:eq(1)').attr('checked',true);
    }
    $('#table03_04').text('멤버십 결제 : ' + '???');
}

// 사용자 정보 가져오기
function getInfo() {
    PK = new URL(window.location.href).searchParams.get('pk');
    let result = {};

    commonAjax(
        'GET',
        '/user/find/'+PK,
        false,
        false,
        {},
        function(response) {
            result = response.data;
            USER_INFO = result;
        },
        function(error) {

        });

    return result;
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
            '/user/editPass?newPass1='+$('#password01').val()+'&newPass2='+$('#password02').val()+'&userID='+$('#id').text(),
            false,
            false,
            {},
            function(response) {
                if(response.result) {
                    openModal('confirm');
                }
            },
            function(error) {
                let msg = error.responseJSON;

                if(msg) {
                    msg = msg.msg;

                    if(msg.includes('400')) {
                        modalAlert('비밀번호가 일치하지 않습니다.');
                    }
                }
            });
    }
}

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
        commonAjax(
            'GET',
            '/user/requestNumber?phoneNo='+$phone.val(),
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
            '/user/responseNumber?authNo='+$msgNo.val()+'&phoneNo='+$('#phone').val(),
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

    const $email = $('#email');
    const $phone = $('#phone');
    const $username = $('#username');

    if(!isEmail($email.val())) {
        $email.parent().find('.error').show();
        $email.focus();

    }else if((Number(ORG_PHONE) !== Number($phone.val())) && (!CHECK_PHONE01 || !CHECK_PHONE02)) {
        const $error = $('#msg_no').parent().find('.error');
        $error.text('휴대폰 인증을 진행하세요.');
        $error.show();
        $phone.focus();

    }else if(!isName($username.val())) {
        $username.parent().find('.error').show();
        $username.focus();

    }else {
        modalConfirm('회원정보를 저장하시겠습니까?', '취소', '저장', function() {
            let submitData = {};
            submitData['id'] = PK;
            submitData['email'] = $email.val();
            submitData['phone_no'] = $phone.val();
            submitData['user_name'] = $username.val();
            submitData['marketing_allowed'] = $('input[name=check2]:checked').val();

            /*USER_INFO.email = $email.val();
            USER_INFO.user_name = $username.val();
            USER_INFO.phone_no = $phone.val();
            USER_INFO.marketing_allowed = $('input[name=check2]:checked').val();*/

            commonAjax(
                'PUT',
                '/user/edit',
                true,
                false,
                submitData,
                function(response) {
                    const result = response.data;

                    if(result && result.id) {
                        modalAlert('수정되었습니다.',function() {
                            location.reload();
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