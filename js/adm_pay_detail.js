let PK = 0;

$(function() {
    init();
});

// 최초 실행 함수
function init() {
    setInfo();
}

// 정책관리 상세 정보 뿌려주기
function setInfo() {
    const data = getInfo();

    // TODO : 데이터 바인딩

    $('#no').text('00001234');
    $('#id').text('아이디1');
    $('#name').text('홍길동');
    $('#phone').text('010-0000-0000');
    $('#type').text('팀');
    $('#status').text('사용중');
    $('#period').text('2022-10-11 ~ 2022-12-11');
    $('#payment_date').text('2022-10-11');
    $('#payment_amount').text('100,000원');
    $('#payment_type').text('카드결제');
    $('#payment_status').text('결제완료');
    $('#comments').html('관리자가 작성한 메모가 나오는 영역입니다.');
}

// 정책관리 상세 정보 가져오기
function getInfo() {
    PK = new URL(window.location.href).searchParams.get('pk');
    let result = {};

    // TODO : 멤버십 결제 상세정보 가져오기

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