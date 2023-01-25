<?php
define('_INDEX_', true);
include_once('header.php');
?>
    <script type="text/javascript" src="./se2/js/service/HuskyEZCreator.js" charset="utf-8"></script>
    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_notice_adj">
      <!-- 컨텐츠 공통 헤드 s-->
      <div class="com_head">
        <div class="breadcrumb">
          <a class="fc_gy fs-lg">컨텐츠 관리</a>
        </div>
        <ul class="tab_btn mt30">
          <li><a href="#">공지사항</a></li>
          <li class="on"><a href="#">정책관리</a></li>
        </ul>
      </div>
      <!-- 컨텐츠 공통 헤드 e -->


      <!-- 컨텐츠 내용 s-->
      <div class="cont mb30">
        <div class="box">
          <div class="box-header well" data-original-title="">
            <h2 class="fs-xlg">정책관리</h2>
          </div>
          <div class="box-content">
            <div class="form_table form_table2">
                <table>
                  <tbody>
                    <tr>
                      <td class="bg">정책</td>
                      <td>
                        <input type="text" name="" id="" value="이용약관">
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <form action="sample/viewer/index.php" method="post">
                          <textarea name="ir1" id="ir1" rows="10" cols="100"
                            style="width:100%; height:412px; display:none;"></textarea>
                        </form>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>


              <div class="tac mt30">
                <span class="form_btn btn btn_g mr5" onclick="location.href='adm_policy_list.php'">목록</span>
                <span class="form_btn btn btn_m" onclick="location.href='adm_policy_detail.php'">등록</span>
              </div>
            </div>
        </div>
      </div>
      <!-- 컨텐츠 내용 e-->
    </div>
    <!-- CONTENTS e -->

<script>
/* 네이버 에디터 S */

var oEditors = [];

var sLang = "ko_KR"; // 언어 (ko_KR/ en_US/ ja_JP/ zh_CN/ zh_TW), default = ko_KR

// 추가 글꼴 목록
//var aAdditionalFontSet = [["MS UI Gothic", "MS UI Gothic"], ["Comic Sans MS", "Comic Sans MS"],["TEST","TEST"]];

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
  var sHTML = "<span style='color:#FF0000;'>이미지도 같은 방식으로 삽입합니다.<\/span>";
  oEditors.getById["ir1"].exec("PASTE_HTML", [sHTML]);
}

function showHTML() {
  var sHTML = oEditors.getById["ir1"].getIR();
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
  var sDefaultFont = '궁서';
  var nFontSize = 24;
  oEditors.getById["ir1"].setDefaultFont(sDefaultFont, nFontSize);
}

/* 네이버 에디터 E */
</script>

<?php include_once('footer.php'); ?>