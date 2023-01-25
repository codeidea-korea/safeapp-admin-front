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

// 태이블 내용 셋팅
function setList(pageNo = 0) {
    if(pageNo) PAGE_NO = pageNo;
    let data = getList();
    let result = ``;
    let img = ``;

    if(data.count > 0) {
        data.list.forEach(function(data) {
            img = ``;
            if(data.image) img = `<div class="preview_img"><img src="${data.image}" class="preview"></div>`;

            result += `
            <ul class="board">
                <li class="th_5 tac">
                    <input type="checkbox" class="main_ul_checkbox" value="${data.id}">
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
                            <th scope="col">작성자/작성일/열람횟수</th>
                            <th scope="col">내용</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="tit">
                                <a href="javascript:void(0);">
                                    <span class="text fs-lg fwb">${data.title}</span>
                                </a>
                            </td>
                            <td class="write">
                                <ul>
                                    <li>작성자</li>
                                    <li>등록일 : ${data.created_at.substring(0,10)}</li>
                                    <li>열람횟수 : ${data.views}회</li>
                                </ul>
                            </td>
                            <td class="board_cont">
                                - 사고 원인 : ${data.accident_cause}<br>
                                - 사고 경위 : ${data.accident_reason}<br>
                                - 사고발생일 : ${data.accident_at.substring(0,10)}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </li>
                <li class="th_20">${img}</li>
                <li class="th_10 tac">
                    <div class="btn form_btn btn_m" onclick="goDetail(${data.id})">상세보기</div>
                </li>
            </ul>
            `;
        });

    }else {
        result = `
        <ul class="board tac">
            <li class="th_100 tac">결과가 존재하지 않습니다.</li>
        </ul>
        `;
    }

    $('#main_div').html(result);
    makePaging(Math.ceil(data.count / PAGE_SIZE), PAGE_NO, setList);
}

// 리스트 가져오기
function getList() {
    let result = {};
    let subUrl = '?pageNo='+PAGE_NO+'&pageSize='+PAGE_SIZE;

    const $sValue = $('#s_value').val();
    const $sType = $('#s_type').val();
    const $sTypeValue = $('#s_type_value').val();
    const $sOpenType = $('#s_open_type').val();
    const $sStartDate = $('#datepicker1').val();
    const $sEndDate = $('#datepicker2').val();
    const $sOrderType = $('#order_type').val();

    if($sOrderType === 'new') {
        subUrl += '&created_at_descended=Y';

    }else if($sOrderType === 'view'){
        subUrl += '&views_descended=Y';
    }

    commonAjax(
        'GET',
        '/board/accidents'+subUrl,
        false,
        false,
        {},
        function(response) {
            result = response;
        },
        function(response) {

        });

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

// 등록 페이지로 이동
function goWrite() {
    location.href='main.html?menu=adm_case_write';
}

// 사고사례 상세 페이지로 이동
function goDetail(pk) {
    location.href='main.html?menu=adm_case_detail&pk='+pk;
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

            // TODO : 사고사례 삭제
            // console.log(pkArr);

            modalAlert('삭제되었습니다.',function() {
                search();
            });
        });

    }else {
        modalAlert('삭제할 대상을 체크해주세요.');
    }
}