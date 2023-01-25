let PK = 0;

$(function() {
    init();
});

// 최초 실행 함수
function init() {
    // TODO : 아차사고 상세 정보 가져오기

    PK = new URL(window.location.href).searchParams.get('pk');

    setInfo();
}

// 사용자 정보 뿌려주기
function setInfo() {
    // TODO : 데이터 바인딩

    const data = getInfo();
    
    // section01 태그들
    const tags = ['#aaa','#bbb','#ccc','#ddd'];
    let tagElem = ``;
    tags.forEach(function(data) {
        tagElem += `<li>${data}</li>`;
    });

    const $section01 = $('#section01');
    $section01.find('#line01').html('통영시 가오치항 어촌 뉴딜 300사업 4건축공사 2층 옹벽 거푸집 해체 중 작업자 1인 인명사고');
    $section01.find('#line02').html('홍길동 | 등록일 : 2022-02-03 | 열람횟수 : 123,456회');
    $section01.find('#line03').html(tagElem);

    // 신고하기 팝업 내용 (section01 내용과 같음)
    $('#report_layerpop #pop_line01').html('통영시 가오치항 어촌 뉴딜 300사업 4건축공사 2층 옹벽 거푸집 해체 중 작업자 1인 인명사고');
    $('#report_layerpop #pop_line02').html('홍길동 | 등록일 : 2022-02-03 | 열람횟수 : 123,456회');

    const $section02 = $('#section02');
    $section02.find('#s0201').html('자재인양');
    $section02.find('#s0202').html('형틀팀 신호수');
    $section02.find('#s0203').html('낙하/비례');
    $section02.find('#s0204').html('자재야적장');
    $section02.find('#s0205').html('W400이하 거푸집 자재 인양 중 슬링벨트 인양시 상부 및 내측으로의 과압력 작용');
    $section02.find('#s0206').html('작업발판 이음고리 손상, 작업 전 자재의 파손유무 등 사전안전점검 미흡');
    $section02.find('#s0207').html(`1. 가설자재 입고 시 외관상태의 손상 유무 점검<br>2. 상하 동시 작업 금지 또는 긴밀한 연락체계 구축`);

    // section03 이미지들
    const imgs = ['../resources/img/logo.png','../resources/img/logo.png','../resources/img/logo.png','../resources/img/logo.png'];
    let imgElem = ``;
    imgs.forEach(function(data) {
        imgElem += `<div class="img_box"><img src="${data}"></div>`;
    });

    $('#section03 .img_box_wrap').html(imgElem);
}

// 아차사고 상세 정보 가져오기
function getInfo() {
    // TODO : 아차사고 상세 정보 가져오기
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