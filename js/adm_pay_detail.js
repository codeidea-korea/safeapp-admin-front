let PK = 0;

$(function() {
    init();
});

// 최초 실행 함수
function init() {
    setInfo();
}

// 멤버십 결제 상세 정보 뿌려주기
function setInfo() {
    const data = getInfo();

    $('#no').text(data.merchant_uid ? data.merchant_uid : '');
    $('#id').text(data.user_id ? data.user_id : '');
    $('#name').text(data.user_name ? data.user_name : '');
    $('#phone').text(data.phone_no ? data.phone_no : '');
    $('#type').text(data.order_type ? getOrderType(data.order_type) : '');
    $('#status').text(data.auth_status ? getUserStatus(data.auth_status) : '');
    $('#period').text(data.efective_start_at.substring(0,10) + ' ~ ' + data.efective_end_at.substring(0,10));
    $('#payment_date').text(data.created_at.substring(0,10));
    $('#payment_amount').text(data.amount ? setMoneyComma(data.amount)+' 원' : '0 원');
    $('#payment_type').text(data.pay_method ? getPayMethod(data.pay_method) : '');
    $('#payment_status').text(data.pay_status ? getPayStatus(data.pay_status) : '');
    $('#comments').html(data.memo ? data.memo : '');
}

// 멤버십 결제 상세 정보 가져오기
function getInfo() {
    PK = new URL(window.location.href).searchParams.get('pk');
    let result = {};

    commonAjax(
        'GET',
        '/membership/find/'+PK,
        false,
        false,
        {},
        function(response) {
            result = response;
        },
        function(error) {

        });

    return result;
}

// 목록
function goList() {
    location.href='main.html?menu=adm_pay_list';
}

// 수정
function goEdit() {
    location.href='main.html?menu=adm_pay_adj&pk='+PK;
}