let PK = 0;

$(function() {
    init();
});

// 최초 실행 함수
function init() {
    setInfo();
}

// 문의 상세 정보 뿌려주기
function setInfo() {
    const data = getInfo();

    // TODO : 데이터 바인딩

    $('#category').text(1111);
    $('#tit_word').text(2222);
    $('#reg_user').text(3333);
    $('#reg_date').text(4444);
    $('#file_name a').text(5555);
    $('#text_word').html(6666);
}

// 문의 상세 정보 가져오기
function getInfo() {
    PK = new URL(window.location.href).searchParams.get('pk');
    let result = {};

    // TODO : 문의 상세정보 가져오기

    return result;
}

// 수정
function goEdit() {
    location.href='main.html?menu=adm_notice_adj&pk='+PK;
}