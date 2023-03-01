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

    $('#title').val(data.title);

    let tags = [];

    if(data?.tags?.includes('|')) {
        tags = data.tags.split('|');

    }else {
        if(data.tags) {
            tags.push(data.tags);
        }
    }

    tags.forEach(function(data) {
        makeTagBox($("#tag-list"),data);
    });

    $('#work_contents').val(data.name);
    $('#worker').val(data.accident_user_name);
    $('#type').val(data.accident_type);
    $('#location').val(data.accident_place);
    $('#contents').val(data.cause_detail);
    $('#reason').val(data.accident_reason);
    $('#measures').val(data.response);

    if(data.images) {
        let imgs = [];
        let imgKeys = [];

        imgs = data.images;
        imgKeys = Object.keys(data.images);

        imgKeys.forEach(function(data,idx) {
            $('#att_zone2').append(makeImgDiv(imgs[data],data));
        });
    }
    else {
        $('#img_tr').remove();
    }
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

// 등록된 이미지 - div 만들기
function makeImgDiv (src,pk) {
    let div_style = 'position: relative;display: inline-flex;justify-content: center;align-items: center;width: 33%;aspect-ratio: 16 / 9; border:1px solid #ddd;margin-right: 10px;padding:10px';
    let img_style = 'max-height:100%';
    let chk_style = 'width: 20px;height: 20px;position: absolute;font-size: 12px;right: 5px;top: 5px;z-index: 999;border: 1px solid #999;border-radius: 50px;background-color: rgba(255,255,255,0.1);color: #999;cursor:pointer';

    let img = document.createElement('img')
    img.setAttribute('style', img_style)
    img.src = USER_SERVER_URL+src;

    let div = document.createElement('div')
    div.setAttribute('style', div_style)

    let btn = document.createElement('input')
    btn.setAttribute('type', 'button')
    btn.setAttribute('value', 'x')
    btn.setAttribute('style', chk_style);
    btn.setAttribute('onclick', "deleteOrgImg("+pk+",this)");

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

    }/*else if($tag_list.find('li').length <= 0) {
        modalAlert('태그를 입력해주세요.', function() { $('#tag').focus(); });

    }*/else if(!$work_contents.val()) {
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
            new Promise( (succ, fail)=>{
                let submitData = {};
                let tagArr = [];

                $tag_list.find('.tag-item-value').each(function(idx,elem) {
                    tagArr.push(elem.innerText);
                });

                submitData['title'] = $title.val();
                submitData['tags'] = tagArr.join('|');
                submitData['name'] = $work_contents.val();
                submitData['accident_user_name'] = $worker.val();
                submitData['accident_type'] = $type.val();
                submitData['accident_place'] = $location.val();
                submitData['cause_detail'] = $contents.val();
                submitData['accident_reason'] = $reason.val();
                submitData['response'] = $measures.val();
                submitData['image'] = '';

                commonAjax(
                    'PUT',
                    '/board/conExp/edit/'+PK,
                    true,
                    false,
                    submitData,
                    function(response) {
                        succ(response);
                    },
                    function(error) {

                    });

            }).then((arg) =>{
                // 사고사례 수정 끝나면 첨부파일 등록
                new Promise( (succ2, fail2)=>{
                    if(FINAL_FILE_ARR.length > 0) {
                        let formData = new FormData();
                        FINAL_FILE_ARR.forEach(function(file) {
                            formData.append('files', file);
                        });

                        commonMultiPartAjax(
                            'POST',
                            '/board/conExp/add/'+arg.id+'/files',
                            false,
                            formData,
                            function(response) {
                                succ2();
                            },
                            function(error) {

                            });
                    }else {
                        succ2();
                    }

                }).then(() =>{
                    // 첨부파일 등록 끝나면 첨부파일 삭제
                    if(DELETE_FILE_SEQ_ARR.length > 0) {
                        let cnt = 0;
                        DELETE_FILE_SEQ_ARR.forEach(function(pk) {
                            commonAjax(
                                'DELETE',
                                '/board/conExp/file/remove/'+pk,
                                false,
                                false,
                                {},
                                function(response) {
                                    cnt++;

                                    if(cnt === DELETE_FILE_SEQ_ARR.length) {
                                        modalAlert('수정되었습니다.',function() {
                                            location.href='/main.html?menu=adm_near_detail&pk='+PK;
                                        });
                                    }
                                },
                                function(error) {

                                });
                        });
                    }else {
                        modalAlert('수정되었습니다.',function() {
                            location.href='/main.html?menu=adm_near_detail&pk='+PK;
                        });
                    }
                });
            });
        });
    }
}