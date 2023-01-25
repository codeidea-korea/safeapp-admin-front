$(function() {
    init();
});

// 최초 실행
function init() {
    setList();
}

// 태이블 내용 만들기
function setList() {
    let data = getList();
    let result = ``;

    // TODO : 데이터 바인딩

    data.list = [{},{},{},{}];
    data.list.forEach(function(data,idx) {
        result += `
        <tr>
            <td>1</td>
            <td onclick="goDetail(1)">
                <span class="ho_line pj_nm" >이용약관</span>
            </td>
            <td>관리자1</td>
            <td>2022-10-11 16:48</td>
        </tr>
        `;
    });

    $('#main_tbody').html(result);
}

// 리스트 가져오기
function getList() {
    // TODO : 정책관리 리스트 불러오기

    let result = {};

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

    return result;
}

// 공지사항 상세 페이지로 이동
function goDetail(pk) {
    location.href='main.html?menu=adm_policy_detail&pk='+pk;
}