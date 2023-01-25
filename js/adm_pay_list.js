let PAGE_SIZE = 15;
let PAGE_NO = 1;

$(function() {
    init();
});

// 최초 실행
function init() {
    setList();

    $("#s_value").on("keyup",function(key){
        if(key.keyCode === 13) search();
    });
}

// 태이블 내용 만들기
function setList(pageNo = 0) {
    if(pageNo) PAGE_NO = pageNo;
    let data = getList();
    let result = ``;

    data.list = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
    data.count = 30;

    // TODO : 데이터 바인딩

    if(data.count > 0) {
        data.list.forEach(function(data,idx) {
            result += `
            <tr onclick="goDetail(1)">
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
            `;
        });

    }else {
        result += `
        <tr>
            <td colspan="11">결과가 존재하지 않습니다.</td>
        </tr>
        `;
    }

    $('#main_tbody').html(result);
    makePaging(Math.ceil(data.count / PAGE_SIZE), PAGE_NO, setList);
}

// 멤버십 결제 가져오기
function getList() {
    // TODO : 멤버십 결제 리스트 불러오기

    let result = {};

    // console.log($('#s_value').val());
    // console.log($('#s_type01').val());
    // console.log($('#s_type02').val());
    // console.log($('#s_type03').val());
    // console.log($('#datepicker1').val());
    // console.log($('#datepicker2').val());

    /*commonAjax(
        'GET',
        '/users?pageNo='+PAGE_NO+'&pageSize='+PAGE_SIZE,
        false,
        false,
        {},
        function(response) {
            console.log('response',response);
            result = response.data;
        },
        function(error) {
            console.log('error',error);
        });*/

    return result;
}

// N개월 버튼 클릭
function setSearchDate(month) {
    if(month >= 0) {
        $('#datepicker1').val(todaySubMonth(month));
        $('#datepicker2').val(getToday());
    }else {
        $('#datepicker1').val('');
        $('#datepicker2').val('');
    }
}

// 검색
function search() {
    PAGE_NO = 1;
    setList();
}

// 멤버십 결제 상세 페이지로 이동
function goDetail(pk) {
    location.href='main.html?menu=adm_pay_detail&pk='+pk;
}

// 멤버십 결제 요청 페이지로 이동
function goRequest() {
    location.href='main.html?menu=adm_pay_request';
}

// 엑셀 내보내기
function goExcel() {

}