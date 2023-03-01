let PK = 0;

$(function() {
    init();
});

// 최초 실행 함수
function init() {
    setInfo();
}

// 정책관리 상세 정보 뿌려주기
function setInfo() {
    const data = getInfo();

    $('#title').text(data.title);
    $('#reg_user').text(data.admin.admin_name);
    $('#reg_date').text(data.created_at.substring(0,10));
    $('#contents').html(data.contents);
}

// 정책관리 상세 정보 가져오기
function getInfo() {
    PK = new URL(window.location.href).searchParams.get('pk');
    let result = {};

    commonAjax(
        'GET',
        '/policy/find/'+PK,
        false,
        false,
        {},
        function(response) {
            result = response.data;
        },
        function(response) {

        });

    return result;
}

// 목록
function goList() {
    location.href='main.html?menu=adm_policy_list';
}

// 수정
function goEdit() {
    location.href='main.html?menu=adm_policy_adj&pk='+PK;
}