let LIST;
let PAGE_SIZE = 5;
let PAGE_NO = 1;

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

    data.list = [{},{}];
    data.count = 12;

    LIST = data.list;
    
    // TODO : 데이터 바인딩

    if(data.count > 0) {
        data.list.forEach(function(data,idx) {
            result += `
            <ul class="board">
                <li class="th_5 tac">
                    <input type="checkbox" class="main_ul_checkbox" value="${idx}">
                </li>
                <li class="th_55">
                    <table class="board_list">
                        <caption>번호, 구분, 제목, 첨부파일, 작성일, 조회 내용이 담겨있는 표</caption>
                        <colgroup>
                            <col style="width: auto;">
                            <col style="width: 10%;">
                            <col style="width: 10%;">
                        </colgroup>
                        <thead>
                        <tr>
                            <th scope="col">제목</th>
                            <th scope="col">작성자/작성일/열람횟수/좋아요수</th>
                            <th scope="col">내용</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="tit">
                                <a href="javascript:void(0);">
                                    <span class="text fs-lg fwb">통영시 가오치항 어촌뉴딜300사업 건축공사 2층 옹벽 거푸집 해체 중 작업자 1인 인명사고</span>
                                </a>
                            </td>
                            <td class="write">
                                <ul>
                                    <li>메타세이프</li>
                                    <li>등록일 : 2022-02-03</li>
                                    <li>열람횟수 : 123,456회</li>
                                    <li>좋아요 수 : 120회</li>
                                </ul>
                            </td>
                            <td class="board_cont">
                                - 작업장소 타 공종 간섭여부, 지반상태<br>
                                - 동바리 부재 구조검토서와 동일한 부재 반입여부<br>
                                - 동바리 부재 손상, 변형된 부재확인 및 제거상태<br>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </li>
                <li class="th_20">
                    <div class="preview_img">
                        <img src="" alt="" class="preview">
                    </div>
                </li>
                <li class="th_10 tac">
                    <div class="btn form_btn btn_m" onclick="goDetail(1)">상세보기</div>
                    <div class="btn form_btn layer_btn btn_b mt10" onclick="showReason(1)">
                        <a href="javascript:;">신고사유</a>
                    </div>
                </li>
            </ul>
            `;
        });

        $('#main_div').html(result);
        makePaging(Math.ceil(data.count / PAGE_SIZE), PAGE_NO, setList);

    }else {

    }
}

// 리스트 가져오기
function getList() {
    // TODO : 아차사고 신고목록 리스트 가져오기

    let result = {};

    // console.log($('#s_value').val());

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

// 아차사고 상세 페이지로 이동
function goDetail(pk) {
    window.open('main.html?menu=adm_near_detail&pk='+pk);
}

// 아차사고 신고사유 팝업 보여주기
function showReason(pk) {
    // TODO : 아차사고 게시물의 신고사유 리스트 불러오기

    let result = ``;
    let data = [{},{},{},{},{},{}];

    data.forEach(function(data) {
        result += makeReasonElem(data);
    });

    $('#reason .reason_tit').html('통영시 가오치항 어촌뉴딜300사업 건축공사 2층 옹벽 거푸집 해체 중 작업자 1인 인명사고');
    $('#reason .reason_cont').html(result);
    modalToggle($('#reason'));
}

// 신고사유 팝업 내부 엘리먼트 생성
function makeReasonElem(data) {
    // TODO : 데이터 바인딩

    return `
    <ul>
        <li>
            <ul class="write">
                <li>홍길동</li>
                <li>신고일 : 2022-02-03</li>
            </ul>
        </li>
        <li>
            신고사유가 오는 자리입니다.
        </li>
    </ul>
    `;
}

// 삭제
function remove() {
    const $checkbox = $('.main_ul_checkbox:checked');

    if($checkbox.length > 0) {
        modalConfirm('삭제하시겠습니까?','취소','삭제',function() {
            let pkArr = [];

            $checkbox.each(function(idx,elem) {
                pkArr.push($(elem).val());
            });

            // console.log(pkArr);
            // TODO : 아차사고 신고 삭제

            modalAlert('삭제되었습니다.',function() {
                search();
            });
        });

    }else {
        modalAlert('삭제할 대상을 체크해주세요.');
    }
}