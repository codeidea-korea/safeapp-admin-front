let PAGE_SIZE = 10;
let PAGE_NO = 1;

$(function() {
    init();
});

// 최초 실행
function init() {
    setList();
}

// 태이블 내용 만들기
function setList(pageNo = 0) {
    if(pageNo) PAGE_NO = pageNo;
    let data = getList();
    let result = `<tr><td colspan="6">결과가 존재하지 않습니다.</td></tr>`;

    if(data.count > 0) {
        result = ``;
        count = data.count - PAGE_SIZE  * (PAGE_NO - 1);

        data.list.forEach(function(data,idx) {
            result += `
            <tr class="${data.priority ? 'fwb' : ''}">
                <td class="${data.priority ? 'list_ico import_notice' : ''}">${count - idx}</td>
                <td>${getType(data.type)}</td>
                <td onclick="goDetail(${data.id});">
                    <span class="ho_line pj_nm">${data.title}</span>
                </td>
                <td>${data.admin.admin_name}</td>
                <td>${data.created_at.substring(0,10)}</td>
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

    commonAjax(
        'GET',
        '/board/notice/list?type='+$('#search_type').val(),
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

// 검색
function search() {
    PAGE_NO = 1;
    setList();
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

// 공지사항 상세 페이지로 이동
function goDetail(pk) {
    location.href='main.html?menu=adm_notice_detail&pk='+pk;
}

// 삭제
function showModal(pk) {
    modalConfirm('공지사항을 삭제하시겠습니까?','취소','삭제',function() {
        commonAjax(
            'DELETE',
            '/board/notice/remove/'+pk,
            false,
            false,
            {},
            function(response) {
                modalAlert('삭제되었습니다.',search);
            },
            function(response) {

            });
    });
}