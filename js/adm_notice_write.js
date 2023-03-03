// 등록
function save() {
    $('.error').hide();
    const $category = $('#category').val();
    const $important = $('#pr_check').is(':checked');
    const $tit_word = $('#tit_word').val();
    const $file = $('#file')[0].files;
    const $text_word = $('#text_word').val();

    if(!$tit_word) {
        modalAlert('제목을 입력해주세요.',function(){});

    }else if(!$text_word) {
        modalAlert('내용을 입력해주세요.',function(){});

    }else {
        modalConfirm('등록하시겠습니까?', '취소', '등록', function() {
            new Promise( (succ, fail)=>{
                const submitData = {
                    "admin_id": getUserInfo().id,
                    "contents": $text_word,
                    "priority": $important,
                    "title": $tit_word,
                    "type": $category
                };
                commonAjax(
                    'POST',
                    '/board/notice/add',
                    true,
                    false,
                    submitData,
                    function(response) {
                        if($file.length > 0) {
                            succ(response);
                        }else {
                            modalAlert('등록되었습니다.',function() {
                                location.href='main.html?menu=adm_notice_list';
                            });
                        }
                    },
                    function(error) {

                    });

            }).then((args) =>{
                let formData = new FormData();
                formData.append('files', $file[0]);

                commonMultiPartAjax(
                    'POST',
                    '/board/notice/add/'+args.id+'/files',
                    false,
                    formData,
                    function(response) {
                        modalAlert('등록되었습니다.',function() {
                            location.href='main.html?menu=adm_notice_list';
                        });
                    },
                    function(error) {

                    });
            });
        })
    }
}