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
          <li><a href="adm_case_list.php">사고사례</a></li>
          <li class="on"><a href="adm_near_list.php">아차사고</a></li>
        </ul>
      </section>
      <!-- 컨텐츠 공통 헤드 e -->


      <!-- 컨텐츠 내용 s-->
      <div class="cont mb30">
        <div class="box">
          <div class="box-header well" data-original-title="">
            <h2 class="fs-xlg">아차사고</h2>
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
                    <p class="fs-lg fwb mb20">발생내용 및 관리대책</p>
                    <div class="form_table form_table2">
                      <table>
                        <tbody>
                          <tr>
                            <td class="bg">작업내용</td>
                            <td>자재인양</td>
                          </tr>
                          <tr>
                            <td class="bg">작업자</td>
                            <td>형틀팀 신호수</td>
                          </tr>
                          <tr>
                            <td class="bg">발생유형</td>
                            <td>낙하/비례</td>
                          </tr>
                          <tr>
                            <td class="bg">발생장소</td>
                            <td>자재야적장</td>
                          </tr>
                          <tr>
                            <td class="bg">발생개요 및 예상피해</td>
                            <td>W400이하 거푸집 자재 인양 중 슬링벨트 인양시 상부 및 내측으로의 과압력 작용</td>
                          </tr>
                          <tr>
                            <td class="bg">발생원인</td>
                            <td>작업발판 이음고리 손상, 작업 전 자재의 파손유무 등 사전안전점검 미흡</td>
                          </tr>
                          <tr>
                            <td class="bg">관리대책</td>
                            <td>
                              1. 가설자재 입고 시 외관상태의 손상 유무 점검<br>
                              2. 상하 동시 작업 금지 또는 긴밀한 연락체계 구축
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
              <span class="form_btn btn btn_g mr5" onclick="location.href='adm_near_list.php'">목록</span>
              <span class="form_btn btn btn_m mr5" onclick="location.href='adm_near_adj.php'">수정</span>
              <div class="form_btn btn btn_b layer_btn">
                <a href="#none" class="declaration">신고하기</a>
              </div>
            </div>
            <!-- 신고하기 layerpop -->
            <div class="layerpop" id="declaration">
              <div class="cont_wrap">
                <div class="tit_box">
                  <p class="tit">신고하기</p>
                </div>
                <div class="layer_cont">
                  <table class="view_table mat0 borTn">
                    <caption>제목, 작성일, 조회수, 내용, 항목으로 구성된 표입니다.</caption>
                    <tbody>
                      <tr>
                        <td class="title_box tac">
                          <p class="title">통영시 가오치항 어촌 뉴딜 300사업 4건축공사 2층 옹벽 거푸집 해체 중 작업자 1인 인명사고</p>
                          <p class="mat5">홍길동 | 등록일 : 2022-02-03 | 열람횟수 : 123,456회</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <ul>
                            <li>신고사유</li>
                            <li style="position:relative">
                              <textarea id="text_word" name="text_word" class="autosize" onkeydown="resize(this)"
                                onkeyup="resize(this)"></textarea>
                              <div id="text_cnt">(0 / 500)</div>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="pop_btn mt10">
                    <button type="button" class="close btn form_btn btn_g mr5">취소</button>
                    <button type="button" class="form_btn btn btn_m" onclick="javascript:openModal('confirm');">신고하기</button>
                  </div>
                </div>
              </div>
            </div>
            <!-- 수정확인 layerpop -->
            <div class="layerpop pop2" id="confirm">
              <div class="cont_wrap">
                <div class="layer_cont cf_cont">
                  <div class="tac">
                    <div class="fs-lg">등록하신 의견은 '수정'이 불가합니다.<br>신고를 완료 하시겠습니까?</div>
                  </div>
                  <div class="pop_btn">
                    <button type="button" class="close2 form_btn btn btn_g mr5">취소</button>
                    <button type="button" class="form_btn btn_m">확인</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 컨텐츠 내용 e-->
    </div>
    <!-- CONTENTS e -->

<?php include_once('footer.php'); ?>