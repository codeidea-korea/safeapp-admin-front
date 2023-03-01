let PK = 0;
const oEditors = [];

$(function() {
    /* 네이버 에디터 S */
    const sLang = "ko_KR"; // 언어 (ko_KR/ en_US/ ja_JP/ zh_CN/ zh_TW), default = ko_KR

    // 추가 글꼴 목록
    //const aAdditionalFontSet = [["MS UI Gothic", "MS UI Gothic"], ["Comic Sans MS", "Comic Sans MS"],["TEST","TEST"]];

    nhn.husky.EZCreator.createInIFrame({
        oAppRef: oEditors,
        elPlaceHolder: "ir1",
        sSkinURI: "./se2/SmartEditor2Skin.html",
        htParams: {
            bUseToolbar: true, // 툴바 사용 여부 (true:사용/ false:사용하지 않음)
            bUseVerticalResizer: true, // 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
            bUseModeChanger: true, // 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
            //bSkipXssFilter : true,		// client-side xss filter 무시 여부 (true:사용하지 않음 / 그외:사용)
            //aAdditionalFontList : aAdditionalFontSet,		// 추가 글꼴 목록
            fOnBeforeUnload: function () {
                //alert("완료!");
            },
            I18N_LOCALE: sLang
        }, //boolean
        fOnAppLoad: function () {
            //예제 코드
            //oEditors.getById["ir1"].exec("PASTE_HTML", ["로딩이 완료된 후에 본문에 삽입되는 text입니다."]);
        },
        fCreator: "createSEditor2"
    });

    function pasteHTML() {
        const sHTML = "<span style='color:#FF0000;'>이미지도 같은 방식으로 삽입합니다.<\/span>";
        oEditors.getById["ir1"].exec("PASTE_HTML", [sHTML]);
    }

    function showHTML() {
        const sHTML = oEditors.getById["ir1"].getIR();
        alert(sHTML);
    }

    function submitContents(elClickedObj) {
        oEditors.getById["ir1"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터의 내용이 textarea에 적용됩니다.

        // 에디터의 내용에 대한 값 검증은 이곳에서 document.getElementById("ir1").value를 이용해서 처리하면 됩니다.

        try {
            elClickedObj.form.submit();
        } catch (e) {}
    }

    function setDefaultFont() {
        const sDefaultFont = '궁서';
        const nFontSize = 24;
        oEditors.getById["ir1"].setDefaultFont(sDefaultFont, nFontSize);
    }

    init();
});

// 최초 실행 함수
function init() {
    setInfo();
}

// 정책관리 상세 정보 뿌려주기
function setInfo() {
    const data = getInfo();

    $('#title').text(data.title);
    $('#ir1').html(data.contents);
}

// 정책관리 상세 정보 가져오기
function getInfo() {
    PK = new URL(window.location.href).searchParams.get('pk');
    let result = {};

    commonAjax(
        'GET',
        '/policy/find/'+PK,
        false,
        false,
        {},
        function(response) {
            result = response.data;
        },
        function(response) {

        });

    return result;
}

// 목록
function goList() {
    location.href='main.html?menu=adm_policy_list';
}

// 수정
function update() {
    oEditors.getById["ir1"].exec("UPDATE_CONTENTS_FIELD", []);
    const $contents = $('#ir1').val();

    if(!$contents) {
        modalAlert('내용을 입력해주세요.');

    }else {
        modalConfirm('수정하시겠습니까?', '취소', '수정', function() {
            commonAjax(
                'PUT',
                '/policy/edit/'+PK,
                true,
                false,
                {
                    "admin_id": getUserInfo().id,
                    "contents": $contents
                },
                function(response) {
                    modalAlert('수정되었습니다.',function() {
                        location.href='main.html?menu=adm_policy_detail&pk='+PK;
                    });
                },
                function(error) {

                });
        });
    }
}