let LIST;
let PAGE_SIZE = 5;
let PAGE_NO = 1;

$(function() {
    init();
});

// 최초 실행
function init() {
    setList();

    $("#s_value, #s_type_value").on("keyup",function(key){
        if(key.keyCode === 13) search();
    });
}

// 태이블 내용 만들기
function setList(pageNo = 0) {
    if(pageNo) PAGE_NO = pageNo;
    let data = getList();
    let result = ``;

    data.list = [{},{},{},{}];
    data.count = 12;

    LIST = data.list;

    if(data.count > 0) {
        data.list.forEach(function(data,idx) {
            result += `
            <ul class="board">
                <li class="th_5 tac">
                    <input type="checkbox" class="main_ul_checkbox" value="${idx}">
                </li>
                <li class="th_70">
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
                                    <span class="text fs-lg fwb">거푸집 동바리 설치 체크 리스트</span>
                                    <span><img src="./resources/img/icon/lock.png" alt="비공개 아이콘"></span>
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
                <li class="th_10">
                    <span class="like_ico ml10" onclick="like(1,this);"></span>
                </li>
                <li class="th_15">
                    <div class="btn form_btn btn_m" onclick="goDetail(1)">템플릿 열기</div>
                </li>
            </ul>
            `;
        });

        $('#main_div').html(result);
        makePaging(Math.ceil(data.count / PAGE_SIZE), PAGE_NO, setList);
        setToggleLike();

    }else {

    }
}

// 리스트 가져오기
function getList() {
    let result = {};

    // console.log($('#s_value').val());
    // console.log($('#s_type').val());
    // console.log($('#s_type_value').val());
    // console.log($('#s_open_type').val());
    // console.log($('#datepicker1').val());
    // console.log($('#datepicker2').val());
    // console.log($('#order_type').val());

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

// N개월 버튼 클릭
function setSearchDate(month) {
    if(month >= 0) {
        $('#datepicker1').val(todaySubMonth(month));
        $('#datepicker2').val(getToday());
    }else {
        $('#datepicker1').val('');
        $('#datepicker2').val('');
    }
}

// 검색
function search() {
    PAGE_NO = 1;
    setList();
}

// 좋아요 하트 버튼에 토글 이벤트 부여
function setToggleLike() {
    $('.like_ico').click(function(){
        if($(this).hasClass('on')){
            $(this).removeClass('on');
        }else{
            $(this).addClass('on');
        }
    });
}

// 좋아요 하트 버튼 클릭
function like(pk,elem) {
    setTimeout(function() {
        const type = $(elem).hasClass('on');

        // TODO : 좋아요 클릭시 로직 추가

    },200);
}

// 등록 페이지로 이동
function goWrite() {
    location.href='main.html?menu=adm_risk_write';
}

// 체크리스트 상세 페이지로 이동
function goDetail(pk) {
    location.href='main.html?menu=adm_risk_contents&pk='+pk;
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

            // TODO : 체크리스트 삭제
            // console.log(pkArr);

            modalAlert('삭제되었습니다.',function() {
                search();
            });
        });

    }else {
        modalAlert('삭제할 대상을 체크해주세요.');
    }
}