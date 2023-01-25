<?php
define('_INDEX_', true);
include_once('header.php');
?>


    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_member_adj">
      <!-- 컨텐츠 공통 헤드 s-->
      <div class="com_head">
        <div class="breadcrumb">
          <a class="fc_gy fs-lg">회원 관리</a>
        </div>
        <ul class="tab_btn mt30">
          <li class="on"><a href="#">회원목록</a></li>
        </ul>
      </div>
      <!-- 컨텐츠 공통 헤드 e -->


      <!-- 컨텐츠 내용 s-->
      <div class="cont mb30">
        <div class="box">
          <div class="box-header well" data-original-title="">
            <h2 class="fs-xlg">회원정보</h2>
          </div>
          <div class="box-content">
            <div class="statis_box wrap">
              <div class="tab_menu">
                <ul class="list">
                  <li class="is_on"><a href="adm_member_adj.php" class="statis_btn">회원정보</a></li>
                  <li><a href="adm_member_project.php" class="statis_btn">프로젝트 목록</a></li>
                </ul>
                <div class="cont_area pa60">
                    <div class="form_table">
                      <div class="tac"><img src="./resources/img/user_img2.png" alt="유저이미지"></div>
                      <form class="cmxform" id="signupForm" method="get" action="">
                        <fieldset>
                          <table class="mb30">
                            <tbody>
                              <tr>
                                <td class="bg">이름</td>
                                <td>김안전</td>
                              </tr>
                              <tr>
                                <td class="bg"><span class="import">아이디</span></td>
                                <td>
                                  <input type="text" id="id" name="id"autocomplete="off" value="아이디1" required>
                                </td>
                              </tr>
                              <tr>
                                <td class="bg"><span class="import">이메일</span></td>
                                <td>
                                  <input type="email" id="email" name="email" value="abcd1234@naver.com">
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
  
                          <table class="mb30">
                            <tbody>
                              <tr>
                                <td class="bg"><span>회원가입일</span></td>
                                <td>2022-10-12</td>
                              </tr>
                              <tr>
                                <td class="bg"><span>멤버십</span></td>
                                <td>개인</td>
                              </tr>
                              <tr>
                                <td class="bg"><span>멤버십 가입일</span></td>
                                <td>2022-10-12</td>
                              </tr>
                              <tr>
                                <td class="bg"><span>메일 알림</span></td>
                                <td>
                                  <label><input type="radio" name="check1">동의함</label>
                                  <input type="radio" name="check1">동의안함
                                </td>
                              </tr>
                              <tr>
                                <td class="bg"><span>최종 로그인</span></td>
                                <td>2022-10-12 15:00:00</td>
                              </tr>
                              <tr>
                                <td class="bg"><span>회원 상태</span></td>
                                <td>사용중</td>
                              </tr>
  
  
                            </tbody>
                          </table>
  
                          <table class="mb30">
                            <div class="fwb mb10 fs-lg">개인정보 수집, 이용, 선택, 라이센스 정책 동의 내역</div>
                            <tbody>
                              <tr>
                                <td class="bg"><span>개인정보 처리 방침</span></td>
                                <td>회원가입 : 동의함</td>
                              </tr>
                              <tr>
                                <td class="bg"><span>이용 약관 동의</span></td>
                                <td>회원가입 : 동의함</td>
                              </tr>
                              <tr>
                                <td class="bg"><span>마케팅 정보 수신동의</span></td>
                                <td>회원가입 :
                                  <input type="radio" name="check2">동의함
                                  <input type="radio" name="check2">동의안함
                                </td>
                              </tr>
                              <tr>
                                <td class="bg"><span>라이센스 정책 동의</span></td>
                                <td>멤버십 결제 : 동의함</td>
                              </tr>
                            </tbody>
                          </table>
  
                          <div class="tac">
                            <span class="form_btn btn btn_g mr5" onclick="location.href='adm_member.php'">목록</span>
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

                    <!-- 비밀번호 변경 완료 layerpop -->
                    <div class="layerpop pop2" id="confirm">
                      <div class="cont_wrap">
                        <div class="layer_cont cf_cont">
                          <div class="text-center">
                            <div class="fs-lg tac">비밀번호가 변경되었습니다.</div>
                          </div>
                          <div class="pop_btn mt30">
                            <button type="button" class="close form_btn btn btn_m">확인</button>
                          </div>
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
      <!-- 컨텐츠 내용 e-->
    </div>

    <!-- CONTENTS e -->

<?php include_once('footer.php'); ?>