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

    // TODO : 데이터 바인딩

    $('#category').text(111111);
    $('#service').text(222222);
    $('#tit_word').text(333333);
    $('#reg_date').text(444444);
    $('#reply_date').text(555555);
    $('#file_name a').text(666666);
    $('#text_word').html(777777);
    $('#reply').html(888888);
}

// 문의 상세 정보 가져오기
function getInfo() {
    PK = new URL(window.location.href).searchParams.get('pk');
    let result = {};

    // TODO : 문의 상세정보 가져오기

    return result;
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

    console.log(replyContents);
    console.log(PK);

    if(!replyContents) {
        modalAlert('답변을 입력해주세요.');

    }else {
        modalConfirm('답변을 저장하시겠습니까?','취소','저장',function() {
            // TODO : 답변 저장

            modalAlert('저장되었습니다.',function() {
                location.reload();
            });
        });
    }
}