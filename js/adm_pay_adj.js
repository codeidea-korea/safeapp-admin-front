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
    $('#datepicker1').val(data.efective_start_at.substring(0,10));
    $('#datepicker2').val(data.efective_end_at.substring(0,10));
    $('#payment_date').text(data.created_at.substring(0,10));
    $('#payment_amount').text(data.amount+'원');
    $('#payment_type').text(data.pay_method ? getPayMethod(data.pay_method) : '');
    $('#payment_status').text(data.pay_status ? getPayStatus(data.pay_status) : '');
    $('#text_word').val(data.memo ? data.memo : '');
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
            const efective_start_at = new Date($startDate.val());
            const efective_end_at = new Date($endDate.val());
            efective_start_at.setDate(efective_start_at.getDate() + 1);
            efective_end_at.setDate(efective_end_at.getDate() + 1);

            let submitData = {};
            submitData['efective_start_at'] = changeDateFormat(efective_start_at) + 'T00:00:00';
            submitData['efective_end_at'] = changeDateFormat(efective_end_at) + 'T00:00:00';
            submitData['memo'] = $comments.val();

            commonAjax(
                'PUT',
                '/membership/edit/'+PK,
                true,
                false,
                submitData,
                function(response) {
                    modalAlert('저장되었습니다.',goDetail);
                },
                function(error) {

                });
        });
    }
}

// 해지
function terminate() {
    modalConfirm('멤버십을 해지하시겠습니까?','취소','확인',function() {
        commonAjax(
            'PUT',
            '/membership/unsubscribe/'+PK,
            false,
            false,
            {},
            function(response) {
                modalAlert('해지되었습니다.',goDetail);
            },
            function(error) {

            });
    });
}

// 결제취소
function paymentCancel() {
    modalAlert('준비중입니다.');
    return;

    modalConfirm('결제를 취소하시겠습니까?','취소','확인',function() {
        let submitData = {};
        submitData['pk'] = PK;

        // TODO : 결제 취소

        modalAlert('결제가 취소되었습니다.',function() {
            goDetail();
        });
    });
}