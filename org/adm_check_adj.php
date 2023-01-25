<?php
define('_INDEX_', true);
include_once('header.php');
?>


    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_check_adj">
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
      <section id="adj" class="cont mb30">
        <article class="cont_box mt30">
          <div class="write_wrap">
            <div class="user_img"></div>
            <div class="write_info ml10">
              <p>유저1</p>
              <p class="fs-sm">등록일 : 2022-11-03</p>
            </div>
          </div>
          <div class="title mt20">
            <input type="text" name="list_title" id="list_title" class="fwb fs-xlg pa20" value="거푸집 동바리 설치 체크리스트">
          </div>
          <div class="mybutton">
            <div class="public_toggle">
              <input type="checkbox" />
              <span class="toggle_btn"></span>
              <span class="labels"></span>
              <span class="bg"></span>
            </div>
            <button class="btn btn_g ml10">
              <img class="mr5" src="./resources/img/icon/edit.png" alt="현재 편집 중">현재 편집 중
            </button>
            <button class="btn btn_w ml10" onclick="location.href='adm_check_list.php'">
              <img class="mr5" src="./resources/img/icon/bookmark.png" alt="템플릿 저장">템플릿 저장
            </button>
          </div>         
          <div class="content-tag mt30">
            <div class="list-wrap">
              <div class="list">
                <img class="toggle_btn btn" src="./resources/img/icon/closeView_.png" alt="보기/감추기 버튼">
              </div>
              <div class="view watch">
                <div class="tag_wrap">
                  <div class="view_tit">태그<span class="add_btn tag_add ml5 btn_ico">+</span></div>
                  <input type="text" id="tag" class="th_10" placeholder="태그입력">
                    <ul id="tag-list">
                      <li class="tag-item">건축공사<span class="del-btn" idx="0">x</span></li>
                      <li class="tag-item">거푸집<span class="del-btn" idx="0">x</span></li>
                      <li class="tag-item">작업자<span class="del-btn" idx="0">x</span></li>
                    </ul>
                </div>
                <div class="tag_wrap">
                  <div class="view_tit">사고사례
                    <span class="layer_btn add_btn ml5 btn_ico">
                      <a href="#none" class="ex">+</a>
                    </span>
                  </div>
                  <ul id="tag-list">
                    <li class="tag-item">사고사례1<span class="del-btn" idx="0">x</span></li>
                    <li class="tag-item">사고사례2<span class="del-btn" idx="0">x</span></li>
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
              <div class="tit">
                <input type="text" name="" id="" value="작업전">
                <label for="menu-toggle">
                  <div class="dotted-menu">
                    <span class="line"></span>
                    <span class="line"></span>
                    <span class="line"></span>
                  </div>
                  <input type="checkbox" id="menu-toggle" />
                  <ul id="menu">
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                  </ul>
                </label>
                <div id="adj-btn">
                  <div class="plus-button"></div>
                  <div class="plus-button arrow-button"></div>
                </div>
              </div>
            </div>
            <!-- 체크리스트 제목 e -->
            <!-- 체크리스트 s -->
            <div class="view mb20">
              <div class="list-wrap group02">
                <div class="list clear pa20">
                  <div class="toggle_btn mr20"></div>
                  <div class="tit">
                    <input type="text" name="" id="" value="안전점검">
                    <label for="menu-toggle2">
                      <div class="dotted-menu">
                        <span class="line"></span>
                        <span class="line"></span>
                        <span class="line"></span>
                      </div>
                      <input type="checkbox" id="menu-toggle2" />
                      <ul id="menu">
                        <li><a href="#">
                            <span>예</span>
                            <span>아니오</span>
                            <span>해당없음</span>
                          </a></li>
                        <li><a href="#">
                            <span>Y</span>
                            <span>N</span>
                            <span>-</span>
                          </a></li>
                        <li><a href="#">
                            <span>양호</span>
                            <span>보통</span>
                            <span>불량</span>
                          </a></li>
                      </ul>
                    </label>
                    <div id="adj-btn">
                      <div class="plus-button"></div>
                      <div class="plus-button minus-button"></div>
                      <div class="plus-button arrow-button"></div>
                    </div>
                  </div>
                </div>
                <!-- 체크리스트 내용 s -->
                <div class="view check-view">
                  <form class="check">
                    <div class="check_inner">
                      <!-- 체크리스트01 -->
                      <div data-question="1" class="check_step-1 check_step">
                        <h1 class="check_question">
                          <input type="text" name="" id="" value="안전모 착용">
                        </h1>
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
                        <div id="adj-btn">
                          <div class="plus-button"></div>
                          <div class="plus-button minus-button"></div>
                        </div>
                      </div>

                      <!-- 체크리스트02 -->
                      <div data-question="2" class="check_step-2 check_step">
                        <h1 class="check_question">
                          <input type="text" name="" id="" value="안전모 착용">
                        </h1>
                        <div class="answer">
                          <input class="answer_input" type="radio" id="yes2" name="q2" value="Yes">
                          <label class="answer_label" for="yes2">네</label>
                        </div>
                        <div class="answer">
                          <input class="answer_input" type="radio" id="no2" name="q2" value="No">
                          <label class="answer_label" for="no2">아니오</label>
                        </div>
                        <div class="answer">
                          <input class="answer_input" type="radio" id="na2" name="q2" value="NA">
                          <label class="answer_label" for="na2">해당없음</label>
                        </div>
                        <div id="adj-btn">
                          <div class="plus-button"></div>
                          <div class="plus-button minus-button"></div>
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

      <!-- 결제요청 확인 layerpop -->
      <div class="layerpop" id="ex">
        <div class="cont_wrap">
          <div class="tit_box">
            <p class="tit">사고사례</p>
          </div>
          <div class="layer_cont">
            <div class="search mb20">
              <input type="text" class="searchTerm">
              <button type="submit" class="searchButton">
                <img src="./resources/img/icon/search.png" alt="검색">
              </button>
            </div>
            <ul>
              <li>
                <span class="news_cont">통영시 가오치항 어촌뉴딜 300사업 건축공사 2층 옹벽 거푸집 해체 중 작업자
                  <p class="fs-sm">- 작업장소 타 공종 간섭여부, 지반상태- 동바리 부재 구조검토서와 동일한 부재 반입여부- 동바리 부재 손상, 변형된 부재확인 및 제거상태</p>
                </span>
                <button class="btn bnt_m">추가</button>
              </li>
              <li>
                <span class="news_cont">통영시 가오치항 어촌뉴딜 300사업 건축공사 2층 옹벽 거푸집 해체 중 작업자
                  <p class="fs-sm">- 작업장소 타 공종 간섭여부, 지반상태- 동바리 부재 구조검토서와 동일한 부재 반입여부- 동바리 부재 손상, 변형된 부재확인 및 제거상태</p>
                </span>
                <button class="btn bnt_m">추가</button>
              </li>
              <li>
                <span class="news_cont">통영시 가오치항 어촌뉴딜 300사업 건축공사 2층 옹벽 거푸집 해체 중 작업자
                  <p class="fs-sm">- 작업장소 타 공종 간섭여부, 지반상태- 동바리 부재 구조검토서와 동일한 부재 반입여부- 동바리 부재 손상, 변형된 부재확인 및 제거상태</p>
                </span>
                <button class="btn bnt_m">추가</button>
              </li>
              <li>
                <span class="news_cont">통영시 가오치항 어촌뉴딜 300사업 건축공사 2층 옹벽 거푸집 해체 중 작업자
                  <p class="fs-sm">- 작업장소 타 공종 간섭여부, 지반상태- 동바리 부재 구조검토서와 동일한 부재 반입여부- 동바리 부재 손상, 변형된 부재확인 및 제거상태</p>
                </span>
                <button class="btn bnt_m">추가</button>
              </li>

            </ul>
            <div class="pop_btn mt20">
              <button type="button" class="close btn form_btn btn_g mr5">취소</button>
              <button type="button" class="btn form_btn btn_m">확인</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 컨텐츠 내용 e-->
    </div>

    <!-- CONTENTS e -->

<?php include_once('footer.php'); ?>