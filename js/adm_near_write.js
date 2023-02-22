let FINAL_FILE_ARR = [];

$(function() {
    init();
});

// 최초 실행 함수
function init() {
    setTagEvent(10, false);
    setMultiImgView(FINAL_FILE_ARR);
}

// 저장
function save() {
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

    }/*else if(FINAL_FILE_ARR.length === 0) {
        modalAlert('이미지를 첨부해주세요.', function() { $('.img_upload').focus(); });

    }*/else {
        modalConfirm('등록하시겠습니까?','취소','등록',function() {
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
            submitData['admin_id'] = getUserInfo().id;

            commonAjax(
                'POST',
                '/board/conExp/add',
                true,
                false,
                submitData,
                function(response) {
                    modalAlert('등록되었습니다.',function() {
                        location.href='/main.html?menu=adm_near_list';
                    });
                },
                function(error) {

                });

            /*let formData = new FormData();
            formData.append('title', $title.val());
            formData.append('tags', tagArr.join('|'));
            formData.append('work_contents', $work_contents.val());
            formData.append('worker', $worker.val());
            formData.append('type', $type.val());
            formData.append('location', $location.val());
            formData.append('contents', $contents.val());
            formData.append('reason', $reason.val());
            formData.append('measures', $measures.val());

            FINAL_FILE_ARR.forEach(function(file) {
                formData.append('files', file);
            });*/


            modalAlert('등록되었습니다.',function() {
                location.href='/main.html?menu=adm_near_list';
            });
        });
    }
}