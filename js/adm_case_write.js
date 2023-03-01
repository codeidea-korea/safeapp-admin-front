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
    const $name = $('#name');
    const $datepicker1 = $('#datepicker1');
    const $time_hh = $('#time_hh');
    const $time_mm = $('#time_mm');
    const $detail = $('#detail');
    const $reason = $('#reason');
    const $reason_detail = $('#reason_detail');
    const $measures = $('#measures');

    if(!$title.val()) {
        modalAlert('제목을 입력해주세요.', function() { $title.focus(); });

    }/*else if($tag_list.find('li').length <= 0) {
        modalAlert('태그를 입력해주세요.', function() { $('#tag').focus(); });

    }*/else if(!$name.val()) {
        modalAlert('사고명을 입력해주세요.', function() { $name.focus(); });

    }else if(!$datepicker1.val()) {
        modalAlert('사고발생일시를 입력해주세요.', function() { $datepicker1.focus(); });

    }else if(!$time_hh.val() || $time_hh.val().length > 2) {
        modalAlert('사고발생일시를 입력해주세요.', function() { $time_hh.focus(); });

    }else if(!$time_mm.val() || $time_mm.val().length > 2) {
        modalAlert('사고발생일시를 입력해주세요.', function() { $time_mm.focus(); });

    }else if(!$detail.val()) {
        modalAlert('사고경위를 입력해주세요.', function() { $detail.focus(); });

    }else if(!$reason.val()) {
        modalAlert('사고원인을 입력해주세요.', function() { $reason.focus(); });

    }else if(!$reason_detail.val()) {
        modalAlert('구체적 사고원인을 입력해주세요.', function() { $reason_detail.focus(); });

    }else if(!$measures.val()) {
        modalAlert('재발방지대책을 입력해주세요.', function() { $measures.focus(); });

    }/*else if(FINAL_FILE_ARR.length === 0) {
        modalAlert('이미지를 첨부해주세요.', function() { $('.img_upload').focus(); });

    }*/else {
        modalConfirm('등록하시겠습니까?','취소','등록',function() {
            new Promise( (succ, fail)=>{
                let submitData = {};
                let tagArr = [];

                $tag_list.find('.tag-item-value').each(function(idx,elem) {
                    tagArr.push(elem.innerText);
                });

                submitData['accident_at'] = $datepicker1.val() + 'T' + numberPad($time_hh.val(), 2) + ':' + numberPad($time_mm.val(), 2)+':00';
                submitData['accident_cause'] = $reason.val();
                submitData['accident_reason'] = $detail.val();
                submitData['accident_uid'] = '';
                submitData['admin_id'] = getUserInfo().id;
                submitData['cause_detail'] = $reason_detail.val();
                submitData['image'] = '';
                submitData['name'] = $name.val();
                submitData['response'] = $measures.val();
                submitData['tags'] = tagArr.join('|');
                submitData['title'] = $title.val();

                commonAjax(
                    'POST',
                    '/board/accExp/add',
                    true,
                    false,
                    submitData,
                    function(response) {
                        succ(response);
                    },
                    function(error) {

                    });
            }).then((arg) =>{
                if(FINAL_FILE_ARR.length > 0) {
                    let formData = new FormData();
                    FINAL_FILE_ARR.forEach(function(file) {
                        formData.append('files', file);
                    });

                    commonMultiPartAjax(
                        'POST',
                        '/board/accExp/add/'+arg.id+'/files',
                        false,
                        formData,
                        function(response) {
                            modalAlert('등록되었습니다.',function() {
                                location.href='/main.html?menu=adm_case_list';
                            });
                        },
                        function(error) {

                        });
                }else {
                    modalAlert('등록되었습니다.',function() {
                        location.href='/main.html?menu=adm_case_list';
                    });
                }
            });
        });
    }
}