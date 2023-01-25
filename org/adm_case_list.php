<?php
define('_INDEX_', true);
include_once('header.php');
?>
    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_case_list">
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
              <h2 class="fs-xlg">사고사례 목록</h2>
            </div>
            <div class="box-content">
              <!-- search form s -->
              <div class="form">
                <form name="std_form" class="breadcrumb_form mb10" method="POST">
                  <input type="text" class="mr5 th_40" name="searcher" autocomplete="off" placeholder="안전관련 키워드를 입력해주세요 예)거푸집">
                  <button onclick="javascript:goSearch();" class="btn input_btn btn_g">검색</button>
                </form>

                <form name="std_form" class="breadcrumb_form mb10" method="POST">
                  <span class="mr10">작성자</span>
                  <select name="search_type" class=" mr5">
                    <option value="name">이름</option>
                    <option value="phone">휴대폰 번호</option>
                    <option value="admin">관리자</option>
                  </select>
                  <input type="text" class="mr20">
                  <span class="mr10">공개상태</span>
                  <select name="search_type" class="">
                    <option value="open">문서공개</option>
                    <option value="none_open">공개안함</option>
                  </select>
                </form>
                
                <form name="std_form" class="breadcrumb_form mb10" method="POST">
                  <span class="mr5">작성일</span>
                  <div class="rv_date mr5"><input type="text" id="datepicker1" autocomplete='off' /></div>
                  <div class="rv_date mr5"><input type="text" id="datepicker2" autocomplete='off' /></div>
                  <ul class="filter_list-shortcut mr5">
                    <li class="filter_shortcut mr5">
                      <button type="button">오늘</button>
                    </li>
                    <li class="filter_shortcut mr5">
                      <button type="button">1개월</button>
                    </li>
                    <li class="filter_shortcut mr5">
                      <button type="button">3개월</button>
                    </li>
                    <li class="filter_shortcut mr5">
                      <button type="button">6개월</button>
                    </li>
                    <li class="filter_shortcut">
                      <button type="button">전체</button>
                    </li>
                  </ul>
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
                                <span class="text fs-lg fwb">통영시 가오치항 어촌뉴딜300사업 건축공사 2층 옹벽 거푸집 해체 중 작업자 1인 인명사고</span>
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
                      <div class="btn form_btn btn_m" onclick="location.href='adm_case_detail.php'">상세보기</div>
                    </li>
                  </ul>
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
                                <span class="text fs-lg fwb">통영시 가오치항 어촌뉴딜300사업 건축공사 2층 옹벽 거푸집 해체 중 작업자 1인 인명사고</span>
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
                      <div class="btn form_btn btn_m" onclick="location.href='adm_case_detail.php'">상세보기</div>
                    </li>
                  </ul>
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
                                <span class="text fs-lg fwb">통영시 가오치항 어촌뉴딜300사업 건축공사 2층 옹벽 거푸집 해체 중 작업자 1인 인명사고</span>
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
                      <div class="btn form_btn btn_m" onclick="location.href='adm_case_detail.php'">상세보기</div>
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
                  <li><a href="javascript:void(0)">2</a></li>
                  <li><a href="javascript:void(0)" class="next ">다음</a></li>
                  <li><a href="javascript:void(0)" class="n-next">마지막</a></li>
                </ul>
              </div>
              <div class="tar mt10">
                <span class="form_btn btn btn_g mr5" onclick="javascript:openModal('cancel');">삭제</span>
                <span class="form_btn btn btn_m"  onclick="location.href='adm_case_write.php'">작성하기</span>
              </div>
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
      </div>
      <!-- 컨텐츠 내용 e-->
    </div>

    <!-- CONTENTS e -->

<?php include_once('footer.php'); ?>