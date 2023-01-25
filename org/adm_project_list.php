<?php
define('_INDEX_', true);
include_once('header.php');
?>


    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_project_list">
      <!-- 컨텐츠 공통 헤드 s-->
      <div class="com_head">
        <div class="breadcrumb">
          <a class="fc_gy fs-lg">프로젝트 관리</a>
        </div>
        <ul class="tab_btn mt30">
          <li class="on"><a href="#">프로젝트 목록</a></li>
        </ul>
      </div>
      <!-- 컨텐츠 공통 헤드 e -->


      <!-- 컨텐츠 내용 s-->
      <div class="cont mb30">
        <div class="box">
          <div class="box-header well" data-original-title="">
            <h2 class="fs-xlg">프로젝트 목록</h2>
          </div>
          <div class="box-content">
            <!-- search s -->
            <div class="form">
              <form name="std_form" class="breadcrumb_form mb10" method="POST">
                <select name="search_type" class="mr5">
                  <option value="project_name">프로젝트명</option>
                  <option value="admin_name">관리자명</option>
                </select>
                <input type="text" class="mr5" name="searcher" autocomplete="off">
                <button onclick="javascript:goSearch();" class="btn input_btn btn_g">검색</button>
              </form>

              <form name="std_form" class="breadcrumb_form mb10" method="POST">
                <span class="mr10">멤버십유형</span>
                <select name="search_type" class="th_20 mr20">
                  <option value="all">전체</option>
                  <option value="free">무료</option>
                  <option value="personal">개인</option>
                  <option value="team">팀</option>
                </select>
                <span class="mr5">멤버십상태</span>
                <select name="search_type" class="th_20">
                  <option value="all">전체</option>
                  <option value="cancle">취소</option>
                  <option value="termination">구독해지</option>
                  <option value="expiration">기간만료</option>
                  <option value="all">사용중</option>
                </select>
              </form>

              <form name="std_form" class="breadcrumb_form mb10" method="POST">
                <span class="mr5">생성일</span>
                <div class="rv_date mr5"><input type="text" id="datepicker1" autocomplete='off' /></div>
                <div class="rv_date mr5"><input type="text" id="datepicker2" autocomplete='off' /></div>
                <ul class="filter_list-shortcut mr5">
                  <li class="filter_shortcut mr5">
                    <button type="button">오늘</button>
                  </li>
                  <li class="filter_shortcut mr5">
                    <button type="button">1개월</button>
                  </li>
                  <li class="filter_shortcut mr5">
                    <button type="button">3개월</button>
                  </li>
                  <li class="filter_shortcut mr5">
                    <button type="button">6개월</button>
                  </li>
                  <li class="filter_shortcut">
                    <button type="button">전체</button>
                  </li>
                </ul>
                <button onclick="javascript:goSearch();" class="btn input_btn btn_g">검색</button>
              </form>
            </div>

            <!-- board_list s / 리스트수 : 15줄 -->
            <div class="listlook">
              <table class="table mt25">
                <thead>
                  <tr>
                    <th class="th_5">번호</th>
                    <th class="th_40">프로젝트명</th>
                    <th>생성일</th>
                    <th>관리자</th>
                    <th>공유템플릿</th>
                    <th>체크리스트</th>
                    <th>위험성 평가표</th>
                    <th>그룹원</th>
                    <th class="th_5">수정</th>
                    <th class="th_5">목록</th>
                    <th class="th_5">삭제</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td onclick="location.href='adm_project_document.php'">
                      <p class="ho_line pj_nm">프로젝트명1</p>
                      </td>
                    <td>2022-10-11</td>
                    <td>관리자1</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td class="layer_btn">
                      <a href="#none" class="project">
                        <img src="./resources/img/icon/edit.png" alt="프로젝트 관리">
                      </a>
                    </td>
                    <td class="layer_btn">
                      <a href="#none" class="member">
                        <img src="./resources/img/icon/member.png" alt="그룹원 목록">
                      </a>
                    </td>
                    <td class="layer_btn">
                      <a href="#none" class="confirm">
                        <img src="./resources/img/icon/delete.png" alt="삭제">
                      </a>
                    </td>
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
                  <li><a href="javascript:goPage(0)" class="next ">다음</a></li>
                  <li><a href="javascript:void(0)" class="n-next">마지막</a></li>
                </ul>
              </div>
            </div>

            <!-- 프로젝트 추가 layerpop -->
            <div class="layerpop" id="project">
              <div class="cont_wrap">
                <div class="tit_box">
                  <p class="tit">프로젝트 관리</p>
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
                          <input type="text" id="datepicker1" autocomplete='off' />
                        </td>
                      </tr>
                      <tr>
                        <td class="bg">프로젝트 종료일</td>
                        <td>
                          <input type="text" id="datepicker1" autocomplete='off' />
                        </td>
                      </tr>
                      <tr>
                        <td class="bg">인원</td>
                        <td class="p-count">
                          <input type='button' class="count mr5" onclick='count("plus")' value='+' />
                          <div id='result'>1</div>
                          <input type='button' class="count ml5" onclick='count("minus")' value='-' />
                        </td>
                      </tr>
                      <tr>
                        <td class="bg">현장 주소</td>
                        <td>
                          <input type="text" id="address_kakao" name="address" readonly placeholder="주소" />
                          <input type="text" class="mt5" name="address_detail" placeholder="상세주소" />
                        </td>
                      </tr>
                      <tr>
                        <td class="bg">현장 설명</td>
                        <td>
                          <textarea id="text_word" name="text_word" class="autosize" onkeydown="resize(this)"
                            onkeyup="resize(this)"></textarea>
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
                          <input class="file" id="chooseFile" type="file" onchange="dropFile.handleFiles(this.files)"
                            accept="image/png, image/jpeg, image/gif">
                          <div class="upload-box">
                            <div id="drop-file" class="drag-file">
                              <img src="https://img.icons8.com/pastel-glyph/2x/image-file.png" alt="파일 아이콘"
                                class="image">
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
                    <button type="button" class="close form_btn btn btn_m">수정완료</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 그룹원 목록 layerpop -->
            <div class="layerpop" id="member">
              <div class="cont_wrap th_50">
                <div class="tit_box">
                  <p class="tit">그룹원 목록</p>
                  <div class="tit_btn layer_btn btn btn_m tar">
                    <a href="#none" class="tac" onclick="javascript:openModal('member_add');">
                      <img src="./resources/img/icon/member2.png" alt="초청메일 보내기" class="ml10">
                      <p class="fs-sm mr5">그룹원 추가</p>
                    </a>
                  </div>
                </div>
                <!-- board_list s / 리스트수 : 5줄 -->
                <div class="layer_cont">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>이름</th>
                        <th class="th_50">이메일주소</th>
                        <th class="th_20">권한</th>
                        <th class="th_15">삭제</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>이름1</td>
                        <td>useremail.email.net</td>
                        <td>
                        <select name="search_type">
                          <option value="group_mem">그룹원</option>
                          <option value="admin">관리자</option>
                        </select>
                        </td>
                        <td class="layer_btn">
                          <a href="#none" class="confirm">
                            <img src="./resources/img/icon/delete.png" alt="삭제ico">
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>이름1</td>
                        <td>useremail.email.net</td>
                        <td class="master_adm">마스터 관리자</td>
                        <td class="layer_btn">
                          <a href="#none" class="confirm">
                            <img src="./resources/img/icon/delete.png" alt="삭제ico">
                          </a>
                        </td>
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
                      <li><a href="javascript:goPage(7)" class="next ">다음</a></li>
                      <li><a href="javascript:void(0)" class="n-next">마지막</a></li>
                    </ul>
                  </div>
                  <div class="pop_btn">
                    <span class="close form_btn btn btn_g mr5">저장</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 그룹원 추가 layerpop -->
            <div class="layerpop" id="member_add">
              <div class="cont_wrap">
                <div class="layer_cont cf_cont">
                  <div class="tit mb10">프로젝트 명</div>
                  <div class="mail" style="position:relative">
                    <input type="email" class="th_80 mb10"autocomplete="off" placeholder="이메일주소">
                    <div id="adj-btn" style="left:82%">
                      <div class="plus-button"></div>
                    </div>
                  </div>
                  <div style="position:relative">
                    <input type="email"  class="th_80 mb10"autocomplete="off" placeholder="이메일주소">
                    <div id="adj-btn"style="left:82%">
                      <div class="plus-button"></div>
                      <div class="plus-button minus-button"></div>
                    </div>
                  </div>
                  <textarea id="text_word" name="text_word" class="autosize" onkeydown="resize(this)" onkeyup="resize(this)"></textarea>
                  <div class="pop_btn">
                    <span class="close form_btn btn btn_g mr5">닫기</span>
                    <button type="button" class="close form_btn btn btn_m">초청메일 보내기</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 삭제 layerpop -->
            <div class="layerpop pop2" id="confirm">
              <div class="cont_wrap">
                <div class="layer_cont cf_cont">
                  <div class="tac">
                    <div class="fs-lg">삭제하시겠습니까?</div>
                  </div>
                  <div class="pop_btn">
                    <button type="button" class="close2 form_btn btn btn_g mr5">취소</button>
                    <button type="button" class="form_btn btn_m">삭제</button>
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