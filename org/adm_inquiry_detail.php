<?php
define('_INDEX_', true);
include_once('header.php');
?>
    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_inquiry_write">
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
            <h2 class="fs-xlg">1:1문의 상세</h2>
          </div>
          <div class="box-content">

            <div class="form_table form_table2">
              <table>
                <tbody>
                  <tr>
                    <td class="bg">유형</td>
                    <td>문의</td>
                    <td class="bg">서비스</td>
                    <td colspan="3">멤버십</td>
                  </tr>
                  <tr>
                    <td class="bg">제목</td>
                    <td colspan="5">제목이 오는 자리입니다.</td>
                  </tr>
                  <tr>
                    <td class="bg">등록일</td>
                    <td>2022-10-11 16:48</td>
                    <td class="bg">답변일</td>
                    <td>2022-10-11 16:48</td>
                    <td class="bg">첨부파일</td>
                    <td>첨부파일명</td>
                  </tr>
                  <tr>
                    <td colspan="6" class="board_view_con">
                      고객의 문의 내용이 오는 자리입니다.<br>
                      고객의 문의 내용이 오는 자리입니다.<br>
                      고객의 문의 내용이 오는 자리입니다.<br>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg">답변</td>
                    <td colspan="6">
                      관리자 답변이 오는 자리입니다.<br>
                      관리자 답변이 오는 자리입니다.<br>
                      관리자 답변이 오는 자리입니다.<br>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="tac mt30">
              <span class="form_btn btn btn_g mr5" onclick="location.href='adm_cs_list.php'">목록</span>
              <span class="form_btn btn btn_m" onclick="location.href='adm_inquiry_answer.php'">답변</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 컨텐츠 내용 e-->
    </div>
    <!-- CONTENTS e -->

<?php include_once('footer.php'); ?>