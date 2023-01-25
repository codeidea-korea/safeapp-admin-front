<?php
define('_INDEX_', true);
include_once('header.php');
?>

    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_check_contents">
      <!-- 컨텐츠 공통 헤드 s-->
      <section class="com_head">
        <div class="breadcrumb">
          <a class="fc_gy fs-lg">리스트 관리</a>
        </div>
        <ul class="tab_btn mt30">
          <li class="on"><a href="adm_check_list.php">체크리스트</a></li>
          <li><a href="adm_risk_list.php">위험성 평가표</a></li>
          <li><a href="adm_case_list.php">사고사례</a></li>
          <li><a href="adm_near_list.php">아차사고</a></li>
        </ul>
      </section>
      <!-- 컨텐츠 공통 헤드 e -->

      <!-- 컨텐츠 내용 s-->
      <section class="cont mb30">
        <article class="cont_box mt30">
          <div class="write_wrap">
            <div class="user_img"></div>
            <div class="write_info ml10">
              <p>유저1</p>
              <p class="fs-sm">등록일 : 2022-11-03</p>
            </div>
          </div>
          <div class="title mt20">
            <span class="fwb fs-xlg pa20">거푸집 동바리 설치 체크리스트
              <span class="like_ico ml10" onclick="setLike();"></span>
            </span>
          </div>
          <div class="mybutton">
            <button class="btn btn_w ml10"  onclick="location.href='adm_check_adj.php'">
              <img class="mr5" src="./resources/img/icon/edit.png" alt="템플릿 편집">템플릿 편집
            </button>
            <button class="btn layer_btn btn_w ml10" onclick="">
              <a href="#none" class="preview" style="color:#333;">
                <img class="mr5" src="./resources/img/icon/preview.png" alt="미리보기">미리보기
              </a>
            </button>
          </div>
          <div class="content-tag mt30">
            <div class="list-wrap">
              <div class="list">
                <img class="toggle_btn btn" src="./resources/img/icon/closeView_.png" alt="보기/감추기 버튼">
              </div>
              <div class="view watch">
                <div class="tag_wrap">
                  <div class="view_tit">태그</div>
                  <ul id="tag-list">
                    <li class="tag-item">건축공사</li>
                    <li class="tag-item">거푸집</li>
                    <li class="tag-item">작업자</li>
                  </ul>
                </div> 
                <div class="tag_wrap">
                  <div class="view_tit">사고사례</div>
                  <ul id="tag-list">
                    <li class="tag-item">사고사례1</li>
                    <li class="tag-item">사고사례2</li>
                  </ul>
                </div>

              </div>

            </div>
          </div>
        </article>

        <article class="cont_box check-work mt30">
          <div class="list-wrap group01">
            <!-- 체크리스트 제목 s -->
            <div class="list clear pa20">
              <div class="toggle_btn mr20"></div>
              <div class="tit">작업전</div>
            </div>
            <!-- 체크리스트 제목 e -->
            <!-- 체크리스트 s -->
            <div class="view mb20">
              <div class="list-wrap group02">
                <div class="list clear pa20">
                  <div class="toggle_btn mr20"></div>
                  <div class="tit">안전점검</div>
                </div>
                <!-- 체크리스트 내용 s -->
                <div class="view check-view">
                  <form class="check">
                    <div class="check_inner">
                      <!-- 체크리스트01 -->
                      <div data-question="1" class="check_step-1 check_step">
                        <h1 class="check_question">안전모 착용을 하였습니까?</h1>
                        <div class="answer_wrap">
                          <div class="answer">
                            <input class="answer_input" type="radio" id="yes1" name="q1" value="Yes">
                            <label class="answer_label" for="yes1">네</label>
                          </div>
                          <div class="answer">
                            <input class="answer_input" type="radio" id="no1" name="q1" value="No">
                            <label class="answer_label" for="no1">아니오</label>
                          </div>
                          <div class="answer">
                            <input class="answer_input" type="radio" id="na1" name="q1" value="NA">
                            <label class="answer_label" for="na1">해당없음</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <!-- 체크리스트 내용 e -->
              </div>
            </div>
            <!-- 체크리스트 e -->
          </div>
        </article>

        <article class="cont_box check-work mt30">
          <div class="list-wrap group01">
            <!-- 체크리스트 제목 s -->
            <div class="list clear pa20">
              <div class="toggle_btn mr20"></div>
              <div class="tit">작업중</div>
            </div>
            <!-- 체크리스트 제목 e -->
            <!-- 체크리스트 s -->
            <div class="view mb20">
              <div class="list-wrap group02">
                <div class="list clear pa20">
                  <div class="toggle_btn mr20"></div>
                  <div class="tit">지반상태</div>
                </div>
                <!-- 체크리스트 내용 s -->
                <div class="view check-view">
                  <form class="check">
                    <div class="check_inner">
                      <!-- 체크리스트01 -->
                      <div data-question="1" class="check_step-1 check_step">
                        <h1 class="check_question">수평재 구조검토결과에 따른 조립간격 준수</h1>
                        <div class="answer_wrap">
                          <div class="answer">
                            <input class="answer_input" type="radio" id="yes1" name="q1" value="Yes">
                            <label class="answer_label" for="yes1">네</label>
                          </div>
                          <div class="answer">
                            <input class="answer_input" type="radio" id="no1" name="q1" value="No">
                            <label class="answer_label" for="no1">아니오</label>
                          </div>
                          <div class="answer">
                            <input class="answer_input" type="radio" id="na1" name="q1" value="NA">
                            <label class="answer_label" for="na1">해당없음</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <!-- 체크리스트 내용 e -->
              </div>
            </div>
            <!-- 체크리스트 e -->
          </div>
        </article>

        <article class="cont_box news">
          <div class="txt_box">
            <div class="tit">통영시 가오치항 어촌뉴딜 300사업 건축공사 2층 옹벽 거푸집 해체 중 작업자가 사망하는 사건이 발생했습니다.</div>
            <div class="txt mt30 fc_gy">
              법관이 중대한 심신상의 장해로 직무를 수행할 수 없을 때에는 법률이 정하는 바에 의하여 퇴직하게 할 수 있다. 국회는 헌법개정안이 공고된 날로부터 60일 이내에 의결하여야 하며, 국회의
              의결은 재적의원 3분의 2 이상의 찬성을 얻어야 한다.
              <br>
              <br>
              대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이 아닌 법관을 둘 수 있다.대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이 아닌 법관을 둘 수 있다.
            </div>
            <div class="more_btn mt30">
              <a href="/board/board_view.php?board_id=img5&amp;no=14" tabindex="-1">자세히 보기</a>
            </div>
          </div>
          <div class="news_img">
            <img src="" alt="">
          </div>
        </article>

        <div class="tac mt60">
          <span class="form_btn btn btn_g" onclick="location.href='adm_check_list.php'">목록으로</span>
        </div>
      </section>

      <!--체크리스트 미리보기 layerpop -->
      <div class="layerpop" id="preview">
        <div class="cont_wrap">
          <div class="tit_box">
            <p class="tit">체크리스트</p>
          </div>
          <div class="layer_cont">
            <article class="cont_box check-work">
              <div class="list-wrap group01">
                <!-- 체크리스트 제목 s -->
                <div class="list clear pa10">
                  <div class="toggle_btn mr5"></div>
                  <div class="tit">작업전</div>
                </div>
                <!-- 체크리스트 제목 e -->
                <!-- 체크리스트 s -->
                <div class="view mb20">
                  <div class="list-wrap group02">
                    <div class="list clear pa10">
                      <div class="toggle_btn mr5"></div>
                      <div class="tit">안전점검</div>
                    </div>
                    <!-- 체크리스트 내용 s -->
                    <div class="view check-view">
                      <form class="check">
                        <div class="check_inner">
                          <!-- 체크리스트01 -->
                          <div data-question="1" class="check_step-1 check_step">
                            <h1 class="check_question">안전모 착용을 하였습니까?</h1>
                            <div class="answer_wrap">
                              <div class="answer">
                                <input class="answer_input" type="radio" id="yes1" name="q1" value="Yes">
                                <label class="answer_label" for="yes1">네</label>
                              </div>
                              <div class="answer">
                                <input class="answer_input" type="radio" id="no1" name="q1" value="No">
                                <label class="answer_label" for="no1">아니오</label>
                              </div>
                              <div class="answer">
                                <input class="answer_input" type="radio" id="na1" name="q1" value="NA">
                                <label class="answer_label" for="na1">해당없음</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <!-- 체크리스트 내용 e -->
                  </div>
                </div>
                <!-- 체크리스트 e -->
              </div>
            </article>
            <article class="cont_box check-work">
              <div class="list-wrap group01">
                <!-- 체크리스트 제목 s -->
                <div class="list clear pa10">
                  <div class="toggle_btn mr5"></div>
                  <div class="tit">작업중</div>
                </div>
                <!-- 체크리스트 제목 e -->
                <!-- 체크리스트 s -->
                <div class="view mb20">
                  <div class="list-wrap group02">
                    <div class="list clear pa10">
                      <div class="toggle_btn mr5"></div>
                      <div class="tit">지반상태</div>
                    </div>
                    <!-- 체크리스트 내용 s -->
                    <div class="view check-view">
                      <form class="check">
                        <div class="check_inner">
                          <!-- 체크리스트01 -->
                          <div data-question="1" class="check_step-1 check_step">
                            <h1 class="check_question">수평재 구조검토결과에 따른 조립간격 준수</h1>
                            <div class="answer_wrap">
                              <div class="answer">
                                <input class="answer_input" type="radio" id="yes1" name="q1" value="Yes">
                                <label class="answer_label" for="yes1">네</label>
                              </div>
                              <div class="answer">
                                <input class="answer_input" type="radio" id="no1" name="q1" value="No">
                                <label class="answer_label" for="no1">아니오</label>
                              </div>
                              <div class="answer">
                                <input class="answer_input" type="radio" id="na1" name="q1" value="NA">
                                <label class="answer_label" for="na1">해당없음</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <!-- 체크리스트 내용 e -->
                  </div>
                </div>
                <!-- 체크리스트 e -->
              </div>
            </article>
            <div class="pop_btn mt20">
              <button type="button" class="close btn form_btn btn_g mr5">취소</button>
              <button type="button" class="btn form_btn btn_m">인쇄하기</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 컨텐츠 내용 e-->
    </div>

    <!-- CONTENTS e -->

<?php include_once('footer.php'); ?>