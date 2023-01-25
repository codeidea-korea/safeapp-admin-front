<?php
define('_INDEX_', true);
include_once('header.php');
?>


    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_pay_request">
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
            <h2 class="fs-xlg">멤버십 결제요청</h2>
          </div>
          <div class="box-content">
            <div class="form_table">
              <table class="mb30">
                <tbody>
                  <tr>
                    <td class="bg">결제자</td>
                    <td>
                      <div class="breadcrumb_form">
                        <select name="search_type" class="mr5">
                          <option value="user_name">이름</option>
                          <option value="phone">휴대폰 번호</option>
                        </select>
                        <input type="text" class="mr5" name="searcher" autocomplete="off">
                        <span onclick="javascript:goSearch();" class="button btn input_btn btn_g">검색</span>
                      </div>
                      <div class="tag">
                        <span class="srtag btn btn_g mt10">
                          아이디1
                          <span></span><img src="./resources/img/icon/cancle.png" alt="태그 삭제" class="ml5">
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg">결제금액</td>
                    <td>
                      <input type="text" name="payment" id="payment">
                    </td>
                  </tr>
                  <tr>
                    <td class="bg">사용기간</td>
                    <td class="breadcrumb_form">
                      <div class="rv_date mr5"><input type="text" id="datepicker1" autocomplete='off' /></div>
                      <div class="rv_date mr5"><input type="text" id="datepicker2" autocomplete='off' /></div>
                    </td>
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
                <span class="form_btn btn btn_g mr5" onclick="location.href='adm_pay_list.php'">목록</span>
                <div class="form_btn btn btn_m layer_btn">
                  <a href="#none" class="pay_request">결제요청</a>
                </div>
              </div>
            </div>

            <!-- 결제요청 확인 layerpop -->
            <div class="layerpop" id="pay_request">
              <div class="cont_wrap">
                <div class="tit_box">
                  <p class="tit">결제요청</p>
                </div>
                <div class="layer_cont">
                  <table class="form_table mb30">
                    <tbody>
                      <tr>
                        <td class="bg">결제자</td>
                        <td>사용자1</td>
                      </tr>
                      <tr>
                        <td class="bg">결제금액</td>
                        <td>10,000,000원</td>
                      </tr>
                      <tr>
                        <td class="bg">사용기간</td>
                        <td>2022-10-11 ~ 2022-12-11</td>
                      </tr>
                      <tr>
                        <td class="bg">메모</td>
                        <td>작성한 메모가 보이는 영역입니다.</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="pop_btn mt10">
                    <button type="button" class="close btn form_btn btn_g mr5">취소</button>
                    <button type="button" class="btn form_btn btn_m">확인</button>
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