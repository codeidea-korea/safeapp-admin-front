<?php
define('_INDEX_', true);
include_once('header.php');
?>

    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_notice_detail">
      <!-- 컨텐츠 공통 헤드 s-->
      <div class="com_head">
        <div class="breadcrumb">
          <a class="fc_gy fs-lg">컨텐츠 관리</a>
        </div>
        <ul class="tab_btn mt30">
          <li class="on"><a href="adm_notice_list.php">공지사항</a></li>
          <li><a href="adm_policy_list.php">정책관리</a></li>
        </ul>
      </div>
      <!-- 컨텐츠 공통 헤드 e -->


      <!-- 컨텐츠 내용 s-->
      <div class="cont mb30">
        <div class="box">
          <div class="box-header well" data-original-title="">
            <h2 class="fs-xlg">공지사항</h2>
          </div>
          <div class="box-content">

            <div class="form_table form_table2">
              <table>
                <tbody>
                  <tr>
                    <td class="bg">유형</td>
                    <td colspan="5">업데이트</td>
                  </tr>
                  <tr>
                    <td class="bg">제목</td>
                    <td colspan="5">제목이 오는 자리입니다.</td>
                  </tr>
                  <tr>
                    <td class="bg">작성자</td>
                    <td>관리자</td>
                    <td class="bg">등록일</td>
                    <td>2022-10-1 16:48</td>
                    <td class="bg">첨부파일</td>
                    <td>첨부파일명.jpg</td>
                  </tr>
                  <tr>
                    <td colspan="6" class="board_view_con">
                      공지사항 내용<br>
                      공지사항 내용<br>
                      공지사항 내용<br>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="tac mt30">
              <span class="form_btn btn btn_g mr5" onclick="location.href='adm_notice_list.php'">목록</span>
              <span class="form_btn btn btn_m" onclick="location.href='adm_notice_adj.php'">수정</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 컨텐츠 내용 e-->
    </div>
    <!-- CONTENTS e -->

<?php include_once('footer.php'); ?>