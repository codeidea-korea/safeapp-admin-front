<?php
define('_INDEX_', true);
include_once('header.php');
?>

    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_inquiry_write">
      <!-- 컨텐츠 공통 헤드 s-->
      <section class="com_head">
        <div class="breadcrumb">
          <a class="fc_gy fs-lg">리스트 관리</a>
        </div>
        <ul class="tab_btn mt30">
          <li><a href="adm_check_list.php">체크리스트</a></li>
          <li><a href="adm_risk_list.php">위험성 평가표</a></li>
          <li class="on"><a href="adm_case_list.php">사고사례</a></li>
          <li><a href="adm_near_list.php">아차사고</a></li>
        </ul>
      </section>
      <!-- 컨텐츠 공통 헤드 e -->


      <!-- 컨텐츠 내용 s-->
      <div class="cont mb30">
        <div class="box">
          <div class="box-header well" data-original-title="">
            <h2 class="fs-xlg">사고사례</h2>
          </div>
          <div class="box-content">

            <link rel="stylesheet" href="./resources/css/view_table.css">
            
            <table class="view_table mat0 borTn">
              <caption>제목, 작성일, 조회수, 내용, 항목으로 구성된 표입니다.</caption>
              <tbody>
                <tr>
                  <td class="title_box tac">
                    <p class="title">통영시 가오치항 어촌 뉴딜 300사업 4건축공사 2층 옹벽 거푸집 해체 중 작업자 1인 인명사고</p>
                    <p class="siz14 mat5">홍길동 | 등록일 : 2022-02-03 | 열람횟수 : 123,456회</p>
                    <ul class="view_tag mt20">
                      <li>#거푸집</li>
                      <li>#자재반입 하역</li>
                      <li>#동바리 설치</li>
                      <li>#작업전 점검 체크리스트</li>
                      <li>#거푸집 동바리</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p class="fs-lg fwb mb20">사고내용 및 재발방비대책</p>
                    <div class="form_table form_table2">
                      <table>
                        <tbody>
                          <tr>
                            <td class="bg">사고명</td>
                            <td>통영시 가오치항 어촌뉴딜 300사업 건축공사 2층 옹벽 거푸집 해체 중 작업자 1인 인명사고</td>
                          </tr>
                          <tr>
                            <td class="bg">사고발생일시</td>
                            <td>2021-13-13 오전 08:30</td>
                          </tr>
                          <tr>
                            <td class="bg">사고경위</td>
                            <td>21년 12월 13일 가오치항 다목적센터 건축물 2층 옹벽 거푸집 탈형 중 협소한 공간으로 거푸집 탈형 시 옹벽에 설치된 유로폼이 넘어지면서 작업자의 가슴을 가격함. 사고 당일 작업자는 가슴에 통증은 있으나 작업에 불편함이 없어 하루 일과를 완료함. 이일(12월 15일) 오전 출근을 하지 않아 수소문한결과 가슴에 통증이 지속되어 병원진료 후 늑골에 실금이 갔다는 진단을 받아 당분간 출근이 불가한 상태임을 통보받음.</td>
                          </tr>
                          <tr>
                            <td class="bg">사고원인</td>
                            <td>기타</td>
                          </tr>
                          <tr>
                            <td class="bg">구체적 사고원인</td>
                            <td>협소한 공간에서 거푸집 탈형시 옹벽에 설치된 유로품이 탈락되면서 작업자 방향으로 넘어짐.
                              이때 협한 공간으로 작업자가 피하는 것이 불가하여 가슴을 타격함.
                              당일 통증은 없었으나, 이후 사망</td>
                          </tr>
                          <tr>
                            <td class="bg">재발방지대책</td>
                            <td>
                              1) 작업전 안전교육으로 안전 의식고취<br>
                              2) 작업시 위험구간 사전설명<br>
                              3) 작업자 작업상태 및 안전수칙 준수확인<br>
                              4) 작업자 이동통로 확보
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p class="fs-lg fwb mb20">참고사진</p>
                    <div class="img_box_wrap">
                      <div class="img_box"></div>
                      <div class="img_box"></div>
                    </div>
                  </td>
                </tr>



              </tbody>
            </table>

            <div class="tac mt30">
              <span class="form_btn btn btn_g mr5" onclick="location.href='adm_case_list.php'">목록</span>
              <span class="form_btn btn btn_m" onclick="location.href='adm_case_adj.php'">수정</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 컨텐츠 내용 e-->
    </div>
    <!-- CONTENTS e -->

<?php include_once('footer.php'); ?>