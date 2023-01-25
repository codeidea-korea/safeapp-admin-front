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

            <div class="form_table form_table2">
              <table>
                <tbody>
                  <tr>
                    <td class="bg">제목</td>
                    <td>
                      <input type="text" name="near_tit" id="near_tit" value="사고사례 제목">
                    </td>
                  </tr>
                  <tr>
                    <td class="bg">태그</td>
                    <td>
                      <input type="text" id="tag" placeholder="태그입력" />
                      <ul id="tag-list">
                        <li class="tag-item">건축공사<span class="del-btn" idx="0">x</span></li>
                        <li class="tag-item">거푸집<span class="del-btn" idx="0">x</span></li>
                        <li class="tag-item">작업자<span class="del-btn" idx="0">x</span></li>
                      </ul>
                      <p class="fs-sm mt5">최대 10개 추가 가능합니다.</p>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg">사고명</td>
                    <td>
                      <input type="text" name="near_tit" id="near_tit" value="통영시 가오치항 어촌뉴딜...">
                    </td>
                  </tr>
                  <tr>
                    <td class="bg">사고발생일시</td>
                    <td class="df">
                      <div class="rv_date mr5"><input type="text" id="datepicker1" autocomplete='off' /></div>
                      <select name="search_type" class="th_20">
                        <option value="time">오전 08:30</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg">사고경위</td>
                    <td>
                      <textarea>21년 12월 13일 가오치항 다목적센터 건축물 2층 옹벽 거푸집 탈형 중 협소한 공간으로 거푸집 탈형 시 옹벽에 설치된 유로폼이 넘어지면서 작업자의 가슴을 가격함. 사고 당일 작업자는 가슴에 통증은 있으나 작업에 불편함이 없어 하루 일과를 완료함. 이일(12월 15일) 오전 출근을 하지 않아 수소문한결과 가슴에 통증이 지속되어 병원진료 후 늑골에 실금이 갔다는 진단을 받아 당분간 출근이 불가한 상태임을 통보받음.</textarea>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg">사고원인</td>
                    <td>
                      <input type="text" name="near_tit" id="near_tit" value="기타">
                    </td>
                  </tr>
                  <tr>
                    <td class="bg">구체적 사고원인</td>
                    <td>
                      <textarea>협소한 공간에서 거푸집 탈형시 옹벽에 설치된 유로품이 탈락되면서 작업자 방향으로 넘어짐.이때 협한 공간으로 작업자가 피하는 것이 불가하여 가슴을 타격함.당일 통증은 없었으나, 이후 사망</textarea>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg">재발방지대책</td>
                    <td>
                      <textarea>협소한 공간에서 거푸집 탈형시 옹벽에 설치된 유로품이 탈락되면서 작업자 방향으로 넘어짐.이때 협한 공간으로 작업자가 피하는 것이 불가하여 가슴을 타격함.당일 통증은 없었으나, 이후 사망</textarea>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg">이미지 첨부</td>
                    <td class="img_upload">
                      <div class="file-label mr10 mb10" onclick="fileUploadAction();">
                        <img src="./resources/img/icon/image-plus.png" alt="이미지 추가">
                        <p class="fc_w">이미지 추가</p>
                      </div>
                      <input type="file" id='btnAtt' multiple />
                      <p class="file-info fs_sm">
                        - 업로드 가능한 사이즈 : 최대 375 X 180<br>
                        - 업로드 가능 확장자 : jpg, jpeg, png, bmp<br>
                        - 업로드 가능 용량 : 10mb 미만
                      </p>
                      <div id="att_zone" class="mt30">
                        <div>
                          <img ∂src="">
                          <input type="button" value="x" delfile="">
                        </div>
                        <div>
                          <img src="">
                          <input type="button" value="x" delfile="">
                        </div>
                        <div>
                          <img src="">
                          <input type="button" value="x" delfile="">
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="tac mt30">
              <span class="form_btn btn btn_g mr5" onclick="location.href='adm_case_list.php'">취소</span>
              <span class="form_btn btn btn_m" onclick="location.href='adm_case_detail.php'">등록</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 컨텐츠 내용 e-->
    </div>
    <!-- CONTENTS e -->

<?php include_once('footer.php'); ?>