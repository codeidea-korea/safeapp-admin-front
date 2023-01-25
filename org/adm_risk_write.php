<?php
define('_INDEX_', true);
include_once('header.php');
?>

    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_risk_adj">
      <!-- 컨텐츠 공통 헤드 s-->
      <section class="com_head">
        <div class="breadcrumb">
          <a class="fc_gy fs-lg">리스트 관리</a>
        </div>
        <ul class="tab_btn mt30">
          <li><a href="adm_check_list.php">체크리스트</a></li>
          <li class="on"><a href="adm_risk_list.php">위험성 평가표</a></li>
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
            </div>
          </div>
          <div class="title mt20">
            <input type="text" name="list_title" id="list_title" class="fwb fs-xlg pa20">
          </div>
          <div class="mybutton">
            <button class="btn btn_g ml10">
              <img class="mr5" src="./resources/img/icon/edit.png" alt="현재 작성중">현재 작성중
            </button>
            <button class="btn btn_w ml10" onclick="location.href='adm_risk_list.php'">
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

        <article class="cont_box check-work mt30 pat30 pab30">
          <h3 class="fs-lg mb20">작업개요</h3>
          <div class="form_table form_table2">
            <table>
              <tbody>
                <tr>
                  <td class="bg">작업공종</td>
                  <td>
                    <input type="text">
                  </td>
                </tr>
                <tr>
                  <td class="bg">세부공종</td>
                  <td>
                    <input type="text">
                  </td>
                </tr>
                <tr>
                  <td class="bg">작업기간</td>
                  <td>
                    <div class="breadcrumb_form mb10">
                      <div class="rv_date mr5"><input type="text" id="datepicker1" autocomplete='off' /></div>
                      <div class="rv_date mr5"><input type="text" id="datepicker2" autocomplete='off' /></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        <article class="cont_box check-work mt30">
          <table class="table">
            <thead>
              <tr>
                <th colspan="3">작업내용</th>
                <th colspan="2">유래해위험요인</th>
                <th>관련근거</th>
                <th>위험성</th>
                <th>감소대책</th>
                <th>검토의견</th>
                <th colspan="2">유해위험요인</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr style="background:#f0f5f5;">
                <td class="th_8">작업내용</td>
                <td class="th_8">작업장소</td>
                <td class="th_8">작업도구</td>
                <td class="th_10">분류</td>
                <td class="th_15">유해위험요인</td>
                <td class="th_10">법규/지침</td>
                <td class="th_8">상/중/하</td>
                <td class="th_10">감소대책</td>
                <td class="th_10">경로의견</td>
                <td class="th_5">이행담당자</td>
                <td class="th_5">점검담당자</td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <input type="text">
                </td>
                <td>
                  <input type="text">
                </td>
                <td>
                  <input type="text">
                </td>
                <td>
                  <select name="search_type">
                    <option value="기계(설비)적 요인">기계(설비)적 요인</option>
                    <option value="전기적 요인">전기적 요인</option>
                    <option value="화학(물질)적 요인">화학(물질)적 요인</option>
                    <option value="생물학적 요인">생물학적 요인</option>
                    <option value="작업특성요인">작업특성요인</option>
                    <option value="작업환경요인">작업환경요인</option>
                  </select>
                </td>
                <td>
                  <input type="text">
                </td>
                <td>
                  <input type="text">
                </td>
                <td>
                  <select name="search_type">
                    <option value="상">상</option>
                    <option value="중">중</option>
                    <option value="하">하</option>
                  </select>
                </td>
                <td>
                  <input type="text" value="">
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div id="adj-btn">
                  <div class="plus-button"></div>
                  <div class="plus-button arrow-button"></div>
                </div>
              </td>
              </tr>
              <tr>
                <td colspan="3"></td>
                <td>
                  <select name="search_type">
                    <option value="기계(설비)적 요인">기계(설비)적 요인</option>
                    <option value="전기적 요인">전기적 요인</option>
                    <option value="화학(물질)적 요인">화학(물질)적 요인</option>
                    <option value="생물학적 요인">생물학적 요인</option>
                    <option value="작업특성요인">작업특성요인</option>
                    <option value="작업환경요인">작업환경요인</option>
                  </select>
                </td>
                <td>
                  <input type="text" value="">
                </td>
                <td>
                  <input type="text" value="">
                </td>
                <td>
                  <select name="search_type">
                    <option value="상">상</option>
                    <option value="중">중</option>
                    <option value="하">하</option>
                  </select>
                </td>
                <td>
                  <input type="text" value="">
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div id="adj-btn">
                  <div class="plus-button"></div>
                  <div class="plus-button minus-button"></div>
                </div>
              </td>
              </tr>
              <tr>
                <td><input type="text" value=""></td>
                <td><input type="text" value=""></td>
                <td><input type="text" value=""></td>
                <td>
                  <select name="search_type">
                    <option value="기계(설비)적 요인">기계(설비)적 요인</option>
                    <option value="전기적 요인">전기적 요인</option>
                    <option value="화학(물질)적 요인">화학(물질)적 요인</option>
                    <option value="생물학적 요인">생물학적 요인</option>
                    <option value="작업특성요인">작업특성요인</option>
                    <option value="작업환경요인">작업환경요인</option>
                  </select>
                </td>
                <td>
                  <input type="text" value="">
                </td>
                <td>
                  <input type="text" value="">
                </td>
                <td>
                  <select name="search_type">
                    <option value="상">상</option>
                    <option value="중">중</option>
                    <option value="하">하</option>
                  </select>
                </td>
                <td>
                  <input type="text" value="">
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div id="adj-btn">
                  <div class="plus-button"></div>
                  <div class="plus-button minus-button"></div>
                  <div class="plus-button arrow-button"></div>
                </div>
              </td>
              </tr>
              <tr>
                <td colspan="3" rowspan="2"></td>
                <td>
                  <select name="search_type">
                    <option value="기계(설비)적 요인">기계(설비)적 요인</option>
                    <option value="전기적 요인">전기적 요인</option>
                    <option value="화학(물질)적 요인">화학(물질)적 요인</option>
                    <option value="생물학적 요인">생물학적 요인</option>
                    <option value="작업특성요인">작업특성요인</option>
                    <option value="작업환경요인">작업환경요인</option>
                  </select>
                </td>
                <td>
                  <input type="text" value="">
                </td>
                <td>
                  <input type="text" value="">
                </td>
                <td>
                  <select name="search_type">
                    <option value="상">상</option>
                    <option value="중">중</option>
                    <option value="하">하</option>
                  </select>
                </td>
                <td>
                  <input type="text" value="">
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div id="adj-btn">
                  <div class="plus-button"></div>
                  <div class="plus-button minus-button"></div>
                </div>
              </td>
              </tr>
              <tr>
                <td>
                  <select name="search_type">
                    <option value="기계(설비)적 요인">기계(설비)적 요인</option>
                    <option value="전기적 요인">전기적 요인</option>
                    <option value="화학(물질)적 요인">화학(물질)적 요인</option>
                    <option value="생물학적 요인">생물학적 요인</option>
                    <option value="작업특성요인">작업특성요인</option>
                    <option value="작업환경요인">작업환경요인</option>
                  </select>
                </td>
                <td>
                  <input type="text" value="">
                </td>
                <td>
                  <input type="text" value="">
                </td>
                <td>
                  <select name="search_type">
                    <option value="상">상</option>
                    <option value="중">중</option>
                    <option value="하">하</option>
                  </select>
                </td>
                <td>
                  <input type="text" value="">
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div id="adj-btn">
                  <div class="plus-button"></div>
                  <div class="plus-button minus-button"></div>
                </div>
              </td>
              </tr>
            </tbody>
          </table>
          <table class="table tg mt30">
            <thead>
              <tr>
                <th colspan="3">*추가 위험요인 검토사항 반영{작성 : 책임 관리감독자}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowspan="2" class="th_80">
                  <textarea id="text_word" name="text_word" class="autosize" onkeydown="resize(this)" onkeyup="resize(this)"></textarea>
                </td>
                <td>이행담당자</td>
                <td>점검담당자</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
            </tbody>
            </table>
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
          <span class="form_btn btn btn_g">목록으로</span>
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