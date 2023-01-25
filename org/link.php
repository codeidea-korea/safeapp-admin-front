<!DOCTYPE html>
<html lang="ko">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1" />
	<link href="https://design01.codeidea.io/link_shortcut.svg" rel="shortcut icon">
	<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js"></script>

	<link rel="stylesheet" href="./dist/css/app.css" />
	<link rel="stylesheet" href="./pub/css/reset.css" />
	<link rel="stylesheet" href="./dist/css/custom.css" />
	<link href="https://design01.codeidea.io/link_style.css" rel="stylesheet">
	<script type="text/javascript" src="./pub/js/jquery.min.js"></script>
	<title>
		Life-Semanitcs
	</title>
</head>

<body>

	<div class="publishing-help">
		<span class="title">Life-Semanitcs</span>
		<span class="label not">작업중</span>
		<span class="label popup">팝업</span>
		<span class="label change">수정</span>
		<span class="label add">최근 추가</span>
		<span class="tag-repeat">중복</span>
		<label class="toggle-light ml100"><input type="checkbox" name="" value="1" class="modal-list-toggle" checked /><span></span><span class="labelOn">팝업 열림</span><span class="labelOff">팝업 가림</span></label>
	</div>

	<?php
	function txtRecord($dir)
	{
		if (is_dir($dir)) {
			$handle  = opendir($dir);
			$files = array();
			while (false !== ($filename = readdir($handle))) {
				if ($filename == "." || $filename == "..") continue;
				if (is_file($dir . "/" . $filename)) {
					$files[] = $filename;
				}
			}
			closedir($handle);
			rsort($files);
			if (count($files) > 0) {
				echo '<div class="_record rsort">';
				echo '<ul>';
				foreach ($files as $f) {
					$name = '수정 ' . preg_replace("/[^0-9]*/s", "", $f);
					echo '<li><a href="' . $dir . $f . '" target="_black">' . $name . '</a></li>';
				}
				echo '</ul>';
				echo '</div>';
			}
		}
	}
	echo txtRecord('./@record/');
	?>
	<div id="publishingContainer">
		<ul class="page-link">
			<li class="" data-label="회원관리-main">
				<ul>
					<li class="sub"><a href="adm_member.php" target="_blank">회원관리</a></li>
					<li class="sub"><a href="adm_member_adj.php" target="_blank">회원정보/수정</a></li>
					<li class="sub"><a href="adm_member_project.php" target="_blank">프로젝트 목록</a></li>
					<li class="sub"><a href="adm_member_regist.php" target="_blank">회원등록</a></li>
				</ul>
			</li>
			<li class="mt50" data-label ="로그인/비밀번호">
				<ul>
					<li class="sub"><a href="adm_login.php" target="_blank">로그인</a></li>
					<li class="sub"><a href="adm_lost_info.php" target="_blank">이메일/비밀번호 찾기</a></li>
					<li class="sub"><a href="adm_find_email.php" target="_blank">이메일 있을경우</a></li>
					<li class="sub"><a href="adm_none_email.php" target="_blank">이메일 없을경우</a></li>
					<li class="sub"><a href="adm_pw_reset.php" target="_blank">새 비밀번호 입력</a></li>
				</ul>
			</li>
			<li class="mt50" data-label ="관리자 관리">
				<ul>
					<li class="sub"><a href="adm_manager_list.php" target="_blank">관리자 목록</a></li>
					<li class="sub"><a href="adm_manager_adj.php" target="_blank">관리자정보 수정</a></li>
					<li class="sub"><a href="adm_manager_regist.php" target="_blank">관리자 등록</a></li>
				</ul> 
			</li>
			<li class="mt50" data-label ="프로젝트 관리">
				<ul>
					<li class="sub"><a href="adm_project_list.php" target="_blank">프로젝트 목록</a></li>
					<li class="sub"><a href="adm_project_document.php" target="_blank">프로젝트 문서</a></li>
				</ul>
			</li>
			<li class="mt50" data-label ="멤버십 결제 관리">
				<ul>
					<li class="sub"><a href="adm_pay_list.php" target="_blank">멤버십 결제 목록</a></li>
					<li class="sub"><a href="adm_pay_detail.php" target="_blank">멤버십 결제 상세</a></li>
					<li class="sub"><a href="adm_pay_adj.php" target="_blank">멤버십 결제 수정/해지</a></li>
					<li class="sub"><a href="adm_pay_request.php" target="_blank">멤버십 결제 요청</a></li>
				</ul>
			</li>
			<li class="mt50" data-label ="리스트 관리">
				<ul>
					<li class="sub"><a href="adm_check_list.php" target="_blank">체크리스트 목록</a></li>
					<li class="sub"><a href="adm_check_contents.php" target="_blank" class="label">체크리스트 템플릿</a></li>
					<li class="sub"><a href="adm_check_adj.php" target="_blank">체크리스트 편집 (작업 완료)</a></li>
					<li class="sub"><a href="adm_check_write.php" target="_blank">체크리스트 작성</a></li>
					<li class="sub mt50"><a href="adm_risk_list.php" target="_blank">위험성평가표 목록</a></li>
					<li class="sub"><a href="adm_risk_contents.php" target="_blank" class="label">위험성평가표 템플릿</a></li>
					<li class="sub"><a href="adm_risk_adj.php" target="_blank">위험성평가표 편집</a></li>
					<li class="sub"><a href="adm_risk_write.php" target="_blank">위험성평가표 작성</a></li>
					<li class="sub mt50"><a href="adm_case_list.php" target="_blank">사고사례 목록</a></li>
					<li class="sub"><a href="adm_case_detail.php" target="_blank">사고사례 상세</a></li>
					<li class="sub"><a href="adm_case_adj.php" target="_blank">사고사례 수정</a></li>
					<li class="sub"><a href="adm_case_write.php" target="_blank">사고사례 작성</a></li>
					<li class="sub mt50"><a href="adm_near_list.php" target="_blank">아차사고 목록</a></li>
					<li class="sub"><a href="adm_near_detail.php" target="_blank">아차사고 상세</a></li>
					<li class="sub"><a href="adm_near_adj.php" target="_blank">아차사고 수정</a></li>
					<li class="sub"><a href="adm_near_write.php" target="_blank">아차사고 작성</a></li>
					<li class="sub"><a href="adm_near_dec_list.php" target="_blank">아차사고 신고목록</a></li>
				</ul>
			</li>
			<li class="mt50" data-label ="고객센터 관리">
				<ul>
					<li class="sub"><a href="adm_cs_list.php" target="_blank">고객센터 목록</a></li>
					<li class="sub"><a href="adm_inquiry_write.php" target="_blank">1:1문의 작성</a></li>
					<li class="sub"><a href="adm_inquiry_detail.php" target="_blank">1:1문의 상세</a></li>
					<li class="sub"><a href="adm_inquiry_answer.php" target="_blank">1:1문의 답변</a></li>
				</ul>
			</li>
			<li class="mt50" data-label ="컨텐츠 관리">
				<ul>
					<li class="sub"><a href="adm_notice_list.php" target="_blank">공지사항 목록</a></li>
					<li class="sub"><a href="adm_notice_detail.php" target="_blank">공지사항 상세</a></li>
					<li class="sub"><a href="adm_notice_adj.php" target="_blank">공지사항 수정</a></li>
					<li class="sub"><a href="adm_notice_write.php" target="_blank">공지사항 작성</a></li>
					<li class="sub mt50"><a href="adm_policy_list.php" target="_blank">정책 목록</a></li>
					<li class="sub"><a href="adm_policy_detail.php" target="_blank">정책 상세</a></li>
					<li class="sub"><a href="adm_policy_adj.php" target="_blank">정책 수정</a></li>
				</ul>
			</li>
		</ul>
	</div>




	<?php
	//modal 팝업
	include_once('_modal_pop.php');
	?>

	<script type="text/javascript" src="./dist/js/app.js"></script>
	<script src="./dist/js/ckeditor-classic.js"></script>

	<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
	<script src='https://design01.codeidea.io/link_script.js'></script>
	<script>
		$('.modal-list-toggle').change(function() {
			var checked = $(this).is(":checked");
			if (checked) {
				$('.ul-pop').slideDown(400);
			} else {
				$('.ul-pop').slideUp(400);
			}
		});

	</script>
	<script type="text/javascript" src="pub/js/bootstrap-datepicker/bootstrap-datepicker.js"></script>
	<script type="text/javascript" src="pub/js/bootstrap-datepicker/bootstrap-datepicker.ko.min.js"></script>

</body>

</html>