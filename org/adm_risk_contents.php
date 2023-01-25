<?php
define('_INDEX_', true);
include_once('header.php');
?>

    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_risk_contents">
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
      <section class="cont mb30">
        <article class="cont_box mt30">
          <div class="write_wrap">
            <div class="user_img"></div>
            <div class="write_info ml10">
              <p>유저1</p>
            </div>
          </div>
          <div class="title mt20">
            <span class="fwb fs-xlg pat20 pab20">굴착작업 위험성 평가</span>
          </div>
          <div class="mybutton">
            <button class="btn btn_w ml10" onclick="location.href='adm_risk_adj.php'">
              <img class="mr5" src="./resources/img/icon/edit.png" alt="템플릿 편집">템플릿 편집
            </button>
            <button class="btn layer_btn btn_w ml10" onclick="javascript:openModal('preview');">
              <img class="mr5" src="./resources/img/icon/preview.png" alt="미리보기">미리보기
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

        <article class="cont_box check-work mt30 pat30 pab30">
          <h3 class="fs-lg mb20">작업개요</h3>
          <div class="form_table form_table2">
            <table>
              <tbody>
                <tr>
                  <td class="bg">작업공종</td>
                  <td>굴착작업</td>
                </tr>
                <tr>
                  <td class="bg">세부공종</td>
                  <td>굴착작업</td>
                </tr>
                <tr>
                  <td class="bg">작업기간</td>
                  <td>2022-10-02 ~ 2022-10-05</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        <article class="cont_box check-work pat30 pab30">
          <div class="listlook">
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
                </tr>
                <tr>
                  <td>굴착 장비반임</td>
                  <td>a-1</td>
                  <td>굴삭기</td>
                  <td>기계적요인</td>
                  <td>굴삭기 운전원의 운전미숙으로 전도, 충돌</td>
                  <td>안전보건규</td>
                  <td>상</td>
                  <td>이동을 전선 등 사용 전 점검</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td colspan="3"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>상</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td colspan="3" rowspan="2"  style="border-bottom: 0;"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <table class="table tg mt30">
            <thead>
              <tr>
                <th colspan="3">*추가 위험요인 검토사항 반영{작성 : 책임 관리감독자}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowspan="2" class="th_80"></td>
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
              - 사고 발생일 : 2021-12-13 오전 08:30<br>
              - 사고 경위 : 21년 12월 13일 가오치항 다목적센터 건축물 2층 옹벽 거푸집 탈형 중 협소한 공간으로..<br>
              - 사고 원인 : 기타<br>
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
          <span class="form_btn btn btn_g" onclick="location.href='adm_risk_list.php'">목록으로</span>
        </div>
      </section>

      <!--위험성 평가표 미리보기 layerpop -->
      <div class="layerpop" id="preview">
        <div class="cont_wrap" style="width:70vw">
          <div class="tit_box">
            <p class="tit">위험성 평가표</p>
          </div>
          <div class="layer_cont">
            <article class="cont_box check-workpab30">
              <h3 class="fs-lg mb20">작업개요</h3>
              <div class="form_table form_table2">
                <table>
                  <tbody>
                    <tr>
                      <td class="bg">작업공종</td>
                      <td>굴착작업</td>
                    </tr>
                    <tr>
                      <td class="bg">세부공종</td>
                      <td>굴착작업</td>
                    </tr>
                    <tr>
                      <td class="bg">작업기간</td>
                      <td>2022-10-02 ~ 2022-10-05</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
    
            <article class="cont_box check-work pat30 pab30">
              <div class="listlook">
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="background:#f0f5f5;">
                      <td>작업내용</td>
                      <td>작업장소</td>
                      <td>작업도구</td>
                      <td>분류</td>
                      <td>유해위험요인</td>
                      <td>법규/지침</td>
                      <td>상/중/하</td>
                      <td>감소대책</td>
                      <td>검토의견</td>
                      <td>이행담당자</td>
                      <td>점검담당자</td>
                    </tr>
                    <tr>
                      <td>굴착 장비반임</td>
                      <td>a-1</td>
                      <td>굴삭기</td>
                      <td>기계적요인</td>
                      <td>굴삭기 운전원의 운전미숙으로 전도, 충돌</td>
                      <td>안전보건규</td>
                      <td>상</td>
                      <td>이동을 전선 등 사용 전 점검</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colspan="3"></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>상</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colspan="3" rowspan="2"></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <table class="table tg mt30">
                <thead>
                  <tr>
                    <th colspan="3">*추가 위험요인 검토사항 반영{작성 : 책임 관리감독자}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowspan="2" class="th_80"></td>
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