<?php
define('_INDEX_', true);
include_once('header.php');
?>


    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_pay_detail">
      <!-- 컨텐츠 공통 헤드 s-->
      <div class="com_head">
        <div class="breadcrumb">
          <a class="fc_gy fs-lg">멤버십 결제관리</a>
        </div>
        <ul class="tab_btn mt30">
          <li class="on"><a href="#">멤버십 결제목록</a></li>
        </ul>
      </div>
      <!-- 컨텐츠 공통 헤드 e -->


      <!-- 컨텐츠 내용 s-->
      <div class="cont mb30">
        <div class="box">
          <div class="box-header well" data-original-title="">
            <h2 class="fs-xlg">멤버십 결제상세</h2>
          </div>
          <div class="box-content">
            <div class="form_table">
              <table class="mb30">
                <tbody>
                  <tr>
                    <td class="bg">주문번호</td>
                    <td>00001234</td>
                  </tr>
                  <tr>
                    <td class="bg">아이디</td>
                    <td>아이디1</td>
                  </tr>
                  <tr>
                    <td class="bg">이름</td>
                    <td>홍길동</td>
                  </tr>
                  <tr>
                    <td class="bg">휴대폰 번호</td>
                    <td>010-0000-0000</td>
                  </tr>
                  <tr>
                    <td class="bg">멤버십 유형</td>
                    <td>팀</td>
                  </tr>
                  <tr>
                    <td class="bg">멤버십 상태</td>
                    <td>사용중</td>
                  </tr>
                  <tr>
                    <td class="bg">멤버십 기간</td>
                    <td>2022-10-11 ~ 2022-12-11</td>
                  </tr>
                  <tr>
                    <td class="bg">결제일</td>
                    <td>2022-10-11</td>
                  </tr>
                  <tr>
                    <td class="bg">결제금액</td>
                    <td>100,000원</td>
                  </tr>
                  <tr>
                    <td class="bg">결제유형</td>
                    <td>카드결제</td>
                  </tr>
                  <tr>
                    <td class="bg">결제상태</td>
                    <td>결제완료</td>
                  </tr>
                  <tr>
                    <td class="bg">메모</td>
                    <td>관리자가 작성한 메모가 나오는 영역입니다.</td>
                  </tr>
                </tbody>
              </table>

              <div class="tac">
                <span class="form_btn btn btn_g mr5" onclick="location.href='adm_pay_list.php'">목록</span>
                <span class="form_btn btn btn_m" onclick="location.href='adm_pay_adj.php'">수정/해지/결제취소</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 컨텐츠 내용 e-->
    </div>

    <!-- CONTENTS e -->

<?php include_once('footer.php'); ?>