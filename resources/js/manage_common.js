let dropFile;

$(document).ready(function(){
    setTimeout(function() {
        /* 왼쪽메뉴 : sidebar-nav s */
        // $(".sidebar-nav ul.sub").hide();
        $(".sidebar-nav ul.menu li").click(function(){
            $("ul",this).slideToggle("fast");

            if ($("a",this).hasClass('active')) {
                $("a",this).removeClass('active');
            } else {
                $("a",this).addClass('active');
            }
        });

        /* textarea 글자 수 제한 */
        $('#text_word').on('keyup', function() {
            $('#text_cnt').html("("+$(this).val().length+" / 500)");

            if($(this).val().length > 500) {
                $(this).val($(this).val().substring(0, 500));
                $('#text_cnt').html("(500 / 500)");
            }
        });

        /* datepicker */
        $('#datepicker1, #datepicker2, #datepicker3, #datepicker4').datepicker({
            dateFormat: 'yy-mm-dd' //달력 날짜 형태
            ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
            ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시
            ,buttonImage: "../resources/img/icon/calendar.png" //버튼 이미지 경로
            ,buttonImageOnly: true //버튼 이미지만 깔끔하게 보이게함
            ,buttonText: "선택" //버튼 호버 텍스트
            ,monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 텍스트
            ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip
            ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 텍스트
        });

        /* layer popup */
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
        $('.project_info').click(function() {
            $('#project_info').show();
            $("body").addClass('notScroll');
            return false;
        });
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
            $('.layerpop').fadeOut();
            $("body").removeClass('notScroll');
            return false;
        });

        setOneFileChange();

        dropFile = new DropFile("drop-file", "files");
    },100);
});

$(window).scroll(function () {
    if (window.pageYOffset === 0) {
        $(".header").removeClass("fix");
    } else {
        $(".header").addClass("fix");
    };
});

//자동 높이 조절
function resize(obj) {
    obj.style.height = "1px";
    obj.style.height = (12+obj.scrollHeight)+"px";
}

/* toggle slide s */
$('.view').show();
$(document).on("click", ".toggle_btn", function () {
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

//이중 팝업 열기
function openModal(modalname) {
    document.get
    $("#" + modalname).fadeIn(300);
}

// 이중 팝업 닫기
$('.layerpop .close2').click(function() {
    $('.pop2').fadeOut(300);
});

/* 주소 API s */
function setKakaoMap() {
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
        if(number > 1) number = parseInt(number) - 1;
    }
    // 결과 출력
    resultElement.innerText = number;
}

/* 이미지 업로드 - 단일 (첨부파일) s */
function DropFile(dropAreaId) {
    let dropArea = document.getElementById(dropAreaId);

    function handleFiles(files) {
        files = [...files];
        files.forEach(previewFile);
    }
    function previewFile(file) {
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

/* 이미지 다중 업로드시 미리보기 s */
function setMultiImageViewEvent() {
    let attZone = document.getElementById('att_zone');
    let btnAtt = document.getElementById('btnAtt')
    let sel_files = [];

    // 이미지와 체크 박스를 감싸고 있는 div 속성
    let div_style = 'position: relative;display: inline-flex;justify-content: center;align-items: center;width: 33%;aspect-ratio: 16 / 9; border:1px solid #ddd;margin-right: 10px;padding:10px';
    // 미리보기 이미지 속성
    let img_style = 'max-height:100%';
    // 이미지안에 표시되는 체크박스의 속성
    let chk_style = 'width: 20px;height: 20px;position: absolute;font-size: 12px;right: 5px;top: 5px;z-index: 999;border: 1px solid #999;border-radius: 50px;background-color: rgba(255,255,255,0.1);color: #999;cursor:pointer';

    btnAtt.onchange = function(e){
        let files = e.target.files;
        let fileArr = Array.prototype.slice.call(files)
        for(let f of fileArr){
            imageLoader(f);
        }
    }

    /*첨부된 이미지들을 배열에 넣고 미리보기 */
    const imageLoader = function(file){
        sel_files.push(file);
        let reader = new FileReader();

        reader.onload = function(ee){
            let img = document.createElement('img')
            img.setAttribute('style', img_style)
            img.src = ee.target.result;
            attZone.appendChild(makeDiv(img, file));
        }

        reader.readAsDataURL(file);
    }

    /*첨부된 파일이 있는 경우 checkbox와 함께 attZone에 추가할 div를 만들어 반환 */
    const makeDiv = function(img, file){
        let div = document.createElement('div')
        div.setAttribute('style', div_style)

        let btn = document.createElement('input')
        btn.setAttribute('type', 'button')
        btn.setAttribute('value', 'x')
        btn.setAttribute('delFile', file.name);
        btn.setAttribute('style', chk_style);
        btn.onclick = function(ev){
            let ele = ev.srcElement;
            let delFile = ele.getAttribute('delFile');

            for(let i=0 ;i<sel_files.length; i++){
                if(delFile === sel_files[i].name){
                    sel_files.splice(i, 1);
                }
            }

            let dt = new DataTransfer();
            for(let f in sel_files) {
                let file = sel_files[f];
                dt.items.add(file);
            }

            btnAtt.files = dt.files;
            let p = ele.parentNode;
            attZone.removeChild(p)
        }

        div.appendChild(img)
        div.appendChild(btn)
        return div;
    }

    // 탐색기에서 드래그앤 드롭 사용
    attZone.addEventListener('dragenter', function(e){
        e.preventDefault();
        e.stopPropagation();
    }, false);

    attZone.addEventListener('dragover', function(e){
        e.preventDefault();
        e.stopPropagation();
    }, false);

    attZone.addEventListener('drop', function(e){
        let files = {};
        e.preventDefault();
        e.stopPropagation();
        let dt = e.dataTransfer;
        files = dt.files;
        for(let f of files){
            imageLoader(f);
        }
    }, false);
}

// 이미지 추가 버튼 클릭
function fileUploadAction() {
    $("#btnAtt").trigger('click');
}

// 파일 하나 선택하면 input에 파일 이름 넣어주기
function setOneFileChange() {
    $("#file").on('change',function(){
        $(".upload-name").val($("#file").val());
    });
}

/* 다중 select-box s */
function categorChange(e) {
    var declare = ["신고"];
    var inquiry = ["멤버십", "결제", "프로젝트", "체크리스트", "위험성평가", "사고사례", "아차사고", "대시보드", "회원가입", "기타"];
    var propose = ["대시보드", "프로젝트", "체크리스트", "위험성평가", "사고사례", "아차사고", "멤버십", "기타"];
    var target = document.getElementById("service");

    if (e.value == "declare") var d = declare;
    else if (e.value == "inquiry") var d = inquiry;
    else if (e.value == "propose") var d = propose;

    target.options.length = 0;

    for (x in d) {
        var opt = document.createElement("option");
        opt.value = d[x];
        opt.innerHTML = d[x];
        target.appendChild(opt);
    }
}

/* 카카오 주소 S */
/*window.onload = function(){
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
}*/
/* 카카오 주소 E */


