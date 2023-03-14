let PAGE_SIZE = 15;
let PAGE_NO = 1;

$(function() {
    init();
});

// 최초 실행
function init() {
    setList();

    $("#search_value").on("keyup",function(key){
        if(key.keyCode === 13) search();
    });
}

// 태이블 내용 만들기
function setList(pageNo = 0) {
    if(pageNo) PAGE_NO = pageNo;

    const data = getList();
    const count = data.count - PAGE_SIZE * (PAGE_NO - 1);
    let result = `<tr><td colspan="8">결과가 존재하지 않습니다</td></tr>`;

    if(data.count > 0) {
        result = ``;
        data.list.forEach(function(data,idx) {
            result += `
            <tr>
                <td>${count - idx}</td>
                <td>${data.admin_name}</td>
                <td>${data.email}</td>
                <td>${data.phone_no}</td>
                <td>${data.created_at.substring(0,10)}</td>
                <td>${data.logged_at ? data.logged_at.substring(0,10) : '-'}</td>
                <td class="img" onClick="goEdit(${data.id});">
                    <img src="./resources/img/icon/edit.png" alt="수정ico">
                </td>
                <td class="layer_btn">
                    <a href="javascript:;" class="confirm">
                        <img onclick="showModal(${data.id})" src="./resources/img/icon/delete.png" alt="삭제ico">
                    </a>
                </td>
            </tr>
            `;
        });
    }

    $('#main_tbody').html(result);
    makePaging(Math.ceil(data.count / PAGE_SIZE), PAGE_NO, setList);
}

// 리스트 가져오기
function getList() {
    let result = {};
    let url = '/admin/list?pageNo='+PAGE_NO+'&pageSize='+PAGE_SIZE+'&'+$('#search_type').val()+'='+$('#search_value').val();

    commonAjax(
        'GET',
        url,
        false,
        false,
        {},
        function(response) {
            result['count'] = response.data.count;
            result['list'] = response.data.list;
        },
        function(error) {

        });

    return result;
}

// 검색
function search() {
    PAGE_NO = 1;
    setList();
}

// 등록 페이지로 이동
function goWrite() {
    location.href='main.html?menu=adm_manager_regist';
}

// 수정 페이지로 이동
function goEdit(pk) {
    location.href='main.html?menu=adm_manager_adj&pk='+pk;
}

// 삭제
function showModal(pk) {
    modalConfirm('계정을 삭제하시겠습니까?','취소','삭제',function() {
        commonAjax(
            'DELETE',
            '/admin/remove/'+pk,
            false,
            false,
            {},
            function(response) {
                if(response.result) {
                    modalAlert('삭제되었습니다.',search);
                }
            },
            function(error) {

            });
    });
}