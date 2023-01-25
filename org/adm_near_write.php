<?php
define('_INDEX_', true);
include_once('header.php');
?>
    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_notice_detail">
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

            <div class="form_table form_table2">
              <table>
                  <tbody>
                    <tr>
                      <td class="bg">제목</td>
                      <td>
                        <input type="text" name="near_tit" id="near_tit" placeholder="제목을 입력해주세요.">
                    </td>
                    </tr>
                    <tr>
                      <td class="bg">태그</td>
                      <td>
                        <input type="text" id="tag" placeholder="태그입력" />
                          <ul id="tag-list"></ul>
                          <p class="fs-sm mt5">최대 10개 추가 가능합니다.</p>
                      </td>
                    </tr>
                    <tr>
                        <td class="bg">작업내용</td>
                        <td>
                            <input type="text" name="near_tit" id="near_tit" placeholder="작업내용을 입력해주세요.">
                        </td>
                      </tr>
                      <tr>
                        <td class="bg">작업자</td>
                        <td>
                            <input type="text" name="near_tit" id="near_tit" placeholder="작업자를 입력해주세요.">
                        </td>
                      </tr>
                      <tr>
                        <td class="bg">발생유형</td>
                        <td>
                            <input type="text" name="near_tit" id="near_tit" placeholder="발생유형을 입력해주세요.">
                        </td>
                      </tr>
                      <tr>
                        <td class="bg">발생장소</td>
                        <td>
                            <input type="text" name="near_tit" id="near_tit" placeholder="발생장소를 입력해주세요.">
                        </td>
                      </tr>
                      <tr>
                        <td class="bg">발생개요 및 예상피해</td>
                        <td>
                            <textarea id="acc_cont" name="acc_cont" placeholder="발생개요 및 예상피해를 입력해주세요."></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td class="bg">발생원인</td>
                        <td>
                            <input type="text" name="near_tit" id="near_tit" placeholder="발생원인을 입력해주세요.">
                        </td>
                      </tr>
                      <tr>
                        <td class="bg">관리대책</td>
                        <td>
                            <textarea id="acc_cont" name="acc_cont" placeholder="재발방지대책을 입력해주세요."></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td class="bg">이미지 첨부</td>
                        <td class="img_upload">
                            <div class="file-label mr10 mb10" onclick="fileUploadAction();">
                              <img src="./resources/img/icon/image-plus.png" alt="이미지 추가">
                              <p class="fc_w">이미지 추가</p>
                            </div>
                            <input type="file" id='btnAtt' multiple/>
                            <p class="file-info fs_sm">
                              - 업로드 가능한 사이즈 : 최대 375 X 180<br>
                              - 업로드 가능 확장자 : jpg, jpeg, png, bmp<br>
                              - 업로드 가능 용량 : 10mb 미만
                            </p>
                            <div id="att_zone" class="mt30"></div>
                          </td>
                      </tr>
                  </tbody>
                </table>
              </div>

              <div class="tac mt30">
                <span class="form_btn btn btn_m" onclick="location.href='adm_near_list.php'">등록</span>
              </div>
          </div>
        </div>
      </div>
      <!-- 컨텐츠 내용 e-->
    </div>
    <!-- CONTENTS e -->

<?php include_once('footer.php'); ?>