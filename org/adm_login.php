<?php
define('_INDEX_', true);
include_once('header.php');
?>


    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_login">
      <!-- 컨텐츠 공통 헤드 s-->
      <div class="com_head">
        <div class="breadcrumb">
          <a class="fc_gy fs-lg">로그인</a>
        </div>
      </div>
      <!-- 컨텐츠 공통 헤드 e -->

      <!-- 컨텐츠 내용 s-->
      <div class="login_cont pa60">
        <p class="tit fwb">LOGIN</p>
        <form class="cmxform" id="signupForm" method="get" action="">
          <fieldset>
            <div class="lgn_box mt30">
              <div class="lgn_div mb15">
                <span>이메일</span>
                <input type="email" id="email" name="email" autocomplete="off" placeholder="이메일"
                  onfocus="this.placeholder=''" onblur="this.placeholder='이메일'" required>
              </div>
              <div class="lgn_div mb15">
                <span>비밀번호</span>
                <input type="password" id="password" name="password" placeholder="비밀번호" onfocus="this.placeholder=''"
                  onblur="this.placeholder='비밀번호'" required>
              </div>


              <label><input type="checkbox" name="id_save" class="mr5">아이디 저장</label>
              <input type="submit" class="submit btn btn_m mt30" value="로그인">

              <div class="search_btn tac mt15">
                <a href="adm_lost_info.php">이메일 찾기</a>
                <a href="adm_lost_info_pw.php">비밀번호 찾기</a>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
    <!-- 컨텐츠 내용 e-->
  </div>

  <!-- CONTENTS e -->

<?php include_once('footer.php'); ?>