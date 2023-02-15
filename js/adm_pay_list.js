let PAGE_SIZE = 15;
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

    const data = getList();
    let result = `<tr><td colspan="11">결과가 존재하지 않습니다</td></tr>`;

    if(data.count > 0) {
        result = ``;
        data.list.forEach(function(data,idx) {
            result += `
            <tr onclick="goDetail(${data.id})">
                <td>${data.merchant_uid}</td>
                <td>${data.user_id}</td>
                <td>${data.user_name}</td>
                <td>${data.phone_no}</td>
                <td>${data.order_type}</td>
                <td>${data.auth_status}</td>
                <td>${data.efective_start_at.substring(0,10)} ~ ${data.efective_end_at.substring(0,10)}</td>
                <td>${data.created_at.substring(0,10)}</td>
                <td>${data.amount}원</td>
                <td>${data.pay_method}</td>
                <td>${data.pay_status}</td>
            </tr>
            `;
        });

        // merchant_uid 너무길어
        // order_type, auth_status, pay_method, pay_status, 한글명으로 바꿔야됨
    }

    $('#main_tbody').html(result);
    makePaging(Math.ceil(data.count / PAGE_SIZE), PAGE_NO, setList);
}

// 멤버십 결제 가져오기
function getList() {
    // console.log($('#s_value').val());
    // console.log($('#s_type01').val());
    // console.log($('#s_type02').val());
    // console.log($('#s_type03').val());
    // console.log($('#datepicker1').val());
    // console.log($('#datepicker2').val());

    let result = {};
    let url = '/membership/list?pageNo='+PAGE_NO+'&pageSize='+PAGE_SIZE;

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

// 멤버십 결제 상세 페이지로 이동
function goDetail(pk) {
    location.href='main.html?menu=adm_pay_detail&pk='+pk;
}

// 멤버십 결제 요청 페이지로 이동
function goRequest() {
    location.href='main.html?menu=adm_pay_request';
}

// 엑셀 내보내기
function goExcel() {

}