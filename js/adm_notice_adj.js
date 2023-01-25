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

    // TODO : 데이터 바인딩

    $('#category').val('공지');
    $('#pr_check').prop('checked',true);
    $('#tit_word').val(11);
    $('.upload-name').val(22);
    $('#text_word').val(33);
}

// 공지사항 세부 정보 가져오기
function getInfo() {
    PK = new URL(window.location.href).searchParams.get('pk');
    let result = {};

    // TODO : 공지사항 상세 정보 조회

    /*commonAjax(
        'GET',
        '/users?pageNo='+PAGE_NO+'&pageSize='+PAGE_SIZE,
        false,
        false,
        {},
        function(response) {
            console.log('response',response);
            result = response.data;
        },
        function(error) {
            console.log('error',error);
        });*/

    return result;
}

// 수정
function update() {
    const $category = $('#category').val();
    const $important = $('#pr_check').is(':checked') === true ? 'Y' : 'N';
    const $tit_word = $('#tit_word').val();
    const $file = $('#file')[0].files;
    const $text_word = $('#text_word').val();

    if(!$tit_word) {
        modalAlert('제목을 입력해주세요.',function(){});

    }else if(!$text_word) {
        modalAlert('내용을 입력해주세요.',function(){});

    }else {
        modalConfirm('수정하시겠습니까?', '취소', '수정', function() {
            // TODO : 공지사항 수정

            /*commonAjax(
                'GET',
                '/users?pageNo='+PAGE_NO+'&pageSize='+PAGE_SIZE,
                false,
                false,
                {},
                function(response) {
                    console.log('response',response);
                    result = response.data;
                },
                function(error) {
                    console.log('error',error);
                });*/

            let formData = new FormData();

            formData.append('category', $category);
            formData.append('important', $important);
            formData.append('tit_word', $tit_word);
            formData.append('text_word', $text_word);
            if($file.length > 0) {
                formData.append('file', $file[0]);
            }

            for (let key of formData.keys()) {
                console.log(key, ":", formData.get(key));
            }

            modalAlert('수정되었습니다.',function() {
                location.href='main.html?menu=adm_notice_list';
            });
        })
    }
}