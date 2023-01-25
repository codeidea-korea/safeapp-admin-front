<?php
define('_INDEX_', true);
include_once('header.php');
?>


    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_lost_info">
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
                  <li><a href="adm_lost_info.php" class="statis_btn">이메일 찾기</a></li>
                  <li class="is_on"><a href="adm_lost_info_pw.php" class="statis_btn">비밀번호 재설정</a></li>
                </ul>

                <div class="cont_area pa60">
                  <div class="lgn_box form_table mt30">
                    <div class="fs-lg tac mb30">회원가입 시 입력한 정보로 비밀번호를 재설정 할 수 있습니다.</div>
                    <form class="cmxform" id="signupForm" method="get" action="">
                      <fieldset>
                        <table class="mb30">
                          <tbody>
                            <tr>
                              <td class="bg">이메일</td>
                              <td>
                                <input type="email" id="email" name="email" placeholder="이메일을 입력해 주세요."onfocus="this.placeholder=''" onblur="this.placeholder='이메일을 입력해 주세요.'" autocomplete="off" required>
                              </td>
                            </tr>
                            <tr>
                              <td class="bg">이름</td>
                              <td>
                                <input type="text" id="username" name="username" placeholder="이름을 입력해 주세요." onfocus="this.placeholder=''" onblur="this.placeholder='이름을 입력해 주세요'"autocomplete="off" required>
                              </td>
                            </tr>
                            <tr>
                              <td class="bg">휴대폰 번호</td>
                              <td>
                                <div class="mb5 seller">
                                  <div class="seller_num mr3">
                                    <input type="text" id="phone" name="phone" placeholder="핸드폰 번호 입력" required>
                                  </div>
                                  <div class="seller_btn">
                                    <button disabled="" class="input_btn btn_m">인증요청</button>
                                  </div>
                                </div>
                                <div class="seller">
                                  <div class="seller_num mr3">
                                    <input type="text" placeholder="인증번호 입력">
                                  </div>
                                  <div class="seller_btn">
                                    <button class="input_btn" disabled="" id="completion" onclick="checkCompletion()">확인</button>
                                  </div>
                                  <p class="timer">03:00</p>
                                  <p class="error">인증번호가 올바르지 않습니다. 다시 확인해주세요.</p>
                                  <p class="error">인증 시간이 초과되었습니다.</p>
                                </div>
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <div class="tac">
                          <input type="submit" class="submit btn btn_m" value="비밀번호 재설정">
                        </div>
                        <div class="search_btn tac mt15">
                          <a href="adm_login.php">로그인</a>
                        </div>
                      </fieldset>
                    </form>
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