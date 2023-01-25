let PK = 0;

$(function() {
    init();
});

// 최초 실행 함수
function init() {
    setInfo();
}

// 멤버십 상세 정보 뿌려주기
function setInfo() {
    const data = getInfo();

    // TODO : 데이터 바인딩

    $('#no').text('00001234');
    $('#id').text('아이디1');
    $('#name').text('홍길동');
    $('#phone').text('010-0000-0000');
    $('#type').text('팀');
    $('#status').text('사용중');
    $('#datepicker1').val('2022-10-11');
    $('#datepicker2').val('2022-12-11');
    $('#payment_date').text('2022-10-11');
    $('#payment_amount').text('100,000원');
    $('#payment_type').text('카드결제');
    $('#payment_status').text('결제완료');
    $('#text_word').html('관리자가 작성한 메모가 나오는 영역입니다.');
}

// 멤버십 상세 정보 가져오기
function getInfo() {
    PK = new URL(window.location.href).searchParams.get('pk');
    let result = {};

    // TODO : 멤버십 상세정보 가져오기

    return result;
}

// 취소
function goDetail() {
    location.href='main.html?menu=adm_pay_detail&pk=' + PK;
}

// 저장
function update() {
    const $startDate = $('#datepicker1');
    const $endDate = $('#datepicker2');
    const $comments = $('#text_word');

    if(!$startDate.val()) {
        modalAlert('멤버십 기간을 선택해주세요.',function() {
            $startDate.focus();
        });

    }else if(!$endDate.val()) {
        modalAlert('멤버십 기간을 선택해주세요.',function() {
            $endDate.focus();
        });

    }else {
        modalConfirm('저장하시겠습니까?','취소','저장',function() {
            let submitData = {};
            submitData['startDate'] = $startDate.val();
            submitData['endDate'] = $endDate.val();
            submitData['comments'] = $comments.val();

            // TODO : 멤버십 결제 정보 저장

            modalAlert('저장되었습니다.',function() {
                goDetail();
            });
        });
    }
}

// 해지
function terminate() {
    modalConfirm('멤버십을 해지하시겠습니까?','취소','확인',function() {
        let submitData = {};
        submitData['pk'] = PK;

        // TODO : 멤버십 해지

        modalAlert('해지되었습니다.',function() {
            goDetail();
        });
    });
}

// 결제취소
function paymentCancel() {
    modalConfirm('결제를 취소하시겠습니까?','취소','확인',function() {
        let submitData = {};
        submitData['pk'] = PK;

        // TODO : 결제 취소

        modalAlert('결제가 취소되었습니다.',function() {
            goDetail();
        });
    });
}