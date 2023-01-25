<?php
define('_INDEX_', true);
include_once('header.php');
?>


    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_project_list">
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
            <h2 class="fs-xlg">멤버십 결제 목록</h2>
          </div>
          <div class="box-content">
            <!-- search s -->
            <div class="form">
              <form name="std_form" class="breadcrumb_form mb10" method="POST">
                <select name="search_type" class="mr5">
                  <option value="project_name">전체</option>
                  <option value="admin_name">관리자명</option>
                </select>
                <input type="text" class="mr5" name="searcher" autocomplete="off">
                <button onclick="javascript:goSearch();" class="btn input_btn btn_g">검색</button>
              </form>

              <form name="std_form" class="breadcrumb_form mb10" method="POST">
                <span class="mr10">결제유형</span>
                <select name="search_type" class="th_20 mr20">
                  <option value="all">전체</option>
                  <option value="free">무료</option>
                  <option value="personal">개인</option>
                  <option value="team">팀</option>
                </select>
                <span class="mr5">결제상태</span>
                <select name="search_type" class="th_20">
                  <option value="all">전체</option>
                  <option value="cancle">취소</option>
                  <option value="termination">구독해지</option>
                  <option value="expiration">기간만료</option>
                  <option value="all">사용중</option>
                </select>
              </form>
              
              <form name="std_form" class="breadcrumb_form mb10" method="POST">
                <span class="mr5">결제일</span>
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

            <!-- board_list s -->
            <div class="listlook">
              <table class="table mt25">
                <thead>
                  <tr>
                    <th>주문번호</th>
                    <th>아이디</th>
                    <th>이름</th>
                    <th>휴대폰 번호</th>
                    <th>멤버십 유형</th>
                    <th>멤버십 상태</th>
                    <th class="th_15">멤버십 기간</th>
                    <th>결제일</th>
                    <th>금액</th>
                    <th>결제유형</th>
                    <th>결제상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr onclick="location.href='adm_pay_detail.php'">
                    <td>00002112</td>
                    <td>아이디1</td>
                    <td>홍길동</td>
                    <td>010-0000-0000</td>
                    <td>팀</td>
                    <td>사용중</td>
                    <td>2022-10-11 ~ 2022-10-12</td>
                    <td>2022-10-11</td>
                    <td>100,000원</td>
                    <td>카드결제</td>
                    <td>결제완료</td>
                  </tr>
                  <tr>
                    <td>00002112</td>
                    <td>아이디1</td>
                    <td>홍길동</td>
                    <td>010-0000-0000</td>
                    <td>개인</td>
                    <td>구독해지</td>
                    <td>2022-10-11 ~ 2022-10-12</td>
                    <td>2022-10-11</td>
                    <td>100,000원</td>
                    <td>무통장입금</td>
                    <td>입금요청</td>
                  </tr>
                  <tr>
                    <td>00002112</td>
                    <td>아이디1</td>
                    <td>홍길동</td>
                    <td>010-0000-0000</td>
                    <td>팀</td>
                    <td>기간만료</td>
                    <td>2022-10-11 ~ 2022-10-12</td>
                    <td>2022-10-11</td>
                    <td>100,000원</td>
                    <td>카드결제</td>
                    <td>결제취소</td>
                  </tr>
                  <tr>
                    <td>00002112</td>
                    <td>아이디1</td>
                    <td>홍길동</td>
                    <td>010-0000-0000</td>
                    <td>팀</td>
                    <td>취소</td>
                    <td>2022-10-11 ~ 2022-10-12</td>
                    <td>2022-10-11</td>
                    <td>100,000원</td>
                    <td>간편결제</td>
                    <td>결제완료</td>
                  </tr>
                  <!-- 게시판 리스트 종료 -->
                </tbody>
              </table>
              <table class="table tg mt10 fwb" style="width:34%; float:right">
                <tr>
                  <th>합계</th>
                  <td style="border-top:1px solid var(--line-color)">1,000,000원</td>
                </tr>
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

              <div class="tar">
                <span class="form_btn btn btn_m mr5" onclick="location.href='adm_pay_request.php'">결제 요청하기</span>
                <span class="form_btn btn btn_g">엑셀 내보내기</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 컨텐츠 내용 e-->
    </div>
    <!-- CONTENTS e -->

<?php include_once('footer.php'); ?>