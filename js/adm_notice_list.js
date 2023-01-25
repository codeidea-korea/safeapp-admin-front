let LIST;
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
    let count = 0;

    data.list = [{},{},{},{},{},{},{},{},{},{}];
    data.count = 20;

    LIST = data.list;

    // TODO : 데이터 바인딩

    if(data.count > 0) {
        result = ``;
        count = data.count - PAGE_SIZE  * (PAGE_NO - 1);

        data.list.forEach(function(data,idx) {
            result += `
            <!--<tr class="fwb">
                <td class="list_ico import_notice">1</td>
                <td>공지</td>
                <td onclick="location.href='main.html?menu=adm_notice_detail'">
                    <span class="ho_line pj_nm list_ico list-link">거푸집동바리 설치 체크리스트</span>
                </td>
                <td>홍길동</td>
                <td>2022-10-11</td>
                <td class="layer_btn">
                    <a href="#none" class="confirm">
                        <img src="./resources/img/icon/delete.png" alt="삭제ico">
                    </a>
                </td>
            </tr>-->
            <tr>
                <td>${count - idx}</td>
                <td>업데이트</td>
                <td onclick="goDetail(1);">
                    <span class="ho_line pj_nm">팀프로젝트 인원문의</span>
                </td>
                <td>홍길동</td>
                <td>2022-10-11</td>
                <td class="layer_btn">
                    <a href="javascript:;" class="confirm">
                        <img onclick="showModal(1)" src="./resources/img/icon/delete.png" alt="삭제ico">
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
    // TODO : 공지사항 리스트 불러오기

    let result = {};

    // alert($('#search_type').val());

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

// 검색
function search() {
    PAGE_NO = 1;
    setList();
}

// 공지사항 상세 페이지로 이동
function goDetail(pk) {
    location.href='main.html?menu=adm_notice_detail&pk='+pk;
}

// 삭제
function showModal(pk) {
    modalConfirm('공지사항을 삭제하시겠습니까?','취소','삭제',function() {
        // TODO : 삭제

        modalAlert('삭제되었습니다.',search);
    });
}