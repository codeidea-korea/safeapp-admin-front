let FINAL_FILE_ARR = [];
let DELETE_FILE_SEQ_ARR = [];
let PK = 0;

$(function() {
    init();
});

// 최초 실행 함수
function init() {
    setTagEvent(10, false);
    setMultiImgView(FINAL_FILE_ARR);
    setInfo();
}

// 정보 셋팅
function setInfo() {
    const data = getInfo();
    
    // TODO : 데이터 바인딩

    $('#title').val(1111);

    const tags = ['aaa','bbb','ccc'];
    tags.forEach(function(data) {
        makeTagBox($("#tag-list"),data);
    });

    $('#work_contents').val(1111);
    $('#worker').val(1111);
    $('#type').val(1111);
    $('#location').val(1111);
    $('#contents').val(1111);
    $('#reason').val(1111);
    $('#measures').val(1111);

    const imgs = ['../resources/img/logo.png','../resources/img/logo.png','../resources/img/logo.png','../resources/img/logo.png'];
    imgs.forEach(function(data) {
        $('#att_zone2').append(makeImgDiv(data));
    });
}

// 아차사고 상세 정보 가져오기
function getInfo() {
    // TODO : 아차사고 상세 정보 조회

    PK = new URL(window.location.href).searchParams.get('pk');
}

// 등록된 이미지 - div 만들기
function makeImgDiv (src) {
    let div_style = 'position: relative;display: inline-flex;justify-content: center;align-items: center;width: 33%;aspect-ratio: 16 / 9; border:1px solid #ddd;margin-right: 10px;padding:10px';
    let img_style = 'max-height:100%';
    let chk_style = 'width: 20px;height: 20px;position: absolute;font-size: 12px;right: 5px;top: 5px;z-index: 999;border: 1px solid #999;border-radius: 50px;background-color: rgba(255,255,255,0.1);color: #999;cursor:pointer';

    let img = document.createElement('img')
    img.setAttribute('style', img_style)
    img.src = src;

    let div = document.createElement('div')
    div.setAttribute('style', div_style)

    let btn = document.createElement('input')
    btn.setAttribute('type', 'button')
    btn.setAttribute('value', 'x')
    btn.setAttribute('style', chk_style);

    // TODO : img 파일의 pk 매개변수로 넣어주기
    btn.setAttribute('onclick', "deleteOrgImg(1,this)");

    div.appendChild(img)
    div.appendChild(btn)
    return div;
}

// 등록된 이미지 - X버튼 클릭
function deleteOrgImg(pk,elem) {
    DELETE_FILE_SEQ_ARR.push(pk);
    $(elem).parent().remove();
}

// 저장
function update() {
    const $title = $('#title');
    const $tag_list = $('#tag-list');
    const $work_contents = $('#work_contents');
    const $worker = $('#worker');
    const $type = $('#type');
    const $location = $('#location');
    const $contents = $('#contents');
    const $reason = $('#reason');
    const $measures = $('#measures');

    if(!$title.val()) {
        modalAlert('제목을 입력해주세요.', function() { $title.focus(); });

    }else if($tag_list.find('li').length <= 0) {
        modalAlert('태그를 입력해주세요.', function() { $('#tag').focus(); });

    }else if(!$work_contents.val()) {
        modalAlert('작업내용을 입력해주세요.', function() { $work_contents.focus(); });

    }else if(!$worker.val()) {
        modalAlert('작업자를 입력해주세요.', function() { $worker.focus(); });

    }else if(!$type.val()) {
        modalAlert('발생유형을 입력해주세요.', function() { $type.focus(); });

    }else if(!$location.val()) {
        modalAlert('발생장소를 입력해주세요.', function() { $location.focus(); });

    }else if(!$contents.val()) {
        modalAlert('발생개요 및 예상피해를 입력해주세요.', function() { $contents.focus(); });

    }else if(!$reason.val()) {
        modalAlert('발생원인을 입력해주세요.', function() { $reason.focus(); });

    }else if(!$measures.val()) {
        modalAlert('관리대책을 입력해주세요.', function() { $measures.focus(); });

    }else {
        modalConfirm('수정하시겠습니까?','취소','수정',function() {
            let formData = new FormData();

            formData.append('$title', $title.val());

            $tag_list.find('.tag-item-value').each(function(idx,elem) {
                formData.append('tags', elem.innerText);
            });

            formData.append('work_contents', $work_contents.val());
            formData.append('worker', $worker.val());
            formData.append('type', $type.val());
            formData.append('location', $location.val());
            formData.append('contents', $contents.val());
            formData.append('reason', $reason.val());
            formData.append('measures', $measures.val());

            /**
             * 파일 삭제 및 등록 부분은 백엔드 API에 따라 로직을 바꿔야 될 수도 있음
             */

            // 삭제할 파일들의 file pk 배열
            if(DELETE_FILE_SEQ_ARR.length > 0) {
                DELETE_FILE_SEQ_ARR.forEach(function(pk) {
                    formData.append('del_files', pk);
                });
            }

            // 추가할 파일들의 file 객체 배열
            if(FINAL_FILE_ARR.length > 0) {
                FINAL_FILE_ARR.forEach(function(file) {
                    formData.append('files', file);
                });
            }

            // TODO : 아차사고 수정

            modalAlert('수정되었습니다.',function() {
                location.href='/main.html?menu=adm_near_detail&pk='+PK;
            });
        });
    }
}