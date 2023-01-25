<?php include_once('./lib/common.lib.php'); ?>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>컨스퀘어</title>
<meta http-equiv="imagetoolbar" content="no">
<meta http-equiv="X-UA-Compatible" content="IE=10,chrome=1">
<link rel="shortcut icon" href="./img/favorite/favorite.ico"/>
<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script async="" src="/resources/js/jquery/jquery.easing.min.js"></script>
<link rel="stylesheet" type="text/css" href="./resources/css/fullcalendar.css">
<link rel="stylesheet" type="text/css" href="./resources/css/fullcalendar.print.css">
<link rel="stylesheet" type="text/css" href="./resources/css/datepicker.css">
<link rel="stylesheet" type="text/css" href="./resources/css/cmxform.css">
<script defer type="text/javascript" src="./resources/js/jquery.validate.min.js"></script>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>


<!-- 페이지 -->
<link rel="stylesheet" type="text/css" href="./resources/css/manage_common.css">
<link rel="stylesheet" type="text/css" href="./resources/css/manage_style.css">
<script defer="" src="./resources/js/manage_common.js"></script>
<script defer type="text/javascript" src="./resources/js/sign.js"></script>

<!-- 태그 추가 제거 -->
<script>
  $(document).ready(function () {
    $("#tag").hide();
    $('.tag_add').click(function(){
      $("#tag").slideToggle("normal");
    })

    var tag = {};
    var counter = 0;
    function addTag(value) {
      tag[counter] = value;
      counter++;
    }
    function marginTag() {
      return Object.values(tag)
        .filter(function (word) {
          return word !== "";
        });
    }
    $("#tag")
      .on("keyup", function (e) {
        var self = $(this);
        console.log("keypress");
        if (e.key === "Enter") {

          var tagValue = self.val(); // 값 가져오기

          // 값이 없으면 동작 안합니다.
          if (tagValue !== "") {

            // 같은 태그가 있는지 검사한다. 있다면 해당값이 array 로 return 된다.
            var result = Object.values(tag)
              .filter(function (word) {
                return word === tagValue;
              })

            // 태그 중복 검사
            if (result.length == 0) {
              $("#tag-list")
                .append("<li class='tag-item'>" + tagValue + "<span class='del-btn' idx='" + counter + "'>x</span></li>");
              addTag(tagValue);
              self.val("");
            } else {
              alert("태그값이 중복됩니다.");
            }
          }
          e.preventDefault(); // SpaceBar 시 빈공간이 생기지 않도록 방지
        }
      });

    // 삭제 버튼
    // 삭제 버튼은 비동기적 생성이므로 document 최초 생성시가 아닌 검색을 통해 이벤트를 구현시킨다.
    $(document)
      .on("click", ".del-btn", function (e) {
        var index = $(this)
          .attr("idx");
        tag[index] = "";
        $(this)
          .parent()
          .remove();
      });
    })
</script>
</head>

<body class="client">
<header id="header">
  <!-- HEADER s -->
  <div class="manage_header">
    <a class="logo" href="adm_member.php"><img src="./resources/img/logo.png" alt="세이피 로고"></a>
    <ul class="manage_header-btn">
      <li>2022-10-27</li>
      <li>이름</li>
      <li>Admin님</li>
      <li><a href="#">로그아웃</a></li>
    </ul>
  </div>
  <!-- HEADER e -->
</header>



<div class="row-fluid">
    <!-- SIDE MENU s -->
    <div class="manage_left-menu">
      <div class="sidebar-nav">
        <ul class="nav nav-tabs menu">
          <li class="on"><a href="adm_member.php">회원 관리</a></li>
          <li><a href="adm_manager_list.php">Admin 관리</a></li>
          <li><a href="adm_project_list.php">프로젝트 관리</a></li>
          <li><a href="adm_pay_list.php">멤버십 결제 관리</a></li>
          <li class="drop"><a href="#">리스트 관리</a>
            <ul class="sub">
              <li><a href="adm_check_list.php">체크리스트</a></li>
              <li><a href="adm_risk_list.php">위험성 평가표</a></li>
              <li><a href="adm_case_list.php">사고사례</a></li>
              <li><a href="adm_near_list.php">아차사고</a></li>
            </ul>
          </li>
          <li><a href="adm_cs_list.php">고객센터 관리</a></li>
          <li class="drop"><a href="#">컨텐츠 관리</a>
            <ul class="sub">
              <li><a href="adm_notice_list.php">공지사항 관리</a></li>
              <li><a href="adm_policy_list.php">정책 관리</a></li>
            </ul></li>
        </ul>

      </div>
    </div>
    <!-- SIDE MENU e -->