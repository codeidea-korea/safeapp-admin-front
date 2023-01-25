/** 커스터마이징 해서 사용해야 할듯 */

let prtContent; // 프린트 하고 싶은 영역
let initBody;  // body 내용 원본

// 프린트하고 싶은 영역의 id 값을 통해 출력 시작
function startPrint (div_id) {
    prtContent = document.getElementById(div_id);
    window.onbeforeprint = beforePrint;
    window.onafterprint = afterPrint;
    window.print();
}

// 웹페이지 body 내용을 프린트하고 싶은 내용으로 교체
function beforePrint(){
    initBody = document.body.innerHTML;
    document.body.innerHTML = prtContent.innerHTML;
    $('.tit_box .tit').remove();
    $('.pop_btn').remove();
}

// 프린트 후, 웹페이지 body 복구
function afterPrint(){
    document.body.innerHTML = initBody;
}