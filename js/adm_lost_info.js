// 이메일 찾기
function findEmail() {
    $('.error').hide();

    const $username = $('#username');
    const $phone = $('#phone');

    if(!isName($username.val())) {
        $username.parent().find('.error').show();
        $username.focus();

    }else if(!isPhone($phone.val())) {
        $phone.parent().find('.error').show();
        $phone.focus();

    }else {
        // TODO : 이메일 찾기

        // result : 통신 후 response 데이터 담아주기
        const result = true;
        changeContents(result);
    }
}

// 이메일 찾기 후 컨텐츠 내용 변경
function changeContents(result) {
    let contents = ``;

    if(result) {
        // 일치하는 이메일이 존재하면
        contents = `회원님의 이메일은 <span class="fwb">abc123 4@abcd.com 입니다.</span>`;

    }else {
        // 일치하는 이메일이 존재하지 않으면
        contents = `일치하는 정보가 없습니다.`;
    }

    $('.cont_area').html(
        `
        <div id="tab1" class="statis_cont" style="display:block;">
            <div class="lgn_box form_table mt30">
                <p class="fs-xlg tac mt30">${contents}</p>
                <div class="tac mt30">
                    <span class="btn btn_m" onclick="goLogin()">로그인 페이지로 이동</span>
                </div>
            </div>
        </div>
        `
    );
}

// 로그인 화면으로
function goLogin() {
    location.href='main.html?menu=adm_login';
}