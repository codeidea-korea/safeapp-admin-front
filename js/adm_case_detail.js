let PK = 0;

$(function() {
    init();
});

// 최초 실행 함수
function init() {
    setInfo();
}

// 사고사례 정보 뿌려주기
function setInfo() {
    const data = getInfo();

    let tags = [];

    if(data.tags.includes('|')) {
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

    const $section02 = $('#section02');
    $section02.find('#s0201').html(data.name);
    $section02.find('#s0202').html(data.accident_at.substring(0,10) + ' ' + data.accident_at.substring(11,16));
    $section02.find('#s0203').html(data.accident_reason);
    $section02.find('#s0204').html(data.accident_cause);
    $section02.find('#s0205').html(data.cause_detail);
    $section02.find('#s0206').html(data.response);

    // section03 이미지들
    let imgs = [];
    let imgElem = ``;

    if(data.image) {
        $('#section03').html(`
            <td>
                <p class="fs-lg fwb mb20">참고사진</p>
                <div class="img_box_wrap"></div>
            </td>
        `);

        imgs.push(data.image);
        imgs.forEach(function(data) {
            imgElem += `<div class="img_box"><img src="${data}"></div>`;
        });

        $('#section03 .img_box_wrap').html(imgElem);
    }


}

// 사고사례 정보 가져오기
function getInfo() {
    PK = new URL(window.location.href).searchParams.get('pk');
    let result = {};

    commonAjax(
        'GET',
        '/board/accExp/find/'+PK,
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
    location.href='main.html?menu=adm_case_list';
}

// 수정으로
function goEdit() {
    location.href='main.html?menu=adm_case_adj&pk='+PK;
}