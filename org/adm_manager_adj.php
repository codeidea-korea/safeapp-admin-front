<?php
define('_INDEX_', true);
include_once('header.php');
?>


    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_member_adj">
      <!-- 컨텐츠 공통 헤드 s-->
      <div class="com_head">
        <div class="breadcrumb">
          <a class="fc_gy fs-lg">Admin 관리</a>
        </div>
        <ul class="tab_btn mt30">
          <li class="on"><a href="#">Admin 목록</a></li>
        </ul>
      </div>
      <!-- 컨텐츠 공통 헤드 e -->


      <!-- 컨텐츠 내용 s-->
      <div class="cont">
        <div class="box">
          <div class="box-header well" data-original-title="">
            <h2 class="fs-xlg">Admin 정보</h2>
          </div>
          <div class="box-content">
            <div class="form_table">
              <form class="cmxform" id="signupForm" method="get" action="">
                <fieldset>
                  <table class="mb30">
                    <tbody>
                      <tr>
                        <td class="bg"><span class="import">닉네임</span></td>
                        <td>
                          <div class="seller">
                            <div class="seller_num mr3">
                              <input type="text" id="nick" name="nick"autocomplete="off" placeholder="닉네임1" required>
                              <p class="fs-sm">* 문의사항 또는 게시판에 해당 닉네임으로 노출됩니다. 
                              </p>
                            </div>
                            <div class="seller_btn">
                              <button disabled="" class="input_btn btn_m">중복확인</button>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="bg"><span class="import">이메일</span></td>
                        <td>
                          <input type="email" id="email" name="email" placeholder="abcd1234@naver.com">
                        </td>
                      </tr>
                      <tr>
                        <td class="bg"><span class="import">비밀번호</span></td>
                        <td>
                          <div class="btn btn_b layer_btn">
                            <a href="#none" class="pw">비밀번호 변경하기</a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="bg"><span class="import">이름</span></td>
                        <td>
                          <input type="text" id="username" name="username" autocomplete="off" placeholder="이름을 입력해주세요." required>
                        </td>
                      </tr>
                      <tr>
                        <td class="bg"><span class="import">휴대폰 번호</span></td>
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
                    <span class="form_btn btn btn_g mr5"  onclick="location.href='adm_manager_list.php'">취소</span>
                    <input type="submit" class="submit form_btn btn btn_m" value="저장">
                  </div>
                </fieldset>
              </form>
            </div>

            <!-- 비밀번호 변경 layerpop -->
            <div class="layerpop" id="pw">
              <div class="cont_wrap">
                <div class="tit_box">
                  <p class="tit">비밀번호 변경</p>
                </div>
                <div class="layer_cont">
                  <table class="form_table mb30">
                    <tbody>
                      <tr>
                        <td class="bg"><span class="mr5">새 비밀번호</span></td>
                        <td>
                          <input type="text" name="new_pw">
                          <p class="fs-sm error">* 영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8~16자</p>
                        </td>
                      </tr>
                      <tr>
                        <td class="bg"><span class="mr5">비밀번호 확인</span></td>
                        <td><input type="text" name="" id=""></td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="pop_btn mt10">
                    <button type="button" class="close form_btn btn btn_g mr5">취소</button>
                    <button type="button" class="form_btn btn btn_m" onclick="javascript:openModal('confirm');">비밀번호 변경</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 컨텐츠 내용 e-->
      <!-- 컨텐츠 내용 e-->
    </div>

    <!-- CONTENTS e -->

<?php include_once('footer.php'); ?>