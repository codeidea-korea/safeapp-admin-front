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
    let result = ``;
    let count = 0;

    data.list = [{},{},{},{},{},{},{},{},{},{}];
    data.count = 30;

    LIST = data.list;

    // TODO : 데이터 바인딩

    if(data.count > 0) {
        count = data.count - PAGE_SIZE * (PAGE_NO - 1);

        data.list.forEach(function(data,idx) {
            result += `
            <tr>
                <td>${count - idx}</td>
                <td>홍길동</td>
                <td>ghdrlfehd_1234@email.com</td>
                <td>010-0000-0000</td>
                <td>2022-10-11</td>
                <td>2022-10-11</td>
                <td class="img" onClick="goEdit(1);">
                    <img src="./resources/img/icon/edit.png" alt="수정ico">
                </td>
                <td class="layer_btn">
                    <a href="javascript:;" class="confirm">
                        <img onclick="showModal(1)" src="./resources/img/icon/delete.png" alt="삭제ico">
                    </a>
                </td>
            </tr>
            `;
        });

        $('#main_tbody').html(result);
        makePaging(Math.ceil(data.count / PAGE_SIZE), PAGE_NO, setList);

    }
}

// 리스트 가져오기
function getList() {
    // TODO : 리스트 정보 가져오기

    let result = {};

    // alert($('#search_type').val());
    // alert($('#search_value').val());

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
        // TODO : 삭제 기능 구현

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

        modalAlert('삭제되었습니다.',function() {
            search();
        });
    });
}