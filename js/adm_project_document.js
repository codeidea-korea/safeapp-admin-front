let PAGE_SIZE = 15;
let PAGE_NO = 1;
let PK = 0;

$(function() {
    init();
});

// 최초 실행
function init() {
    setList();

    $("#s_value").on("keyup",function(key){
        if(key.keyCode === 13) search();
    });
}

// 태이블 내용 만들기
function setList(pageNo = 0) {
    if(pageNo) PAGE_NO = pageNo;
    let data = getList();
    let result = ``;

    data.list = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
    data.count = 30;

    LIST = data.list;

    // TODO : 데이터 바인딩

    if(data.count > 0) {
        data.list.forEach(function(data,idx) {
            result += `
            <tr>
                <td>2022-02-23</td>
                <td>
                    <span class="ho_line pj_nm">거푸집 동바리 설치 체크 리스트</span>
                </td>
                <td>홍길동</td>
                <td>체크리스트</td>
                <td><span class="st_cir ing">점검중</span></td>
                <!--<td><span class="st_cir wait">승인대기중</span></td>
                <td><span class="st_cir end">승인완료</span></td>
                <td><span class="st_cir recheck">재점검 요청</span></td>-->
                <td class="layer_btn">
                    <a href="#none" class="confirm">
                        <img src="../resources/img/icon/delete.png" alt="삭제ico" onclick="remove(1)">
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

    PK = new URL(window.location.href).searchParams.get('pk');
    let result = {};

    // alert($('#s_type').val());
    // alert($('#s_value').val());

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

// 리스트 페이지로 이동
function goList() {
    location.href='main.html?menu=adm_project_list';
}

// 삭제
function remove(pk) {
    modalConfirm('삭제하시겠습니까?','취소','삭제',function() {
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