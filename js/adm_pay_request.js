$(function() {
    $("#s_value").on("keyup",function(key){
        if(key.keyCode === 13) search();
    });
});

// 검색
function search() {
    let submitData = {};
    submitData['type'] = $('#s_type').val();
    submitData['value'] = $('#s_value').val();

    // TODO : 회원 검색

    if(true) {
        $('.tag').append(makeUserElem(1,'아이디'));
        $('#s_value').val('');

    }else {
        modalAlert('결과가 존재하지 않습니다.');
    }
}

// 회원 span 엘리먼트 생성
function makeUserElem(pk,id) {
    return `
    <span class="srtag btn btn_g mt10" data-pk="${pk}">
        <span>${id}</span>
        <img src="./resources/img/icon/cancle.png" alt="태그 삭제" class="ml5" onclick="removeUserElem(this)"/>
    </span>
    `;
}

// 회원 span 엘리먼트 제거
function removeUserElem(elem) {
    $(elem).closest('.srtag').remove();
}

// 목록
function goList() {
    location.href='main.html?menu=adm_pay_list';
}

// 결제요청 모달
function showModal() {
    const $users = $('.srtag');
    const $payment = $('#payment');
    const $startDate = $('#datepicker1');
    const $endDate = $('#datepicker2');
    const $comments = $('#text_word');

    if($users.length === 0) {
        modalAlert('결제자를 등록해주세요.',function() {
            $('#s_value').focus();
        });

    }else if(!$payment.val()) {
        modalAlert('결제금액을 확인해주세요.',function() {
            $payment.focus();
        });

    }else if(!$startDate.val()) {
        modalAlert('사용기간을 선택해주세요.',function() {
            $startDate.focus();
        });

    }else if(!$endDate.val()) {
        modalAlert('사용기간을 선택해주세요.',function() {
            $endDate.focus();
        });

    }else {
        let users = '';
        $users.each(function(idx,elem) {
            users += $(elem).find('span').text() + ', ';
        });

        $('#m_users').text(users.slice(0, -2));
        $('#m_payment').text($payment.val());
        $('#m_period').text($startDate.val() + ' ~ ' + $endDate.val());
        $('#m_comments').html($comments.val());

        modalToggle($('#payment_modal'));
    }
}

// 결제요청
function save() {
    let submitData = {};

    let users = [];
    $('.srtag').each(function(idx,elem) {
        users.push($(elem).data('pk'));
    });

    submitData['users'] = users;
    submitData['payment'] = $('#payment').val();
    submitData['startDate'] = $('#datepicker1').val();
    submitData['endDate'] = $('#datepicker2').val();
    submitData['comments'] = $('#text_word').val();

    console.log(submitData)

    // TODO : 결제요청

    modalAlert('요청되었습니다.',function() {
        goList();
    });
}


