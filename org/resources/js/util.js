// 공통

function back_page(page){
	location.href="/manage"+page;
}

// 다이어리 & 미디어

function check_diary(){
	
	//var check_flag = true;
	
	var title = $("#diary_title").val();
	var contents = $("#diary_contents").val();
	var photo = $("#diary_photo").val();
	
	if(title==""){
		
		//check_flag = false;
		
		alert("제목을 입력해 주세요");
		$("#diary_title").focus();
		
		return false;
	}
	
	if(contents==""){
		
		//check_flag = false;
		
		alert("내용을 입력해 주세요");
		$("#diary_contents").focus();
		
		return false;
	}
	
	$("#frm_add_diary").submit();
}

function check_media(){
	
	//var check_flag = true;
	
	var title = $("#diary_title").val();
	var contents = $("#diary_contents").val();
	var media = $("#diary_media").val();
	
	if(title==""){
		
		//check_flag = false;
		
		alert("제목을 입력해 주세요");
		$("#diary_title").focus();
		
		return false;
	}
	
	if(contents==""){
		
		//check_flag = false;
		
		alert("내용을 입력해 주세요");
		$("#diary_contents").focus();
		
		return false;
	}
	
	if(media==""){
		
		//check_flag = false;
		
		alert("미디어를 등록해 주세요");
		$("#diary_media").focus();
		
		return false;
	}
	
	$("#frm_add_diary").submit();
}

function delete_diary(no){
	
	 $("#board_no").val(no);
	 $("#delete_form").submit();
	
}

// 상품등록

function check_product(){
	
	//var check_flag = true;
	
	var name = $("#product_name").val();
	var contents = $("#product_contents").val();
	var photo = $("#product_photo").val();
	
	if(name==""){
		
		//check_flag = false;
		
		alert("제목을 입력해 주세요");
		$("#product_name").focus();
		
		return false;
	}
	
	if(contents==""){
		
		//check_flag = false;
		
		alert("내용을 입력해 주세요");
		$("#product_contents").focus();
		
		return false;
	}
	
	if(photo==""){
		
		//check_flag = false;
		
		//alert("미디어를 등록해 주세요");
		//$("#product_photo").focus();
		
		//return false;
	}
	
	$("#frm_add_product").submit();
}

function delete_product(no){
	
	 $("#product_no").val(no);
	 $("#delete_form").submit();
	
}