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
                            <th scope="col">작성자/작성일/열람횟수/좋아요수</th>
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
                                    <li>작성자 : ${data?.admin?.admin_name}</li>
                                    <li>등록일 : ${data.created_at.substring(0,10)}</li>
                                    <li>열람횟수 : ${data.views}회</li>
                                </ul>
                            </td>
                            <td class="board_cont">
                                - 발생원인 : ${data?.accident_cause}<br>
                                - 발생개요 및 예상피해 : ${data?.cause_detail}<br>
                                - 관리대책 : ${data?.response}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </li>
                <li class="th_20">${img}</li>
                <li class="th_10 tac">
                    <div class="btn form_btn btn_m" onclick="goDetail(${data.id})">상세보기</div>
                    <div class="btn form_btn layer_btn btn_b mt10" onclick="showReason(${data.id})">
                        <a href="javascript:;">신고사유</a>
                    </div>
                </li>
            </ul>
            `;
        });

    }else {
        result += `
        <ul class="board">
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

    subUrl += '&keyword='+$('#s_value').val();

    const $orderType = $('#order_type').val();
    if($orderType === 'new') {
        subUrl += '&createdAtDesc=Y';
    }else if($orderType === 'view') {
        subUrl += '&viewsDesc=Y';
    }

    commonAjax(
        'GET',
        '/board/conExp/report/list'+subUrl,
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

// 아차사고 상세 페이지로 이동
function goDetail(pk) {
    window.open('main.html?menu=adm_near_detail&pk='+pk);
}

// 아차사고 신고사유 팝업 보여주기
function showReason(pk) {
    commonAjax(
        'GET',
        '/board/conExp/report/find/'+pk,
        false,
        false,
        {},
        function(response) {
            let result = ``;

            response.forEach(function(data) {
                result += makeReasonElem(data);
            });

            $('#reason .reason_tit').html(response[0].concern_accident_exp.title);
            $('#reason .reason_cont').html(result);
            modalToggle($('#reason'));
        },
        function(response) {

        });
}

// 신고사유 팝업 내부 엘리먼트 생성
function makeReasonElem(data) {
    return `
    <ul>
        <li>
            <ul class="write">
                <li>${data.report_admin}</li>
                <li>신고일 : ${data.created_at.substring(0,10) + ' ' + data.created_at.substring(11,16)}</li>
            </ul>
        </li>
        <li>${data.report_reason}</li>
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