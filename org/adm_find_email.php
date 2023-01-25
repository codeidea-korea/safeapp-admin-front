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
      <div class="cont ma30">
        <div class="box">
          <div class="box-header well" data-original-title="">
            <h2 class="fs-xlg">이메일/비밀번호 찾기</h2>
          </div>
          <div class="box-content">
            <div class="statis_box wrap">
              <div class="tab_menu">
                <ul class="list">
                  <li class="is_on"><a href="#tab1" class="statis_btn">이메일 찾기</a></li>
                  <li><a href="#tab2" class="statis_btn">비밀번호 재설정</a></li>
                </ul>

                <div class="cont_area">
                  <div id="tab1" class="statis_cont" style="display:block;">
                    <div class="lgn_box form_table mt30">
                      <p class="fs-xlg tac mt30">회원님의 이메일은 <span class="fwb">abc123 4@abcd.com 입니다.</span></p>       
                      <div class="tac mt30">
                        <span class="btn btn_m" onclick="location.href='adm_login.php';">로그인 페이지로 이동</span>
                      </div>
                    </div>
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