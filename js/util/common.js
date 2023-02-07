const SERVER_URL = 'https://api.admin.safeapp.codeidea.io';

setContents();

// 페이지 내용 셋팅
function setContents() {
    let menu = new URL(window.location.href).searchParams.get('menu');
    if(!menu) menu = 'adm_login';

    checkUserInfo(menu);
    setHeader();
    setMenu(menu);

    menu = 'html/'+menu+'.html';
    $('.row-fluid').load(menu);
}

// user 정보 가져오기
function getUserInfo() {
    return JSON.parse(localStorage.getItem("userInfo"));
}

// user 정보 확인
function checkUserInfo(menu) {
    const userInfo = getUserInfo();

    // 로그인 관련 페이지가 아니고, 로그인 정보가 없으면
    if((menu !== 'adm_login' && menu !== 'adm_lost_info' && menu !== 'adm_lost_info_pw')
        && (!userInfo || (!userInfo.access_token && !userInfo.id))) {
        localStorage.clear();
        location.href='main.html?menu=adm_login';

    // 로그인 관련 페이지이고, 로그인 정보가 있으면
    }else if((menu === 'adm_login' || menu === 'adm_lost_info' || menu === 'adm_lost_info_pw')
        && ((userInfo && (userInfo.access_token && userInfo.id)))) {
        location.href='main.html?menu=adm_member';
    }
}

// header 내용 셋팅
function setHeader() {
    const userInfo = getUserInfo();
    const $header = $('#header .manage_header');
    const $headerLeft = $header.find('.logo');
    const $headerRight = $header.find('.manage_header-btn');

    if(userInfo) {
        $headerLeft.attr('href','main.html?menu=adm_member');

        $headerRight.html(`
            <li>${getToday()}</li>
            <li>${userInfo.admin_name} 님</li>
            <li><a href="javascript:logout()">로그아웃</a></li>
        `);

    }else {
        $headerLeft.attr('href','main.html?menu=adm_login');

        $headerRight.html(`
            <li><a href="../../main.html?menu=adm_login">로그인</a></li>
        `);
    }
}

// 메뉴 active 시키기
function setMenu(menu) {
    if(menu === 'adm_member' || menu === 'adm_member_regist' || menu === 'adm_member_adj' || menu === 'adm_member_project') {
        $('#m-user').addClass('on');

    }else if(menu === 'adm_manager_list' || menu === 'adm_manager_regist' || menu === 'adm_manager_adj') {
        $('#m-admin').addClass('on');

    }else if(menu === 'adm_project_list' || menu === 'adm_project_document') {
        $('#m-project').addClass('on');

    }else if(menu === 'adm_pay_list' || menu === 'adm_pay_detail' || menu === 'adm_pay_request') {
        $('#m-membership').addClass('on');

    }else if(menu === 'adm_check_list' || menu === 'adm_check_write' || menu === 'adm_check_contents' || menu === 'adm_check_adj'
        || menu === 'adm_risk_list' || menu === 'adm_risk_write' || menu === 'adm_risk_contents' || menu === 'adm_risk_adj'
        || menu === 'adm_case_list' || menu === 'adm_case_write' || menu === 'adm_case_detail' || menu === 'adm_case_adj'
        || menu === 'adm_near_list' || menu === 'adm_near_write' || menu === 'adm_near_detail' || menu === 'adm_near_adj' || menu === 'adm_near_dec_list') {

        const $elem = $('#m-list');
        $elem.addClass('on');
        $elem.find('a').addClass('active');
        $elem.find('ul').show();

    }else if(menu === 'adm_cs_list' || menu === 'adm_inquiry_write' || menu === 'adm_inquiry_detail') {
        $('#m-service').addClass('on');

    }else if(menu === 'adm_notice_list' || menu === 'adm_notice_write' || menu === 'adm_notice_detail' || menu === 'adm_notice_adj'
        || menu === 'adm_policy_list' || menu === 'adm_policy_detail' || menu === 'adm_policy_adj') {

        const $elem = $('#m-contents');
        $elem.addClass('on');
        $elem.find('a').addClass('active');
        $elem.find('ul').show();
    }
}

// 로그아웃
function logout() {
    localStorage.clear();
    location.href='main.html?menu=adm_login';
}

// 공통 ajax
function commonAjax(type='', url='', json=true, token=false, data={}, successCallback, errorCallback) {
    let ajaxOptions = {};

    ajaxOptions['async'] = false;
    ajaxOptions['type'] = type;
    ajaxOptions['url'] = SERVER_URL + url;

    if(json) {
        data = JSON.stringify(data);
        ajaxOptions['data'] = data;
        ajaxOptions['contentType'] = "application/json; charset=utf-8";
    }

    if(token) {
        ajaxOptions['headers'] = { 'Authorization' : 'Bearer ' + getUserInfo().access_token };
    }

    ajaxOptions['success'] = function (response) {
        console.log('success',response);
        successCallback(response);
    }

    ajaxOptions['error'] = function (response) {
        console.log('error',response);
        errorCallback(response);
    }

    $.ajax(ajaxOptions);
}

// 공통 ajax 임시
function commonAjax2(type='', url='', json=true, token=false, data={}, successCallback, errorCallback) {
    let ajaxOptions = {};

    ajaxOptions['async'] = false;
    ajaxOptions['type'] = type;
    ajaxOptions['url'] = 'https://api.safeapp.codeidea.io' + url;

    if(json) {
        data = JSON.stringify(data);
        ajaxOptions['data'] = data;
        ajaxOptions['contentType'] = "application/json; charset=utf-8";
    }

    if(token) {
        ajaxOptions['headers'] = { 'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6Im1hc3RlciIsInMiOjEzLCJtIjoibWFzdGVyM0BtYXN0ZXIuY29tIiwiaWF0IjoxNjc1NjUxNjU2LCJleHAiOjE2NzU4Njc2NTZ9.7hwy_iY1dZsVZK-8nWm1l40rENfr3dgnIv3UBBwjSz64AmEztf9Ak6R-BeVlcm2mM2M_Aih-Q6nV-5oN0mbeag' };
    }

    ajaxOptions['success'] = function (response) {
        console.log('success',response);
        successCallback(response);
    }

    ajaxOptions['error'] = function (response) {
        console.log('error',response);
        errorCallback(response);
    }

    $.ajax(ajaxOptions);
}

// 기본 alert 모달
function modalAlert(msg, callback) {
    let $modalAlert = $('#modal_alert');

    if($modalAlert.length === 0) {
        $('.content').append(`
            <div class="layerpop" id="modal_alert" style="z-index: 10000 !important;">
                <div class="cont_wrap">
                    <div class="layer_cont cf_cont">
                        <div class="text-center">
                            <div class="fs-lg tac" id="modal_alert_msg">${msg}</div>
                        </div>
                        <div class="pop_btn mt30">
                            <button type="button" class="form_btn btn_m" id="layerpop_ok">확인</button>
                        </div>
                    </div>
                </div>
            </div>
        `);
        $modalAlert = $('#modal_alert');

    }else {
        $modalAlert.find('#modal_alert_msg').html(msg);
    }

    setTimeout(function() {
        modalToggle($modalAlert);
    }, 100);

    $('#modal_alert #layerpop_ok').unbind('click').bind('click',function() {
        modalToggle($modalAlert);
        if(callback) callback();
    });
}

// 기본 confirm 모달
function modalConfirm(msg, btn1, btn2, callback) {
    let $modalConfirm = $('#modal_confirm');

    if($modalConfirm.length === 0) {
        $('.content').append(`
            <div class="layerpop" id="modal_confirm" style="z-index: 10000 !important;">
                <div class="cont_wrap">
                    <div class="layer_cont cf_cont">
                        <div class="text-center">
                            <div class="fs-lg tac" id="modal_alert_msg">${msg}</div>
                        </div>
                        <div class="pop_btn mt30">
                            <button type="button" class="form_btn btn_g mr5" id="layerpop_no">${btn1}</button>
                            <button type="button" class="form_btn btn_m" id="layerpop_ok">${btn2}</button>
                        </div>
                    </div>
                </div>
            </div>
        `);
        $modalConfirm = $('#modal_confirm');

    }else {
        $modalConfirm.find('#modal_alert_msg').html(msg);
        $modalConfirm.find('#layerpop_no').html(btn1);
        $modalConfirm.find('#layerpop_ok').html(btn2);
    }

    setTimeout(function() {
        modalToggle($modalConfirm);
    }, 100);

    $('#modal_confirm #layerpop_no').unbind('click').bind('click',function() {
        modalToggle($modalConfirm);
    });

    $('#modal_confirm #layerpop_ok').unbind('click').bind('click',function() {
        modalToggle($modalConfirm);
        if(callback) callback();
    });
}

// 모달 on, off
function modalToggle(elem) {
    elem.fadeToggle('fast');
}

// 자릿수 만큼 앞에 0 채우기
function numberPad(value, fullLength) {
    value = value + '';
    return value.length >= fullLength ? value : new Array(fullLength - value.length + 1).join('0') + value;
}

// 체크박스 이벤트 부여하기
function setCheckboxEvent(allElem, otherElem, topElem) {
    // allElem : 전체 체크박스
    // otherElem : 나머지 체크박스들
    // topElem : allElem, otherElem를 포함하는 상위 엘리먼트

    // 전체 체크박스 클릭
    $(allElem).unbind('click').bind('click',function() {
        if($(this).is(':checked')) {
            $(otherElem).prop('checked',true);
        }else {
            $(otherElem).prop('checked',false);
        }
    });

    // 나머지 체크박스 클릭
    $(otherElem).unbind('click').bind('click',function() {
        if($(topElem).find('input[type=checkbox]:checked').not(allElem).length === $(otherElem).length) {
            $(allElem).prop('checked',true);
        }else {
            $(allElem).prop('checked',false);
        }
    });
}

// 오늘 날짜 구하기(yyyy-mm-dd)
function getToday(){
    return changeDateFormat(new Date());
}

// yyyy-mm-dd로 변환 후 리턴
function changeDateFormat(date) {
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
}

// 오늘날짜 - month 개월
function todaySubMonth(month) {
    const date = new Date();
    const monthOfYear = date.getMonth();
    date.setMonth(monthOfYear - month);
    return changeDateFormat(date);
}

// fileArr 배열 안에 파일을 담아주고 미리보기 이미지를 만들어줌
function setMultiImgView(fileArr) {
    // fileArr : 해당 스크립트 페이지에서 사용하는 전역 변수

    let attZone = document.getElementById('att_zone');
    let btnAtt = document.getElementById('btnAtt')

    let div_style = 'position: relative;display: inline-flex;justify-content: center;align-items: center;width: 33%;aspect-ratio: 16 / 9; border:1px solid #ddd;margin-right: 10px;padding:10px';
    let img_style = 'max-height:100%';
    let chk_style = 'width: 20px;height: 20px;position: absolute;font-size: 12px;right: 5px;top: 5px;z-index: 999;border: 1px solid #999;border-radius: 50px;background-color: rgba(255,255,255,0.1);color: #999;cursor:pointer';

    btnAtt.onchange = function(e){
        let files = e.target.files;
        let fileArr = Array.prototype.slice.call(files)
        for(let f of fileArr){
            imageLoader(f);
        }
    }

    /*첨부된 이미지들을 배열에 넣고 미리보기 */
    const imageLoader = function(file){
        let cnt = 0;

        // 중복 체크
        for(let i=0 ;i<fileArr.length; i++){
            if(file.name === fileArr[i].name){
                cnt ++;
                return false;
            }
        }

        // 중복이 없으면 추가
        if(cnt === 0) {
            fileArr.push(file);
            let reader = new FileReader();

            reader.onload = function(ee){
                let img = document.createElement('img')
                img.setAttribute('style', img_style)
                img.src = ee.target.result;
                attZone.appendChild(makeDiv(img, file));
            }

            reader.readAsDataURL(file);
        }
    }

    /*첨부된 파일이 있는 경우 checkbox와 함께 attZone에 추가할 div를 만들어 반환 */
    const makeDiv = function(img, file){
        let div = document.createElement('div')
        div.setAttribute('style', div_style)

        let btn = document.createElement('input')
        btn.setAttribute('type', 'button')
        btn.setAttribute('value', 'x')
        btn.setAttribute('delFile', file.name);
        btn.setAttribute('style', chk_style);

        btn.onclick = function(ev){
            let ele = ev.srcElement;
            let delFile = ele.getAttribute('delFile');

            for(let i=0 ;i<fileArr.length; i++){
                if(delFile === fileArr[i].name){
                    fileArr.splice(i, 1);
                }
            }

            let dt = new DataTransfer();
            for(let f in fileArr) {
                let file = fileArr[f];
                dt.items.add(file);
            }

            btnAtt.files = dt.files;
            let p = ele.parentNode;
            attZone.removeChild(p);
        }

        div.appendChild(img)
        div.appendChild(btn)
        return div;
    }
}

// input에 숫자만 입력받기
function inputOnlyNumber(elem) {
    elem.value = elem.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    // 사용방법 : oninput="inputOnlyNumber(this)"
}

// 프로젝트 권한 한글명
function getAuthType(authType) {
    let result = '';

    if(authType === 'TEAM_MASTER') {
        result = '마스터관리자';
    }else if(authType === 'TEAM_MANAGER') {
        result = '관리자';
    }else if(authType === 'TEAM_USER') {
        result = '그룹원';
    }

    return result;
}

// 회원 멤버십 유형 한글명
function getOrderType(orderType) {
    let result = '';

    if(orderType === 'team') {
        result = '팀 결제';
    }else if(orderType === 'personalMonth') {
        result = '개인 월간';
    }else if(orderType === 'personalFree') {
        result = '개인 무료';
    }

    return result;
}

// 회원 멤버십 상태 한글명
function getUserStatus(userStatus) {
    let result = '';

    if(userStatus === 'ing') {
        result = '사용중';
    }else if(userStatus === 'cancel') {
        result = '취소';
    }else if(userStatus === 'end') {
        result = '기간만료';
    }

    return result;
}

/*
// 브라우저 종료 시 로컬 스토리지 정보 삭제
function setStorageControl() {
    let closing_window = false;

    $(window).on('focus', function () {
        closing_window = false;
    });

    $(window).on('blur', function () {
        closing_window = document.hidden;

        $(window).on('resize', function (e) { // window가 최대화된 것은 닫힌 것이 아니다.
            closing_window = false;
        });

        $(window).off('resize'); // multiple listening 회피
    });

    // 유저가 html을 나간다면 window가 닫힌 것으로 간주
    const $html = $('html');

    $html.on('mouseleave', function () {
        closing_window = true;
    });

    // 유저의 마우스가 window 안에 있다면 토큰들을 삭제하지 않음
    $html.on('mouseenter', function () {
        closing_window = false;
    });

    $(document).on('keydown', function (e) {
        const keyCode = e.keyCode;

        if (keyCode === 91 || keyCode === 18) {
            closing_window = false; // 단축키 ALT+TAB (창 변경)
        }

        if (keyCode === 116 || (e.ctrlKey && keyCode === 82)) {
            closing_window = false; // 단축키 F5, CTRL+F5, CTRL+R (새로고침)
        }
    });

    // a 링크를 눌렀을 때 토큰값 삭제 방지
    $(document).on("click", "a", function () {
        closing_window = false;
    });

    // 버튼이 다른 페이지로 redirect한다면 토큰값 삭제 방지
    $(document).on("click", "button", function () {
        closing_window = false;
    });

    // toDoWhenClosing 함수를 통해 window가 닫히면 토큰 관련 값 전부 삭제
    let toDoWhenClosing = function () {
        localStorage.removeItem("userInfo")
        return false;
    };

    // unload(window가 닫히는 이벤트)가 감지되면 closing_window가 true가 되고 토큰 관련 값들 전부 삭제
    window.addEventListener("unload", function (e) {
        if(closing_window) {
            toDoWhenClosing();
        }
    });
}*/