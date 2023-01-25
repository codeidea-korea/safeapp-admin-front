<?php
define('_INDEX_', true);
include_once('header.php');
?>

    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_policy_list">
      <!-- 컨텐츠 공통 헤드 s-->
      <div class="com_head">
        <div class="breadcrumb">
          <a class="fc_gy fs-lg">컨텐츠 관리</a>
        </div>
        <ul class="tab_btn mt30">
          <li><a href="adm_notice_list.php">공지사항</a></li>
          <li class="on"><a href="#">정책관리</a></li>
        </ul>
      </div>
      <!-- 컨텐츠 공통 헤드 e -->


      <!-- 컨텐츠 내용 s-->
      <div class="cont mb30">
        <div class="box">
          <div class="box-header well" data-original-title="">
            <h2 class="fs-xlg">정책관리</h2>
          </div>
          <div class="box-content">
            <!-- board_list s / 리스트수 : 15줄 -->
            <div class="listlook">
              <table class="table mt25">
                <thead>
                  <tr>
                    <th class="th_5">번호</th>
                    <th class="th_60">정책</th>
                    <th>작성자</th>
                    <th>등록일</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td onclick="location.href='adm_policy_detail.php'">
                      <span class="ho_line pj_nm" >이용약관</span>
                    </td>
                    <td>관리자1</td>
                    <td>2022-10-11 16:48</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td onclick="clickcr(this, '');">
                      <span class="ho_line pj_nm">개인정보처리방침</span>
                    </td>
                    <td>관리자1</td>
                    <td>2022-10-11 16:48</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td onclick="clickcr(this, '');">
                      <span class="ho_line pj_nm">마케팅 정보 수신동의</span>
                    </td>
                    <td>관리자1</td>
                    <td>2022-10-11 16:48</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td onclick="clickcr(this, '');">
                    <span class="ho_line pj_nm">라이센스 정책</span>
                    </td>
                    <td>관리자1</td>
                    <td>2022-10-11 16:48</td>
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


          </div>
        </div>
      </div>
      <!-- 컨텐츠 내용 e-->
    </div>

    <!-- CONTENTS e -->

<?php include_once('footer.php'); ?>