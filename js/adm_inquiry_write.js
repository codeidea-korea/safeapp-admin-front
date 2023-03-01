// 등록
function save() {
    $('.error').hide();
    const $category = $('#category').val();
    const $service = $('#service').val();
    const $tit_word = $('#tit_word').val();
    const $file = $('#file')[0].files;
    const $text_word = $('#text_word').val();

    if(!$tit_word) {
        modalAlert('제목을 입력해주세요.',function(){});

    }else if(!$text_word) {
        modalAlert('내용을 입력해주세요.',function(){});

    }else {
        modalConfirm('등록하시겠습니까?', '취소', '등록', function() {
            /*let file = '';

            new Promise( (succ, fail)=>{
                if($file.length > 0) {
                    let formData = new FormData();
                    formData.append('file', $file[0]);

                    commonMultiPartAjax(
                        'POST',
                        '/file/upload',
                        false,
                        formData,
                        function(response) {
                            file = response.web_file_nm;
                            succ();
                        },
                        function(error) {

                        });
                }else {
                    succ();
                }
            }).then(() =>{

            });

            let formData = new FormData();

            formData.append('category', $category);
            formData.append('service', $service);
            formData.append('tit_word', $tit_word);
            formData.append('text_word', $text_word);
            formData.append('file', $file[0]);

            for (let key of formData.keys()) {
                console.log(key, ":", formData.get(key));
            }

            modalAlert('등록되었습니다.',function() {
                location.href='main.html?menu=adm_cs_list';
            });*/
        })
    }
}