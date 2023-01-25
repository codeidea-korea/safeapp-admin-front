<?php
define('_INDEX_', true);
include_once('header.php');
?>


    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_member">
      <!-- 컨텐츠 공통 헤드 s-->
      <div class="com_head">
        <div class="breadcrumb">
          <a class="fc_gy fs-lg">Admin 관리</a>
        </div>
        <ul class="tab_btn mt30">
          <li class="on"><a href="#">Admin 목록</a></li>
        </ul>
      </div>
      <!-- 컨텐츠 공통 헤드 e -->


      <!-- 컨텐츠 내용 s-->
      <div class="cont">
        <div class="box">
          <div class="box-header well" data-original-title="">
            <h2 class="fs-xlg">Admin 목록</h2>
          </div>
          <div class="box-content">
            <!-- search s -->
            <form name="std_form" class="breadcrumb_form mb10" method="POST">
              <select name="search_type" class="mr5">
                <option value="id">아이디</option>
                <option value="name">이름</option>
                <option value="email">이메일</option>
                <option value="number">휴대폰 번호</option>
              </select>
              <input type="text" class="mr5" name="searcher" autocomplete="off">
              <button onclick="javascript:goSearch();" class="btn input_btn btn_g th_5" >검색</button>
            </form>

            <!-- board_list s / 리스트수 : 15줄 -->
            <div class="listlook">
              <table class="table mt25">
                <thead>
                  <tr>
                    <th class="th_5">번호</th>
                    <th>이름</th>
                    <th class="th_20">이메일</th>
                    <th>휴대폰 번호</th>
                    <th>등록일</th>
                    <th>최종로그인</th>
                    <th class="th_5">수정</th>
                    <th class="th_5">삭제</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>홍길동</td>
                    <td>ghdrlfehd_1234@email.com</td>
                    <td>010-0000-0000</td>
                    <td>2022-10-11</td>
                    <td>2022-10-11</td>
                    <td class="img"onclick="location.href='adm_manager_adj.php';">
                      <img src="./resources/img/icon/edit.png" alt="수정ico">
                    </td>
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

            <!-- 하단 버튼 -->
            <div class="tar">
              <a href="adm_manager_regist.php" class="form_btn btn btn_m">Admin 등록</a>
            </div>

            <!-- 삭제 layerpop -->
            <div class="layerpop" id="confirm">
              <div class="cont_wrap">
                <div class="layer_cont cf_cont">
                  <div class="text-center">
                    <div class="fs-lg tac">회원 계정을 삭제하시겠습니까?</div>
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