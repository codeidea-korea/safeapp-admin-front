<?php
define('_INDEX_', true);
include_once('header.php');
?>

    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_notice_detail">
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
                    <td colspan="3">이용약관</td>
                  </tr>
                  <tr>
                    <td class="bg">작성자</td>
                    <td>관리자1</td>
                    <td class="bg">등록일</td>
                    <td>2022-10-11 16:48</td>
                  </tr>
                  <tr>
                    <td colspan="4" class="board_view_con">
                      saffy(www.0000.com)를 운영하는 주식회사 메타세이프(이하 "당사")는 "정보통신망 이용촉진 및 정보보호 등에 관한 법률"에 따라서 해당 법률을 준수하고 있습니다.
                      “당사”는 개인정보보호법에 따라 "사용자"의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 "사용자"의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고
                      있습니다.
                      이후 개인정보처리방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.
                       
                      제1조. 개인정보의 처리 목적
                      당사는 개인정보를 안전하게 보호하고, 권익에 침해되지 않도록 보관해야 한다는 방침에 따라 최선을 다해 노력하고 있습니다. 개인정보는 회원가입, 원활한 고객상담, 유료서비스 등
                      제공을 위해 활용되며, 개인정보처리방침을 통해 당사가 어떤 정보를 수집하고, 수집한 정보를 어떻게 사용하며, 필요에 따라 누구와 이를 공유(‘위탁 또는 제공’)하며 이용목적을
                      달성한 정보를 언제, 어떻게 파기하는지 등 ‘개인정보보호’와 관련한 정보를 투명하게 제공하는 것을 목적으로 두고 있습니다. 향후, 서비스 약관 변경 및 개인 정보 추가 수집 등
                      관련된 개인정보처리방침이 개정될 시에는 웹 사이트 공지사항 또는 메일을 통한 개별 안내를 통하여 개정된 내용을 알기 쉽게 공지할 것입니다.
                       
                      제2조. 개인정보의 수집항목 및 수집방법
                      당사는 회원가입 또는 서비스 제공을 위해 회원의 개인정보를 수집하고 있으며, 수집하는 개인정보 항목에 따른 구체적인 수집항목 및 방법은 다음과 같습니다.
                       
                      1. 수집하는 개인정보의 항목
                      a. 당사는 최초 회원 가입시 아래와 같은 최소한의 개인정보를 필수항목으로 수집하고 있습니다.
                      필수항목 : 이메일 주소, 이름,  ID , 비밀번호, 전화번호
                      선택항목 : 프로필 사진, 유형(개인/팀), 현장 정보(현장명, 현장 기간, 그룹 등),  필드값 등
                      b. 서비스 이용 과정이나 고객상담 과정에서 아래와 같은 정보들이 추가로 수집될 수 있습니다.
                      거래정보 : 개인의 경우 생년월일(정기결제에 한함), 신용카드정보(신용카드번호, 유효기간, 비밀번호 앞 두 자리), 계좌정보(은행정보, 계좌번호) 등
                      서비스 이용 정보 : 문의자 정보 (이름, 이메일 주소, 전화번호), 전화번호, IP 주소, 쿠키, 방문 일시, log기록, 서비스 이용 기록, 불량 이용 기록, 브라우저
                      정보, 운영체제 정보(OS), 사용 기기 정보, MAC 주소, 방문 일시 등
                      2, 개인정보 수집방법
                      a. 당사는 다음과 같은 방법으로 개인정보를 수집합니다.
                      홈페이지, 서면양식, 전화, 이메일, 이벤트 툴, 상담 툴
                       
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="tac mt30">
              <span class="form_btn btn btn_g mr5" onclick="location.href='adm_policy_list.php'">목록</span>
              <span class="form_btn btn btn_m" onclick="location.href='adm_policy_adj.php'">수정</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 컨텐츠 내용 e-->
    </div>

    <!-- CONTENTS e -->

<?php include_once('footer.php'); ?>