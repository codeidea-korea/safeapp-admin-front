<?php
define('_INDEX_', true);
include_once('header.php');
?>

    <!-- CONTENTS s -->
    <div class="content mt50" id="adm_notice_write">
      <!-- 컨텐츠 공통 헤드 s-->
      <div class="com_head">
        <div class="breadcrumb">
          <a class="fc_gy fs-lg">컨텐츠 관리</a>
        </div>
        <ul class="tab_btn mt30">
          <li class="on"><a href="adm_notice_list.php">공지사항</a></li>
          <li><a href="adm_policy_list.php">정책관리</a></li>
        </ul>
      </div>
      <!-- 컨텐츠 공통 헤드 e -->


      <!-- 컨텐츠 내용 s-->
      <div class="cont mb30">
        <div class="box">
          <div class="box-header well" data-original-title="">
            <h2 class="fs-xlg">공지사항</h2>
          </div>
          <div class="box-content">

            <div class="form_table form_table2">
              <table>
                <tbody>
                  <tr>
                    <td class="bg">유형</td>
                    <td>
                      <select name="category" class="form-control mr5">
                        <option value="update">업데이트</option>
                      </select>
                      <input type="checkbox" name="pr_check" id="pr_check" class="mr5">우선게시
                    </td>
                  </tr>
                  <tr>
                    <td class="bg">제목</td>
                    <td>
                      <input type="text" id="tit_word" name="tit_word">
                      <div id="tit_cnt">(0 / 30)</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg">첨부파일</td>
                    <td>
                      <div class="filebox">
                        <input class="upload-name" value="첨부파일" placeholder="첨부파일">
                        <label for="file">파일선택</label>
                        <input type="file" id="file">
                      </div>
                      <p class="fs_sm mt5">* 5MB 미만의 파일만 첨부가 가능합니다.(PNG, GIF, JPG만 가능)</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" class="board_view_con">
                      <textarea id="text_word" name="text_word" class="autosize" onkeydown="resize(this)"
                        onkeyup="resize(this)"></textarea>
                      <div id="text_cnt">(0 / 500)</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="tac mt30">
              <span class="form_btn btn btn_g mr5" onclick="location.href='adm_notice_list.php'">목록</span>
              <span class="form_btn btn btn_m" onclick="location.href='adm_notice_list.php'">등록</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 컨텐츠 내용 e-->
    </div>
    <!-- CONTENTS e -->

<?php include_once('footer.php'); ?>