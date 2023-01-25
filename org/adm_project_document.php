<?php
define('_INDEX_', true);
include_once('header.php');
?>

    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_project_document">
      <!-- 컨텐츠 공통 헤드 s-->
      <div class="com_head">
        <div class="breadcrumb">
          <a class="fc_gy fs-lg">프로젝트 관리</a>
        </div>
        <ul class="tab_btn mt30">
          <li class="on"><a href="#">프로젝트 목록</a></li>
        </ul>
      </div>
      <!-- 컨텐츠 공통 헤드 e -->


      <!-- 컨텐츠 내용 s-->
      <div class="cont">
        <div class="box">
          <div class="box-header well" data-original-title="">
            <h2 class="fs-xlg">프로젝트 문서</h2>
          </div>
          <div class="box-content">
            <!-- search s -->
            <form name="std_form" class="breadcrumb_form mb10" method="POST">
              <select name="search_type" class="mr5">
                <option value="temp_name">템플릿명</option>
                <option value="writer">작성자</option>
              </select>
              <input type="text" class="mr5" name="searcher" autocomplete="off">
              <button onclick="javascript:goSearch();" class="btn input_btn btn_g th_5" >검색</button>
            </form>

            <!-- board_list s / 리스트수 : 15줄 -->
            <div class="listlook">
              <table class="table mt25">
                <thead>
                  <tr>
                    <th>
                      <select name="search_type">
                        <option value="date" disabled selected>등록일</option>
                        <option value="date">최신순</option>
                        <option value="date">역순</option>
                      </select>
                    </th>
                    <th class="th_45">
                      <select name="search_type">
                        <option value="temp_name" disabled selected>템플릿명</option>
                        <option value="">정렬</option>
                      </select>
                    </th>
                    <th>
                      <select name="search_type">
                        <option value="writer" disabled selected>작성자</option>
                        <option value="">정렬</option>
                      </select>
                    </th>
                    <th>
                      <select name="search_type">
                        <option value="division" disabled selected>문서 구분</option>
                        <option value="check_list">체크리스트</option>
                        <option value="risk">위험성 평가표</option>
                      </select>
                    </th>
                    <th>
                      <select name="search_type">
                        <option value="status" disabled selected>문서 현황</option>
                        <option value="">점검요청</option>
                        <option value="">점검중</option>
                        <option value="">검토 대기중</option>
                        <option value="">승인 대기중</option>
                        <option value="">승인 완료</option>
                        <option value="">재점검 요청</option>
                      </select>
                    </th>
                    <th class="th_5">삭제</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2022-02-23</td>
                    <td>
                      <span class="ho_line pj_nm">거푸집 동바리 설치 체크 리스트</span>
                    </td>
                    <td>홍길동</td>
                    <td>체크리스트</td>
                    <td><span class="st_cir ing">점검중</span></td>
                    <td class="layer_btn">
                      <a href="#none" class="confirm">
                        <img src="./resources/img/icon/delete.png" alt="삭제ico">
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>2022-02-23</td>
                    <td>
                      <span class="ho_line pj_nm">거푸집 동바리 설치 체크 리스트</span>
                    </td>
                    <td>홍길동</td>
                    <td>체크리스트</td>
                    <td><span class="st_cir wait">승인대기중</span></td>
                    <td class="layer_btn">
                      <a href="#none" class="confirm">
                        <img src="./resources/img/icon/delete.png" alt="삭제ico">
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>2022-02-23</td>
                    <td>
                      <span class="ho_line pj_nm">거푸집 동바리 설치 체크 리스트</span>
                    </td>
                    <td>홍길동</td>
                    <td>체크리스트</td>
                    <td><span class="st_cir end">승인완료</span></td>
                    <td class="layer_btn">
                      <a href="#none" class="confirm">
                        <img src="./resources/img/icon/delete.png" alt="삭제ico">
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>2022-02-23</td>
                    <td>
                      <span class="ho_line pj_nm">거푸집 동바리 설치 체크 리스트</span>
                    </td>
                    <td>홍길동</td>
                    <td>체크리스트</td>
                    <td><span class="st_cir recheck">재점검 요청</span></td>
                    <td class="layer_btn">
                      <a href="#none" class="confirm">
                        <img src="./resources/img/icon/delete.png" alt="삭제ico">
                      </a>
                    </td>
                  </tr>
                  <!-- 게시판 리스트 종료 -->
                </tbody>
              </table>
            </div>

            <!-- pagination -->
            <div class="pagination pagination-centered">
              <ul>
                <li><a href="javascript:void(0)" class="p-prev">맨처음</a></li>
                <li><a href="javascript:void(0)" class="prev">이전</a></li>
                <li class="active"><a href="javascript:goPage(1)">1</a></li>
                <li><a href="javascript:goPage(2)">2</a></li>
                <li><a href="javascript:goPage(0)" class="next ">다음</a></li>
                <li><a href="javascript:void(0)" class="n-next">마지막</a></li>
              </ul>
            </div>

            <div class="tac mt20">
              <span class="form_btn btn btn_g" onclick="location.href='adm_project_list.php'">목록으로</span>
            </div>

            <!-- 삭제 layerpop -->
            <div class="layerpop" id="confirm">
              <div class="cont_wrap">
                <div class="layer_cont cf_cont">
                  <div class="text-center">
                    <div class="fs-lg tac">삭제하시겠습니까?</div>
                  </div>
                  <div class="pop_btn mt30">
                    <button type="button" class="close form_btn btn_g mr5">취소</button>
                    <button type="button" class="form_btn btn_m">삭제</button>
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