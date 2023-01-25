<?php
define('_INDEX_', true);
include_once('header.php');
?>


    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_member_project">
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
      <div class="cont">
        <div class="box">
          <div class="box-header well" data-original-title="">
            <h2 class="fs-xlg">프로젝트 목록</h2>
          </div>
          <div class="box-content">
            <div class="statis_box wrap">
              <div class="tab_menu">
                <ul class="list">
                  <li><a href="adm_member_adj.php" class="statis_btn">회원정보</a></li>
                  <li class="is_on"><a href="adm_member_project.php" class="statis_btn">프로젝트 목록</a></li>
                </ul>

                <div class="cont_area pa60">
                  <ul class="info">
                    <li>
                      <span>아이디</span>
                      <span>ghdrlfehd_0309</span>
                    </li>
                    <li>
                      <span>이름</span>
                      <span>홍길동</span>
                    </li>
                    <li>
                      <span>멤버십 유형</span>
                      <span>개인(Month)</span>
                    </li>
                  </ul>
                  <!-- board_list s / 리스트수 : 15줄 -->
                  <div class="listlook">
                    <table class="table mt25">
                      <thead>
                        <tr>
                          <th class="th_10">번호</th>
                          <th class="th_45">프로젝트명</th>
                          <th class="th_25">최근편집일</th>
                          <th class="th_20">권한</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr onclick="location.href='adm_member_project.php';">
                          <td>1</td>
                          <td>
                            <p class="pj_nm project_info">긴 내용의 프로젝트명 가나다라마바사아자차카타파하긴 내용의 프로젝트명 가나다라마바사아자차카타파하긴 내용의 프로젝트명 가나다라마바사아자차카타파하긴 내용의 프로젝트명 가나다라마바사아자차카타파하</p>
                          </td>
                          <td>2022-10-11</td>
                          <td>그룹원</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td><p class="pj_nm">프로젝트명</p></td>
                          <td>2022-10-11</td>
                          <td>그룹원</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td><p class="pj_nm">프로젝트명</p></td>
                          <td>2022-10-11</td>
                          <td>그룹원</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td><p class="pj_nm">프로젝트명</p></td>
                          <td>2022-10-11</td>
                          <td>그룹원</td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td><p class="pj_nm">프로젝트명</p></td>
                          <td>2022-10-11</td>
                          <td>그룹원</td>
                        </tr>
                        <!-- 게시판 리스트 종료 -->
                      </tbody>
                    </table>
                    <!-- pagination -->
                    <div class="pagination pagination-centered">
                      <ul>
                        <li><a href="javascript:void(0)" class="p-prev">맨처음</a></li>
                        <li><a href="javascript:void(0)" class="prev">이전</a></li>
                        <li class="active"><a href="javascript:goPage(1)">1</a></li>
                        <li><a href="javascript:goPage(2)">2</a></li>
                        <li><a href="javascript:void(0)" class="next ">다음</a></li>
                        <li><a href="javascript:void(0)" class="n-next">마지막</a></li>
                      </ul>
                    </div>
                  </div>
                  
                  <div class="tac mt30">
                    <span class="form_btn btn btn_g mr5" onclick="location.href='adm_member.php'">목록</span>
                    <div class="layer_btn form_btn btn btn_m">
                      <a href="#none" class="project">프로젝트 추가</a>
                    </div>
                  </div> 

                  <!-- 프로젝트 추가 layerpop -->
                  <div class="layerpop" id="project">
                    <div class="cont_wrap">
                      <div class="tit_box">
                        <p class="tit">프로젝트 추가하기</p>
                      </div>
                      <div class="layer_cont">
                        <table class="form_table mb30">
                          <tbody>
                            <tr>
                              <td class="bg">프로젝트 이름</td>
                              <td>
                                <input type="text" name="new_pw">
                                <p class="fs-sm error">* 프로젝트 이름을 입력해주세요.</p>
                              </td>
                            </tr>
                            <tr>
                              <td class="bg">프로젝트 시작일</td>
                              <td>
                                <input type="text" id="datepicker1"autocomplete='off'/>
                              </td>
                            </tr>
                            <tr>
                              <td class="bg">프로젝트 종료일</td>
                              <td>
                                <input type="text" id="datepicker1"autocomplete='off'/>
                              </td>
                            </tr>
                            <tr>
                              <td class="bg">인원</td>
                              <td class="p-count">
                                <input type='button' class="count mr5" onclick='count("plus")'value='+'/>
                                <div id='result'>1</div>
                                <input type='button' class="count ml5" onclick='count("minus")' value='-'/>
                              </td>
                            </tr>
                            <tr>
                              <td class="bg">현장 주소</td>
                              <td>
                                <input type="text" id="address_kakao" name="address" readonly placeholder="주소"/>
                                <input type="text" class="mt5" name="address_detail" placeholder="상세주소"/>
                              </td>
                            </tr>
                            <tr>
                              <td class="bg">현장 설명</td>
                              <td>
                                <textarea id="text_word" name="text_word" class="autosize" onkeydown="resize(this)" onkeyup="resize(this)"></textarea>
                          <div id="text_cnt">(0 / 500)</div>
                              </td>
                            </tr>
                            <tr>
                              <td class="bg">프로젝트 이미지</td>
                              <td>
                                <label class="file-label mr10 mb10" for="chooseFile">
                                  <img src="./resources/img/icon/image-plus.png" alt="이미지 추가">
                                  <p class="fc_w">이미지 추가</p>
                                </label>
                                <p class="file-info fs_sm">
                                  - 업로드 가능한 사이즈 : 최대 375 X 180<br>
                                  - 업로드 가능 확장자 : jpg, jpeg, png, bmp<br>
                                  - 업로드 가능 용량 : 10mb 미만
                                </p>
                                <input class="file" id="chooseFile" type="file" onchange="dropFile.handleFiles(this.files)" accept="image/png, image/jpeg, image/gif">
                                <div class="upload-box">
                                  <div id="drop-file" class="drag-file">
                                    <img src="https://img.icons8.com/pastel-glyph/2x/image-file.png" alt="파일 아이콘" class="image">
                                    <p class="message">image</p>
                                    <img src="" alt="미리보기 이미지" class="preview">
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div class="pop_btn mt10">
                          <span class="close form_btn btn btn_g mr5">취소</span>
                          <button type="button" class="close form_btn btn btn_m">프로젝트 추가</button>
                        </div>
                      </div>
                    </div>
                    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
                    <script>
                      window.onload = function(){
                          document.getElementById("address_kakao").addEventListener("click", function(){ //주소입력칸을 클릭하면
                              //카카오 지도 발생
                              new daum.Postcode({
                                  oncomplete: function(data) { //선택시 입력값 세팅
                                      document.getElementById("address_kakao").value = data.address; // 주소 넣기
                                      document.querySelector("input[name=address_detail]").focus(); //상세입력 포커싱
                                  }
                              }).open({
                                    left: (window.screen.width / 2) - (width / 2),
                                    top: (window.screen.height / 2) - (height / 2)
                                });
                          });
                      }
                    </script>
                  </div>

                  <!-- 프로젝트 정보 layerpop -->
                  <div class="layerpop" id="project_info">
                    <div class="cont_wrap">
                      <div class="tit_box">
                        <p class="tit">프로젝트 정보</p>
                        <span class="lp_btn dim_close">닫기</span>
                      </div>
                      <div class="layer_cont">
                        <table class="form_table mb30">
                          <tbody>
                            <tr>
                              <td class="bg">ㅇㅇ아파트 제1지구</td>
                            </tr>
                            <tr>
                              <td class="bg">프로젝트 시작일</td>
                              <td>2022-10-03</td>
                            </tr>
                            <tr>
                              <td class="bg">프로젝트 종료일</td>
                              <td>2022-10-03</td>
                            </tr>
                            <tr>
                              <td class="bg">인원</td>
                              <td>50</td>
                            </tr>
                            <tr>
                              <td class="bg">현장 주소</td>
                              <td>ㅇㅇ시 ㅇㅇ구 ㅇㅇ로 ㅇㅇ길 ㅇㅇ</td>
                            </tr>
                            <tr>
                              <td class="bg">현장 설명</td>
                              <td>
                                현장 설명 텍스트가 오는 자리입니다.<br>
                                현장 설명 텍스트가 오는 자리입니다.<br>
                                현장 설명 텍스트가 오는 자리입니다.
                              </td>
                            </tr>
                            <tr>
                              <td class="bg">프로젝트 이미지</td>
                              <td><img src="./resources/img/icon/n_img.png" alt="이미지"></td>
                            </tr>
                          </tbody>
                        </table>
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