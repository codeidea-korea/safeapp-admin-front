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

    if(data.tags.includes('|')) {
        tags = data.tags.split('|');

    }else {
        if(data.tags) {
            tags.push(data.tags);
        }
    }

    tags.forEach(function(data) {
        makeTagBox($("#tag-list"),data);
    });

    $('#name').val(data.name);
    $('#datepicker1').val(data.accident_at.substring(0,10));
    $('#time_hh').val(data.accident_at.substring(11,13));
    $('#time_mm').val(data.accident_at.substring(14,16));
    $('#detail').val(data.accident_reason);
    $('#reason').val(data.accident_cause);
    $('#reason_detail').val(data.cause_detail);
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

// 등록된 이미지 - div 만들기
function makeImgDiv (src,pk) {
    let div_style = 'position: relative;display: inline-flex;justify-content: center;align-items: center;width: 33%;aspect-ratio: 16 / 9; border:1px solid #ddd;margin-right: 10px;padding:10px';
    let img_style = 'max-height:100%';
    let chk_style = 'width: 20px;height: 20px;position: absolute;font-size: 12px;right: 5px;top: 5px;z-index: 999;border: 1px solid #999;border-radius: 50px;background-color: rgba(255,255,255,0.1);color: #999;cursor:pointer';

    let img = document.createElement('img');
    img.setAttribute('style', img_style);
    img.src = USER_SERVER_URL+src;

    let div = document.createElement('div');
    div.setAttribute('style', div_style);

    let btn = document.createElement('input');
    btn.setAttribute('type', 'button');
    btn.setAttribute('value', 'x');
    btn.setAttribute('style', chk_style);
    btn.setAttribute('onclick', "deleteOrgImg("+pk+",this)");

    div.appendChild(img);
    div.appendChild(btn);
    return div;
}

// 등록된 이미지 - x버튼 클릭
function deleteOrgImg(pk,elem) {
    DELETE_FILE_SEQ_ARR.push(pk);
    $(elem).parent().remove();
}

// 목록으로
function goList() {
    location.href='/main.html?menu=adm_case_list';
}

// 저장
function update() {
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

    }else {
        modalConfirm('수정하시겠습니까?','취소','수정',function() {
            new Promise( (succ, fail)=>{
                // 사고사례 수정
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
                    'PUT',
                    '/board/accExp/edit/'+PK,
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
                            '/board/accExp/add/'+arg.id+'/files',
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
                                '/board/accExp/file/remove/'+pk,
                                false,
                                false,
                                {},
                                function(response) {
                                    cnt++;

                                    if(cnt === DELETE_FILE_SEQ_ARR.length) {
                                        modalAlert('수정되었습니다.',function() {
                                            location.href='/main.html?menu=adm_case_detail&pk='+PK;
                                        });
                                    }
                                },
                                function(error) {

                                });
                        });
                    }else {
                        modalAlert('수정되었습니다.',function() {
                            location.href='/main.html?menu=adm_case_detail&pk='+PK;
                        });
                    }
                });
            });
        });
    }
}