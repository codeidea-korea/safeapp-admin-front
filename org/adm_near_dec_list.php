<?php
define('_INDEX_', true);
include_once('header.php');
?>
    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_near_list">
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
            <h2 class="fs-xlg">아차사고 관리</h2>
          </div>
          <div class="box-content">
            <div class="statis_box wrap">
              <div class="tab_menu">
                <ul class="list">
                  <li><a href="adm_near_list.php" class="statis_btn">아차사고 목록</a></li>
                  <li class="is_on"><a href="adm_near_dec_list.php" class="statis_btn">신고 목록</a></li>
                </ul>
              </div>

              <!-- search form s -->
              <div class="form pat60">
                <form name="std_form" class="breadcrumb_form mb10" method="POST">
                  <input type="text" class="mr5 th_40" name="searcher" autocomplete="off"
                    placeholder="안전관련 키워드를 입력해주세요 예)거푸집">
                  <button onclick="javascript:goSearch();" class="btn input_btn btn_g">검색</button>
                </form>
              </div>
              <!-- search form e -->
              <div class="board_area">
                <select name="search_type" class="mb10 board_select">
                  <option value="new">최신순</option>
                  <option value="like">좋아요순</option>
                  <option value="view">조회순</option>
                </select>
                <!-- 리스트 수 : 5줄 -->
                <div class="board_list_wrap">
                  <ul class="board">
                    <li class="th_5 tac">
                      <input type="checkbox" name="board_list-check" id="board_list-check">
                    </li>
                    <li class="th_55">
                      <table class="board_list">
                        <caption>번호, 구분, 제목, 첨부파일, 작성일, 조회 내용이 담겨있는 표</caption>
                        <colgroup>
                          <col style="width: auto;">
                          <col style="width: 10%;">
                          <col style="width: 10%;">
                        </colgroup>
                        <thead>
                          <tr>
                            <th scope="col">제목</th>
                            <th scope="col">작성자/작성일/열람횟수/좋아요수</th>
                            <th scope="col">내용</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="tit">
                              <a href="javascript:void(0);">
                                <span class="text fs-lg fwb">통영시 가오치항 어촌뉴딜300사업 건축공사 2층 옹벽 거푸집 해체 중 작업자 1인
                                  인명사고</span>
                              </a>
                            </td>
                            <td class="write">
                              <ul>
                                <li>메타세이프</li>
                                <li>등록일 : 2022-02-03</li>
                                <li>열람횟수 : 123,456회</li>
                                <li>좋아요 수 : 120회</li>
                              </ul>
                            </td>
                            <td class="board_cont">
                              - 작업장소 타 공종 간섭여부, 지반상태<br>
                              - 동바리 부재 구조검토서와 동일한 부재 반입여부<br>
                              - 동바리 부재 손상, 변형된 부재확인 및 제거상태<br>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </li>
                    <li class="th_20">
                      <div class="preview_img">
                        <img src="" alt="" class="preview">
                      </div>
                    </li>
                    <li class="th_10 tac">
                      <div class="btn form_btn btn_m" onclick="location.href='adm_near_detail.php'">상세보기</div>
                      <div class="btn form_btn layer_btn btn_b mt10">
                        <a href="#none" class="reason">신고사유</a>
                      </div>
                    </li>
                  </ul>
                </div>
                
              </div>

              <!-- pagination -->
              <div class="pagination pagination-centered">
                <ul>
                  <li><a href="javascript:void(0)" class="p-prev">맨처음</a></li>
                  <li><a href="javascript:void(0)" class="prev">이전</a></li>
                  <li class="active"><a href="javascript:goPage(1)">1</a></li>
                  <li><a href="javascript:goPage(2)">2</a></li>
                  <li><a href="javascript:void(0)" class="next ">다음</a></li>
                  <li><a href="javascript:void(0)" class="n-next">마지막</a></li>
                </ul>
              </div>
              <div class="tar mt10">
                <span class="form_btn btn btn_g mr5" onclick="javascript:openModal('cancel');">삭제</span>
              </div>
                                
              <!-- 삭제확인 layerpop -->
              <div class="layerpop pop2" id="cancel">
                <div class="cont_wrap">
                  <div class="layer_cont cf_cont">
                    <div class="tac">
                      <div class="fs-lg">삭제하시겠습니까?</div>
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

          <!-- 신고사유 layerpop -->
          <div class="layerpop" id="reason">
            <div class="cont_wrap">
              <div class="tit_box">
                <p class="tit">신고사유</p>
              </div>
              <div class="layer_cont">
                <div class="reason_tit fs-lg fwb">통영시 가오치항 어촌뉴딜 300사업 건축공사 2층 옹벽 거푸집 해체 중 작업자 1인 인명사고</div>
                <div class="reason_cont mt20">
                  <ul>
                    <li>
                      <ul class="write">
                        <li>홍길동</li>
                        <li>신고일 : 2022-02-03</li>
                      </ul>
                    </li>
                    <li>
                      신고사유가 오는 자리입니다.<br>
                      신고사유가 오는 자리입니다.<br>
                      신고사유가 오는 자리입니다.<br>
                      신고사유가 오는 자리입니다.
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <ul class="write">
                        <li>홍길동</li>
                        <li>신고일 : 2022-02-03</li>
                      </ul>
                    </li>
                    <li>
                      신고사유가 오는 자리입니다.<br>
                      신고사유가 오는 자리입니다.<br>
                      신고사유가 오는 자리입니다.<br>
                      신고사유가 오는 자리입니다.
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <ul class="write">
                        <li>홍길동</li>
                        <li>신고일 : 2022-02-03</li>
                      </ul>
                    </li>
                    <li>
                      신고사유가 오는 자리입니다.<br>
                      신고사유가 오는 자리입니다.<br>
                      신고사유가 오는 자리입니다.<br>
                      신고사유가 오는 자리입니다.
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <ul class="write">
                        <li>홍길동</li>
                        <li>신고일 : 2022-02-03</li>
                      </ul>
                    </li>
                    <li>
                      신고사유가 오는 자리입니다.<br>
                      신고사유가 오는 자리입니다.<br>
                      신고사유가 오는 자리입니다.<br>
                      신고사유가 오는 자리입니다.
                    </li>
                  </ul>
                </div>
                <div class="pop_btn mt10">
                  <button type="button" class="close form_btn btn btn_m">확인</button>
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