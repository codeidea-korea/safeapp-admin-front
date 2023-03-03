let PK = 0;

$(function() {
    init();
});

// 최초 실행 함수
function init() {
    setInfo();
}

// 문의 상세 정보 뿌려주기
function setInfo() {
    const data = getInfo();

    $('#category').text(getInquiryType(data.inquiry_type));
    $('#service').text(getServiceType(data.service_type));
    $('#tit_word').text(data.title);
    $('#reg_user').text(data.user_name ? data.user_name : data.admin_name);
    $('#reg_date').text(data.created_at.substring(0,10));
    $('#reply_date').text(data?.answer_at?.substring(0,10));
    $('#file_name a').text(data.attachment_name ? data.attachment_name : '');
    $('#text_word').html(data.contents);
    $('#reply').html(data.answer);
}

// 문의 상세 정보 가져오기
function getInfo() {
    PK = new URL(window.location.href).searchParams.get('pk');
    let result = {};

    commonAjax(
        'GET',
        '/board/inquiry/find/'+PK,
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

// 유형 한글명
function getInquiryType(value) {
    if(value === 'REPORT') {
        return '신고';
    }else if(value === 'QUESTION') {
        return '문의';
    }else if(value === 'PROPOSAL') {
        return '제안';
    }
}

// 서비스 한글명
function getServiceType(value) {
    if(value === 'REPORT') {
        return '신고';
    }else if(value === 'MEMBERSHIP') {
        return '멤버십';
    }else if(value === 'PAYMENT') {
        return '결제';
    }else if(value === 'PROJECT') {
        return '프로젝트';
    }else if(value === 'CHECKLIST') {
        return '체크리스트';
    }else if(value === 'RISKCHECK') {
        return '위험성평가';
    }else if(value === 'ACCIDENT') {
        return '사고사례';
    }else if(value === 'CONCERN_ACCIDENT') {
        return '아차사고';
    }else if(value === 'DASHBOARD') {
        return '대시보드';
    }else if(value === 'REGISTER') {
        return '회원가입';
    }else if(value === 'ETC') {
        return '기타';
    }else {
        return value;
    }
}

// 답변 클릭
function clickReply() {
    const $reply = $('#reply');
    const $save_btn = $('#save_btn');
    const contents = $reply.html();

    $reply.html(`<textarea id="reply_contents" name="text_word" class="autosize" onkeydown="resize(this)" onkeyup="resize(this)">${contents}</textarea>`);
    $save_btn.attr('onclick','save()');
    $save_btn.text('저장');
}

// 답변 저장
function save() {
    const replyContents = $('#reply_contents').val();

    if(!replyContents) {
        modalAlert('답변을 입력해주세요.');

    }else {
        modalConfirm('답변을 저장하시겠습니까?','취소','저장',function() {
            let submitData = {
                "answer": replyContents,
                "answer_admin_id": getUserInfo().id
            };
            commonAjax(
                'PUT',
                '/board/inquiry/answer/'+PK,
                true,
                false,
                submitData,
                function(response) {
                    modalAlert('저장되었습니다.',function() {
                        location.reload();
                    });
                },
                function(response) {

                });
        });
    }
}