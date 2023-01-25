<?php
define('_INDEX_', true);
include_once('header.php');
?>


    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_pay_detail">
      <!-- 컨텐츠 공통 헤드 s-->
      <div class="com_head">
        <div class="breadcrumb">
          <a class="fc_gy fs-lg">로그인</a>
        </div>
      </div>
      <!-- 컨텐츠 공통 헤드 e -->

      <!-- 컨텐츠 내용 s-->
      <div class="cont mt30">
        <div class="box">
          <div class="box-header well" data-original-title="">
            <h2 class="fs-xlg">비밀번호 재설정</h2>
          </div>
          <div class="box-content">
            <div class="lgn_box form_table mt30">
              <form class="cmxform" id="signupForm" method="get" action="">
                <fieldset>
                  <table class="mb30">
                    <tbody>
                      <tr>
                        <td class="bg">새 비밀번호</td>
                        <td>
                          <input type="password" id="password" name="password" placeholder="비밀번호를 입력해주세요." autocomplete="off" required>
                          <div id="nameError" class="error"></div>
                        </td>
                      </tr>
                      <tr>
                        <td class="bg">비밀번호 확인</td>
                        <td>
                          <input type="password" id="confirm_password" name="confirm_password" placeholder="비밀번호를 다시 입력해주세요." autocomplete="off" required>
                          <div id="nameError" class="error"></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div class="tac">
                    <input type="submit" class="submit form_btn btn btn_m" vlue="확인">
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- 컨텐츠 내용 e-->
    </div>

    <!-- CONTENTS e -->

<?php include_once('footer.php'); ?>