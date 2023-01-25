/* 왼쪽메뉴 : sidebar-nav s */
$(document).ready(function(){
	$(".sidebar-nav ul.sub").hide();
	$(".sidebar-nav ul.menu li").click(function(){
		$("ul",this).slideToggle("fast");

		if ($("a",this).hasClass('active')) {
			$("a",this).removeClass('active');
		} else {
			$("a",this).addClass('active');
		}
	});

});
/* 왼쪽메뉴 : sidebar-nav e */




/* textarea s */
	// 글자수 제한
$(document).ready(function() {
	$('#text_word').on('keyup', function() {
			$('#text_cnt').html("("+$(this).val().length+" / 500)");

			if($(this).val().length > 500) {
					$(this).val($(this).val().substring(0, 500));
					$('#text_cnt').html("(500 / 500)");
			}
	});
});
 //자동 높이 조절
function resize(obj) {
  obj.style.height = "1px";
  obj.style.height = (12+obj.scrollHeight)+"px";
}
/* textarea e */



/* datepicker s */
$(function(){
		$('#datepicker1,#datepicker2').datepicker({
		dateFormat: 'yy.mm.dd' //달력 날짜 형태
	,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
	,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
	,buttonImage: "././resources/img/icon/calendar.png" //버튼 이미지 경로
	,buttonImageOnly: true //버튼 이미지만 깔끔하게 보이게함
	,buttonText: "선택" //버튼 호버 텍스트              

	,monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 텍스트
	,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip
	,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 텍스트
		});
});
/* datepicker s */


  $('.join_agree_btn1').click(function() {
        $('.join_agree1').show();
        $("body").addClass('notScroll');
        return false;
    });
    $('.join_agree_btn2').click(function() {
        $('.join_agree2').show();
        $("body").addClass('notScroll');
        return false;
    });
    $('.join_agree_btn3').click(function() {
        $('.join_agree3').show();
        $("body").addClass('notScroll');
        return false;
    });
    $('.dim_close').click(function() {
         $('.dim_layer').fadeOut();
         $("body").removeClass('notScroll');
         return false;
    });


    $('.seller_submit').on('click', function(){
        $('.modal_back').addClass('active');

        $('#mem_phone').val('');
    	  $('#member_tel').val('');
    	  $('#certify_code').val('');
        
        
      })
      $('.close_btn > button').on('click', function(){
        $('.modal_back').removeClass('active');
      });
    








/* toggle slide s */
$('.view').show();
$('.toggle_btn').click(function(){
  if($(this).hasClass('toggle')){
    $(this).parent().next('.view').slideDown();
    $(this).removeClass('toggle');
  }else{
    $(this).parent().next('.view').slideUp();
    $(this).addClass('toggle');
  } 
});
/* toggle slide e */

$('.like_ico').click(function(){
  if($(this).hasClass('on')){
    $(this).removeClass('on');
  }else{
    $(this).addClass('on');
  } 
});


/* layer popup s */
$(document).ready(function () {
  $('.layer_btn a').click(function (e) {
      e.preventDefault();
      var cls = $(this).attr('class');
      $("#" + cls).fadeIn();

      $('body').addClass('noneScroll');
  });

  $('.layerpop .close').click(function () {
      $('.layerpop').fadeOut();
      $('body').removeClass('noneScroll');
  });
});

	//이중 팝업 열기
	function openModal(modalname) {
		document.get
		$("#" + modalname).fadeIn(300);
	}
	// 이중 팝업 닫기
	$('.layerpop .close2').click(function() {
		$('.pop2').fadeOut(300);
	});
/* layer popup e */



/* 주소 API s */
window.onload = function(){
	document.getElementById("address_kakao").addEventListener("click", function(){ //주소입력칸을 클릭하면
		//카카오 지도 발생
		new daum.Postcode({
			oncomplete: function(data) { //선택시 입력값 세팅
					document.getElementById("address_kakao").value = data.address; // 주소 넣기
					document.querySelector("input[name=address_detail]").focus(); //상세입력 포커싱
			}
		}).open();
	});
}
/* 주소 API e */



/* 버튼 클릭 숫자 증감 s */
function count(type)  {
  // 결과를 표시할 element
  const resultElement = document.getElementById('result');
  // 현재 화면에 표시된 값
  let number = resultElement.innerText;
  // 더하기/빼기
  if(type === 'plus') {
    number = parseInt(number) + 1;
  }else if(type === 'minus')  {
    number = parseInt(number) - 1;
  }
  // 결과 출력
  resultElement.innerText = number;
}
/* 버튼 클릭 숫자 증감 e */



/* 이미지 업로드 - 단일 (첨부파일) s */
function DropFile(dropAreaId) {
  let dropArea = document.getElementById(dropAreaId);

  function handleFiles(files) {
    files = [...files];
    files.forEach(previewFile);
  }
  function previewFile(file) {
    console.log(file);
    renderFile(file);
  }
  function renderFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      let img = dropArea.getElementsByClassName("preview")[0];
      img.src = reader.result;
      img.style.display = "block";
    };
  }
  return {
    handleFiles
  };
}
const dropFile = new DropFile("drop-file", "files");
/* 이미지 업로드 e */



/* 이미지 다중 업로드 s */
( /* att_zone : 이미지들이 들어갈 위치 id, btn : file tag id */
  imageView = function imageView(att_zone, btn){

    var attZone = document.getElementById(att_zone);
    var btnAtt = document.getElementById(btn)
    var sel_files = [];
    
    // 이미지와 체크 박스를 감싸고 있는 div 속성
    var div_style = 'position: relative;display: inline-flex;justify-content: center;align-items: center;width: 33%;aspect-ratio: 16 / 9; border:1px solid #ddd;margin-right: 10px;padding:10px';
    // 미리보기 이미지 속성
    var img_style = 'max-height:100%';
    // 이미지안에 표시되는 체크박스의 속성
    var chk_style = 'width: 20px;height: 20px;position: absolute;font-size: 12px;right: 5px;top: 5px;z-index: 999;border: 1px solid #999;border-radius: 50px;background-color: rgba(255,255,255,0.1);color: #999;cursor:pointer';
  
    btnAtt.onchange = function(e){
      var files = e.target.files;
      var fileArr = Array.prototype.slice.call(files)
      for(f of fileArr){
        imageLoader(f);
      }
    }  
    
  
    // 탐색기에서 드래그앤 드롭 사용
    attZone.addEventListener('dragenter', function(e){
      e.preventDefault();
      e.stopPropagation();
    }, false)
    
    attZone.addEventListener('dragover', function(e){
      e.preventDefault();
      e.stopPropagation();
      
    }, false)
  
    attZone.addEventListener('drop', function(e){
      var files = {};
      e.preventDefault();
      e.stopPropagation();
      var dt = e.dataTransfer;
      files = dt.files;
      for(f of files){
        imageLoader(f);
      }
      
    }, false)
    

    
    /*첨부된 이미리즐을 배열에 넣고 미리보기 */
    imageLoader = function(file){
      sel_files.push(file);
      var reader = new FileReader();
      reader.onload = function(ee){
        let img = document.createElement('img')
        img.setAttribute('style', img_style)
        img.src = ee.target.result;
        attZone.appendChild(makeDiv(img, file));
      }
      
      reader.readAsDataURL(file);
    }
    
    /*첨부된 파일이 있는 경우 checkbox와 함께 attZone에 추가할 div를 만들어 반환 */
    makeDiv = function(img, file){
      var div = document.createElement('div')
      div.setAttribute('style', div_style)
      
      var btn = document.createElement('input')
      btn.setAttribute('type', 'button')
      btn.setAttribute('value', 'x')
      btn.setAttribute('delFile', file.name);
      btn.setAttribute('style', chk_style);
      btn.onclick = function(ev){
        var ele = ev.srcElement;
        var delFile = ele.getAttribute('delFile');
        for(var i=0 ;i<sel_files.length; i++){
          if(delFile== sel_files[i].name){
            sel_files.splice(i, 1);      
          }
        }
        
        dt = new DataTransfer();
        for(f in sel_files) {
          var file = sel_files[f];
          dt.items.add(file);
        }
        btnAtt.files = dt.files;
        var p = ele.parentNode;
        attZone.removeChild(p)
      }
      div.appendChild(img)
      div.appendChild(btn)
      return div
    }
  }
)('att_zone', 'btnAtt')

function fileUploadAction() {
    console.log("fileUploadAction");
    $("#btnAtt").trigger('click');
}
/* 이미지 업로드 - 다중 (첨부파일) e */



/* 첨부파일 s */
$("#file").on('change',function(){
  var fileName = $("#file").val();
  $(".upload-name").val(fileName);
});
/* 첨부파일 e */



/* 태그 추가 제거 s */
$(document).ready(function () {

    var tag = {};
    var counter = 0;

    // 태그를 추가한다.
    function addTag(value) {
      tag[counter] = value; // 태그를 Object 안에 추가
      counter++; // counter 증가 삭제를 위한 del-btn 의 고유 id 가 된다.
    }

    // 최종적으로 서버에 넘길때 tag 안에 있는 값을 array type 으로 만들어서 넘긴다.
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

        // input 에 focus 되있을 때 엔터 입력시 구동
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
/* 태그 추가 제거 e */


