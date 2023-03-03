let DATA = {};

$(function() {
    init();
});

// 최초 실행 함수
function init() {
    setInfo();
}

// 공지사항 세부 정보 셋팅
function setInfo() {
    DATA = getInfo();

    $('#category').val(DATA.type);
    if(DATA.priority) $('#pr_check').prop('checked',true);
    $('#tit_word').val(DATA.title);
    $('.upload-name').val();
    $('#text_word').val(DATA.contents);
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
            new Promise( (succ, fail)=>{
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
                        if($file.length > 0) {
                            succ(response);
                        }else {
                            modalAlert('수정되었습니다.',function() {
                                location.href='main.html?menu=adm_notice_detail&pk='+PK;
                            });
                        }
                    },
                    function(error) {

                    });

            }).then(() =>{
                new Promise( (succ2, fail2)=>{
                    commonAjax(
                        'DELETE',
                        '/board/notice/file/remove/'+Object.keys(DATA.noti_files)[0],
                        false,
                        false,
                        {},
                        function(response) {
                            succ2();
                        },
                        function(error) {

                        });

                }).then(() =>{
                    let formData = new FormData();
                    formData.append('files', $file[0]);

                    commonMultiPartAjax(
                        'POST',
                        '/board/notice/add/'+DATA.id+'/files',
                        false,
                        formData,
                        function(response) {
                            modalAlert('수정되었습니다.',function() {
                                location.href='main.html?menu=adm_notice_detail&pk='+PK;
                            });
                        },
                        function(error) {

                        });
                });
            });
        })
    }
}