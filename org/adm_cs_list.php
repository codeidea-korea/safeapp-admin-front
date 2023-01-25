<?php
define('_INDEX_', true);
include_once('header.php');
?>
    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_member">
      <!-- 컨텐츠 공통 헤드 s-->
      <div class="com_head">
        <div class="breadcrumb">
          <a class="fc_gy fs-lg">고객센터 관리</a>
        </div>
        <ul class="tab_btn mt30">
          <li class="on"><a href="adm_cs_list.php">고객센터 관리</a></li>
        </ul>
      </div>
      <!-- 컨텐츠 공통 헤드 e -->


      <!-- 컨텐츠 내용 s-->
      <div class="cont mb30">
        <div class="box">
          <div class="box-header well" data-original-title="">
            <h2 class="fs-xlg">고객센터 목록</h2>
          </div>
          <div class="box-content">
            <!-- search s -->
            <form name="std_form" class="breadcrumb_form mb10" method="POST">
              <select name="search_type">
                <option value="all">전체</option>
                <option value="complete">완료</option>
                <option value="incomplete">미완료</option>
              </select>
              <div class="btn input_btn btn_m ml5 th_5" onclick="location.href='adm_inquiry_write.php'">1:1문의</div>
            </form>

            <!-- board_list s / 리스트 수 : 15줄 -->
            <div class="listlook">
              <table class="table mt25">
                <thead>
                  <tr>
                    <th class="th_5">번호</th>
                    <th>유형</th>
                    <th>서비스</th>
                    <th class="th_50">제목</th>
                    <th>작성자</th>
                    <th>답변</th>
                    <th>등록일</th>
                    <th class="th_5">삭제</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>신고</td>
                    <td>사고사례</td>
                    <td onclick="location.href='adm_inquiry_detail.php'">
                      <span class="ho_line pj_nm list_ico list-link">내용이 맞지 않아요</span>
                    </td>
                    <td>홍길동</td>
                    <td>미완료</td>
                    <td>2022-10-11</td>
                    <td class="layer_btn">
                      <a href="#none" class="confirm">
                        <img src="./resources/img/icon/delete.png" alt="삭제ico">
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>문의</td>
                    <td>멤버쉽</td>
                    <td onclick="clickcr(this, '');">
                      <span class="ho_line pj_nm">팀프로젝트 인원문의</span>
                      </td>
                    <td>홍길동</td>
                    <td>완료</td>
                    <td>2022-10-11</td>
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
                <li><a href="javascript:void(0)" class="next ">다음</a></li>
                <li><a href="javascript:void(0)" class="n-next">마지막</a></li>
              </ul>
            </div>

            <!-- 삭제 layerpop -->
            <div class="layerpop" id="confirm">
              <div class="cont_wrap">
                <div class="layer_cont cf_cont">
                  <div class="tac">
                    <div class="fs-lg">삭제하시겠습니까?</div>
                  </div>
                  <div class="pop_btn">
                    <button type="button" class="close form_btn btn btn_g mr5">취소</button>
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