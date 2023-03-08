let PK = 0;

$(function() {
    init();
});

// 최초 실행 함수
function init() {
    setInfo();
}

// 상세 정보 뿌려주기
function setInfo() {
    const data = getInfo();

    $('#category').text(getType(data.type));
    $('#tit_word').text(data.title);
    $('#reg_user').text(data.admin_name);
    $('#reg_date').text(data.created_at.substring(0,10));
    $('#file_name a').text(data.real_name);
    $('#text_word').html(data.contents);
}

// 상세 정보 가져오기
function getInfo() {
    PK = new URL(window.location.href).searchParams.get('pk');
    let result = {};

    commonAjax(
        'GET',
        '/board/notice/find/'+PK,
        false,
        false,
        {},
        function(response) {
            result = response;
        },
        function(response) {

        });

    return result;
}

// 유형 한글명
function getType(value) {
    if(value === 'NOTICE') {
        return '공지';
    }else if(value === 'UPDATE') {
        return '업데이트';
    }else {
        return '이용안내';
    }
}

// 수정
function goEdit() {
    location.href='main.html?menu=adm_notice_adj&pk='+PK;
}