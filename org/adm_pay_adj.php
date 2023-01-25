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
            <h2 class="fs-xlg">멤버십 결제수정/해지</h2>
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
                    <td class="breadcrumb_form">
                      <div class="rv_date mr5"><input type="text" id="datepicker1" autocomplete='off' /></div>
                      <div class="rv_date mr5"><input type="text" id="datepicker2" autocomplete='off' /></div>
                    </td>
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
                    <td>
                      <textarea id="text_word" name="text_word" class="autosize" onkeydown="resize(this)" onkeyup="resize(this)"></textarea>
                      <div id="text_cnt">(0 / 500)</div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="tac">
                <span class="form_btn btn btn_g mr5" onclick="location.href='adm_pay_detail.php'">취소</span>
                <span class="form_btn btn btn_m" onclick="location.href='adm_pay_detail.php'">저장</span>
                <span class="form_btn btn btn_b" onclick="javascript:openModal('terminate');">해지</span>
                <span class="form_btn btn btn_w" onclick="javascript:openModal('cancel');">결제취소</span>
              </div>
            </div>

            <!-- 해지확인 layerpop -->
            <div class="layerpop pop2" id="terminate">
              <div class="cont_wrap">
                <div class="layer_cont cf_cont">
                  <div class="tac">
                    <div class="fs-lg">멤버십을 해지하시겠습니까?</div>
                  </div>
                  <div class="pop_btn">
                    <button type="button" class="close2 form_btn btn btn_g mr5">취소</button>
                    <button type="button" class="form_btn btn_m">확인</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 결제취소 확인 layerpop -->
            <div class="layerpop pop2" id="cancel">
              <div class="cont_wrap">
                <div class="layer_cont cf_cont">
                  <div class="tac">
                    <div class="fs-lg">결제를 취소하시겠습니까?</div>
                  </div>
                  <div class="pop_btn">
                    <button type="button" class="close2 form_btn btn btn_g mr5">취소</button>
                    <button type="button" class="form_btn btn_m">확인</button>
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