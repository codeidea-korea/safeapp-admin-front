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
    let result = `<tr><td colspan="4">결과가 존재하지 않습니다.</td></tr>`;

    if(data.count > 0) {
        result = ``;
        data.list.forEach(function(data,idx) {
            result += `
            <tr>
                <td>${idx+1}</td>
                <td onclick="goDetail(${data.id})">
                    <span class="ho_line pj_nm">${data.title}</span>
                </td>
                <td>${data.admin.admin_name}</td>
                <td>${data.created_at.substring(0,10)}</td>
            </tr>
            `;
        });
    }

    $('#main_tbody').html(result);
}

// 리스트 가져오기
function getList() {
    let result = {};

    commonAjax(
        'GET',
        '/policy/list',
        false,
        false,
        {},
        function(response) {
            result['count'] = response.data.count;
            result['list'] = response.data.list;
        },
        function(response) {

        });

    return result;
}

// 공지사항 상세 페이지로 이동
function goDetail(pk) {
    location.href='main.html?menu=adm_policy_detail&pk='+pk;
}