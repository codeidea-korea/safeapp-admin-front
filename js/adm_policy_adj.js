let PK = 0;

$(function() {
    /* 네이버 에디터 S */
    const oEditors = [];
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

    // TODO : 데이터 바인딩

    $('#title').text('이용약관');
    $('#ir1').html(`saffy(www.0000.com)를 운영하는 주식회사 메타세이프(이하 "당사")는 "정보통신망 이용촉진 및 정보보호 등에 관한 법률"에 따라서 해당 법률을 준수하고 있습니다.
                                “당사”는 개인정보보호법에 따라 "사용자"의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 "사용자"의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고
                                있습니다.
                                이후 개인정보처리방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.
                                <br/>
                                제1조. 개인정보의 처리 목적
                                당사는 개인정보를 안전하게 보호하고, 권익에 침해되지 않도록 보관해야 한다는 방침에 따라 최선을 다해 노력하고 있습니다. 개인정보는 회원가입, 원활한 고객상담, 유료서비스 등
                                제공을 위해 활용되며, 개인정보처리방침을 통해 당사가 어떤 정보를 수집하고, 수집한 정보를 어떻게 사용하며, 필요에 따라 누구와 이를 공유(‘위탁 또는 제공’)하며 이용목적을
                                달성한 정보를 언제, 어떻게 파기하는지 등 ‘개인정보보호’와 관련한 정보를 투명하게 제공하는 것을 목적으로 두고 있습니다. 향후, 서비스 약관 변경 및 개인 정보 추가 수집 등
                                관련된 개인정보처리방침이 개정될 시에는 웹 사이트 공지사항 또는 메일을 통한 개별 안내를 통하여 개정된 내용을 알기 쉽게 공지할 것입니다.
                                <br/>
                                제2조. 개인정보의 수집항목 및 수집방법
                                당사는 회원가입 또는 서비스 제공을 위해 회원의 개인정보를 수집하고 있으며, 수집하는 개인정보 항목에 따른 구체적인 수집항목 및 방법은 다음과 같습니다.
                                <br/>
                                1. 수집하는 개인정보의 항목
                                a. 당사는 최초 회원 가입시 아래와 같은 최소한의 개인정보를 필수항목으로 수집하고 있습니다.
                                필수항목 : 이메일 주소, 이름, ID , 비밀번호, 전화번호
                                선택항목 : 프로필 사진, 유형(개인/팀), 현장 정보(현장명, 현장 기간, 그룹 등), 필드값 등
                                b. 서비스 이용 과정이나 고객상담 과정에서 아래와 같은 정보들이 추가로 수집될 수 있습니다.
                                거래정보 : 개인의 경우 생년월일(정기결제에 한함), 신용카드정보(신용카드번호, 유효기간, 비밀번호 앞 두 자리), 계좌정보(은행정보, 계좌번호) 등
                                서비스 이용 정보 : 문의자 정보 (이름, 이메일 주소, 전화번호), 전화번호, IP 주소, 쿠키, 방문 일시, log기록, 서비스 이용 기록, 불량 이용 기록, 브라우저
                                정보, 운영체제 정보(OS), 사용 기기 정보, MAC 주소, 방문 일시 등
                                2, 개인정보 수집방법
                                a. 당사는 다음과 같은 방법으로 개인정보를 수집합니다.
                                홈페이지, 서면양식, 전화, 이메일, 이벤트 툴, 상담 툴`);
}

// 정책관리 상세 정보 가져오기
function getInfo() {
    PK = new URL(window.location.href).searchParams.get('pk');
    let result = {};

    // TODO : 정책관리 상세정보 가져오기

    return result;
}

// 목록
function goList() {
    location.href='main.html?menu=adm_policy_list';
}

// 수정
function update() {
    const $title = $('#title').val();
    const $contents = $('#ir1').val();

    if(!$title) {
        modalAlert('정책을 입력해주세요.');

    }else if(!$contents) {
        modalAlert('내용을 입력해주세요.');

    }else {
        modalConfirm('수정하시겠습니까?', '취소', '수정', function() {
            // TODO : 정책 수정 로직

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

            let submitData = {};
            submitData['pk'] = PK;
            submitData['title'] = $title;
            submitData['contents'] = $contents;

            console.log(submitData);

            modalAlert('수정되었습니다.',function() {
                goList();
            });
        });
    }
}