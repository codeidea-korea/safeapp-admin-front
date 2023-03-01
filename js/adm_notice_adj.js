$(function() {
    init();
});

// 최초 실행 함수
function init() {
    setInfo();
}

// 공지사항 세부 정보 셋팅
function setInfo() {
    const data = getInfo();

    $('#category').val(data.type);
    if(data.priority) $('#pr_check').prop('checked',true);
    $('#tit_word').val(data.title);
    $('.upload-name').val();
    $('#text_word').val(data.contents);
}

// 상세 정보 가져오기
function getInfo() {
    PK = new URL(window.location.href).searchParams.get('pk');
    let result = {};

    commonAjax(
        'GET',
        '/board/notice/find/'+PK,
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

// 수정
function update() {
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
        modalConfirm('수정하시겠습니까?', '취소', '수정', function() {
            let file = '';

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
                const submitData = {
                    "contents": $text_word,
                    "priority": $important,
                    "title": $tit_word,
                    "type": $category
                };
                commonAjax(
                    'PUT',
                    '/board/notice/edit/'+PK,
                    true,
                    false,
                    submitData,
                    function(response) {
                        modalAlert('수정되었습니다.',function() {
                            location.href='main.html?menu=adm_notice_detail&pk='+PK;
                        });
                    },
                    function(error) {

                    });
            });
        })
    }
}