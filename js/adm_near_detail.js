let PK = 0;

$(function() {
    init();
});

// 최초 실행 함수
function init() {
    setInfo();
}

// 정보 셋팅
function setInfo() {
    const data = getInfo();

    let tags = [];

    if(data?.tags?.includes('|')) {
        tags = data.tags.split('|');

    }else {
        if(data.tags) {
            tags.push(data.tags);
        }
    }

    // section01 태그들
    let tagElem = ``;
    tags.forEach(function(data) {
        tagElem += `<li>#${data}</li>`;
    });

    const $section01 = $('#section01');
    $section01.find('#line01').html(data.title);
    $section01.find('#line02').html(data.admin_name+'&nbsp;&nbsp;|&nbsp;&nbsp;등록일 : '+data.created_at.substring(0,10)+'&nbsp;&nbsp;|&nbsp;&nbsp;열람횟수 : '+data.views+'회');
    $section01.find('#line03').html(tagElem);

    // 신고하기 팝업 내용 (section01 내용과 같음)
    $('#report_layerpop #pop_line01').html(data.title);
    $('#report_layerpop #pop_line02').html(data.admin_name+'&nbsp;&nbsp;|&nbsp;&nbsp;등록일 : '+data.created_at.substring(0,10)+'&nbsp;&nbsp;|&nbsp;&nbsp;열람횟수 : '+data.views+'회');

    const $section02 = $('#section02');
    $section02.find('#s0201').html(data.name);
    $section02.find('#s0202').html(data.accident_user_name);
    $section02.find('#s0203').html(data.accident_type);
    $section02.find('#s0204').html(data.accident_place);
    $section02.find('#s0205').html(data.cause_detail);
    $section02.find('#s0206').html(data.accident_reason);
    $section02.find('#s0207').html(data.response);

    // section03 이미지들
    /*const imgs = ['../resources/img/logo.png','../resources/img/logo.png','../resources/img/logo.png','../resources/img/logo.png'];
    let imgElem = ``;
    imgs.forEach(function(data) {
        imgElem += `<div class="img_box"><img src="${data}"></div>`;
    });

    $('#section03 .img_box_wrap').html(imgElem);*/
}

// 아차사고 정보 가져오기
function getInfo() {
    PK = new URL(window.location.href).searchParams.get('pk');
    let result = {};

    commonAjax(
        'GET',
        '/board/conExp/find/'+PK,
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

// 목록으로
function goList() {
    location.href='main.html?menu=adm_near_list';
}

// 수정으로
function goEdit() {
    location.href='main.html?menu=adm_near_adj&pk='+PK;
}

// 신고하기 버튼 클릭
function showReport() {
    modalToggle($('#report_layerpop'));
}

// 신고
function report() {
    const $reason = $('#report_layerpop #text_word');
    if(!$reason.val()) {
        modalAlert('신고사유를 작성해주세요.', function() {
            $reason.focus();
        });

    }else {
        modalConfirm('신고하시겠습니까?','취소','신고',function() {
            // TODO : 신고하기

            console.log($reason.val());

            modalAlert('신고되었습니다.',function() {
                modalToggle($('#report_layerpop'));
                $reason.val('');
            })
        })
    }
}