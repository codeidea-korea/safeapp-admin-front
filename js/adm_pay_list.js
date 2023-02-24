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
    let result = `<tr><td colspan="10">결과가 존재하지 않습니다</td></tr>`;
    let totalAmount = 0;

    if(data.count > 0) {
        result = ``;
        totalAmount = data.list[0].totalAmount;
        data.list.forEach(function(data,idx) {
            result += `
            <tr onclick="goDetail(${data.id})">
                <td>${data.merchant_uid ? data.merchant_uid : ''}</td>
                <td>${data.user_id ? data.user_id : ''}</td>
                <td>${data.user_name ? data.user_name : ''}</td>
                <td>${data.phone_no ? data.phone_no : ''}</td>
                <td>${getOrderType(data.order_type)}</td>
                <td>${getUserStatus(data.auth_status)}</td>
                <td>${data.efective_start_at.substring(0,10)} ~ ${data.efective_end_at.substring(0,10)}</td>
                <td>${data.created_at.substring(0,10)}</td>
                <td>${data.amount ? setMoneyComma(data.amount)+' 원' : '0 원'}</td>
                <td>${getPayMethod(data.pay_method)}</td>
                <td>${getPayStatus(data.pay_status)}</td>
            </tr>
            `;
        });
    }

    $('#main_tbody').html(result);
    makePaging(Math.ceil(data.count / PAGE_SIZE), PAGE_NO, setList);

    $('#total_amount').html(`${setMoneyComma(totalAmount)} 원`);
}

// 멤버십 결제 가져오기
function getList() {
    let result = {};
    let url = '/membership/list?pageNo='+PAGE_NO+'&pageSize='+PAGE_SIZE;

    const sValue = $('#s_value').val();
    const orderType = $('#s_type02').val();
    const status = $('#s_type03').val();
    const createdAtStart = $('#datepicker1').val();
    const createdAtEnd = $('#datepicker2').val();

    url += sValue ? '&'+$('#s_type01').val()+'='+sValue : '';   // 이름 검색
    url += orderType ? '&orderType='+orderType : '';    // 멤버십 유형
    url += status ? '&status='+status : ''; // 멤버십 상태
    url += createdAtStart ? '&createdAtStart='+createdAtStart : '';  // 결제일(시작)

    // createdAtEnd는 +1일 해서 보내라고 전달받음
    if(createdAtEnd) {
        const date = new Date(createdAtEnd);
        date.setDate(date.getDate() + 1);
        url += '&createdAtEnd='+changeDateFormat(date); // 결제일(종료)
    }

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
    modalAlert('준비중입니다.');
    // location.href='main.html?menu=adm_pay_request';
}

// 엑셀 내보내기
function goExcel() {
    modalAlert('준비중입니다.');
}