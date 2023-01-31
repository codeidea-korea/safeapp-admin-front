$(function() {
    $("#email, #password").on("keyup",function(key){
        if(key.keyCode === 13) login();
    });
})

function login() {
    $('.error').hide();

    const username = $('#email').val();
    const password = $('#password').val();

    if(!username) {
        const $error = $('#email').parent().find('.error');
        $error.text('이메일을 입력하세요.');
        $error.show();

    }else if(!password) {
        const $error = $('#password').parent().find('.error');
        $error.text('비밀번호를 입력하세요.');
        $error.show();

    }else {
        commonAjax(
            'POST',
            '/login?email='+username+'&password='+password,
            false,
            false,
            {},
            function(response) {
                let result = response.data;
                let userInfo = {};

                userInfo['access_token'] = result.access_token;
                // userInfo['refresh_token'] = result.refresh_token;
                userInfo['expired_at'] = result.expired_at;
                userInfo['id'] = result.id;
                userInfo['admin_id'] = result.admin_id;
                userInfo['type'] = result.type;
                userInfo['email'] = result.email;
                userInfo['admin_name'] = result.admin_name;

                localStorage.setItem('userInfo',JSON.stringify(userInfo));
                location.href='main.html?menu=adm_member';

            }, function(response) {
                response = response.responseJSON;

                if(!response.result) {
                    const $error = $('#password').parent().find('.error');
                    
                    if(response.msg.includes('로그인 정보가 일치하지 않습니다.')) {
                        $error.text('입력하신 로그인 정보가 일치하지 않습니다.');
                        $error.show();

                    }else if(response.msg.includes('정보가')) {
                        $error.text('정보가 존재하지 않습니다.');
                        $error.show();
                    }
                }
            }
        );
    }
}