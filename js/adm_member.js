let LIST;
let PAGE_SIZE = 10;
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
    let data = getList();
    let count = 0;
    let idxNo = 0;
    let result = `
    <tr>
        <td colspan="11">결과가 존재하지 않습니다.</td>
    </tr>
    `;

    if(data) {
        count = data.count;

        if(data.count > 0) {
            result = ``;
            idxNo = count - PAGE_SIZE  * (PAGE_NO - 1);

            data.list.forEach(function(data,idx) {
                result += `
                <tr>
                    <td>${idxNo - idx}</td>
                    <td>${data.user_id}</td>
                    <td>${data.user_name}</td>
                    <td>${data.phone_no}</td>
                    <td>${data.email}</td>
                    <td>${data.created_at.substring(0,10)}</td>
                    <td>???</td>
                    <td>???</td>
                    <td class="ho_line" onclick="goProject(${data.id});">3</td>
                    <td class="img" onclick="goEdit(${data.id});">
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
    }

    $('#main_tbody').html(result);
    makePaging(Math.ceil(count / PAGE_SIZE), PAGE_NO, setList);
}

// 리스트 가져오기
function getList() {
    let result = {};

    // TODO : 검색 파라미터 추가

    // alert($('#search_type').val());
    // alert($('#search_value').val());

    commonAjax(
        'GET',
        '/user/list?pageNo='+PAGE_NO+'&pageSize='+PAGE_SIZE,
        false,
        false,
        {},
        function(response) {
            result = response.data;
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
    location.href='main.html?menu=adm_member_regist';
}

// 회원 프로젝트 페이지로 이동
function goProject(pk) {
    location.href='main.html?menu=adm_member_project&pk='+pk;
}

// 수정 페이지로 이동
function goEdit(pk) {
    location.href='main.html?menu=adm_member_adj&pk='+pk;
}

// 삭제
function showModal(pk) {
    modalConfirm('회원 계정을 삭제하시겠습니까?','취소','삭제',function() {
        commonAjax(
            'DELETE',
            '/user/remove/'+pk,
            false,
            false,
            {},
            function(response) {
                if(response.result && response.data) {
                    modalAlert('삭제되었습니다.');
                }
            },
            function(error) {

            });
    });
}