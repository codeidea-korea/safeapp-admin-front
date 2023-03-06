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

// 테이블 내용 셋팅
function setTableList() {
    let resultObj = {};

    const data = getList();
    let result = `<tr><td colspan="10">결과가 존재하지 않습니다</td></tr>`;
    let count = 0;
    let totalAmount = 0;

    if(data.count > 0) {
        result = ``;
        count = data.count;
        totalAmount = data.list[0].totalAmount;
        data.list.forEach(function(data,idx) {
            result += `
            <tr onclick="goDetail(${data.id})">
                <td>${data.merchant_uid ? data.merchant_uid : ''}</td>
                <td>${data.user_id ? data.user_id : ''}</td>
                <td>${data.user_name ? data.user_name : ''}</td>
                <td>${data.phone_no ? data.phone_no : '' + ' '}</td>
                <td>${getOrderType(data.order_type)}</td>
                <td>${getUserStatus(data.auth_status)}</td>
                <td>${data.efective_start_at.substring(0,10)} ~ ${data.efective_end_at.substring(0,10)}</td>
                <td>${data.created_at.substring(0,10)}</td>
                <td>${data.amount ? setMoneyComma(data.amount)+' 원' : '0 원'}</td>
                <td>${getPayMethod(data.pay_method)}</td>
                <td>${getPayStatus(data.pay_status)}</td>
            </tr>
            `;
        });
    }

    resultObj.count = count;
    resultObj.result = result;
    resultObj.totalAmount = totalAmount;

    return resultObj;
}

// 태이블 내용 만들기
function setList(pageNo = 0) {
    if(pageNo) PAGE_NO = pageNo;

    let resultObj = setTableList();

    $('#main_tbody').html(resultObj.result);
    makePaging(Math.ceil(resultObj.count / PAGE_SIZE), PAGE_NO, setList);

    $('#total_amount').html(`${setMoneyComma(resultObj.totalAmount)} 원`);
}

// 멤버십 결제 가져오기
function getList() {
    let result = {};
    let url = '/membership/list?pageNo='+PAGE_NO+'&pageSize='+PAGE_SIZE;

    const sValue = $('#s_value').val();
    const orderType = $('#s_type02').val();
    const status = $('#s_type03').val();
    const createdAtStart = $('#datepicker1').val();
    const createdAtEnd = $('#datepicker2').val();

    url += sValue ? '&'+$('#s_type01').val()+'='+sValue : '';   // 이름 검색
    url += orderType ? '&orderType='+orderType : '';    // 멤버십 유형
    url += status ? '&status='+status : ''; // 멤버십 상태
    url += createdAtStart ? '&createdAtStart='+createdAtStart : '';  // 결제일(시작)

    // createdAtEnd는 +1일 해서 보내라고 전달받음
    if(createdAtEnd) {
        const date = new Date(createdAtEnd);
        date.setDate(date.getDate() + 1);
        url += '&createdAtEnd='+changeDateFormat(date); // 결제일(종료)
    }

    commonAjax(
        'GET',
        url,
        false,
        false,
        {},
        function(response) {
            result['count'] = response.data.count;
            result['list'] = response.data.list;
        },
        function(error) {

        });

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
    modalAlert('준비중입니다.');
    // location.href='main.html?menu=adm_pay_request';
}

// 엑셀 내보내기
function goExcel() {
    let orgPageNo = PAGE_NO;
    let orgPageSize = PAGE_SIZE;
    PAGE_NO = 1;
    PAGE_SIZE = 9999999;

    let tbody = setTableList().result;
    let table = `
    <table class="table mt25" id="temp_table">
        <thead>
        <tr style="text-align:center !important;">
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
        <tbody id="main_tbody" style="text-align: center !important;">${tbody}</tbody>
    </table>
    `;

    $('body').append(table);

    const excelHandler = {
        getExcelFileName : function(){
            return 'table_asdf.xlsx';
        },
        getSheetName : function(){
            return 'test-1';
        },
        getExcelData : function(){
            return document.getElementById('temp_table');
        },
        getWorksheet : function(){
            return XLSX.utils.table_to_sheet(this.getExcelData(), {raw:true});
        }
    }

    // step 1. workbook 생성
    let wb = XLSX.utils.book_new();

    // step 2. 시트 만들기
    let newWorksheet = excelHandler.getWorksheet();

    newWorksheet["!cols"] = [
        {width: 30},
        {width: 20},
        {width: 15},
        {width: 15},
        {width: 15},
        {width: 15},
        {width: 25},
        {width: 15},
        {width: 15},
        {width: 15},
        {width: 15}
    ];

    // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.
    XLSX.utils.book_append_sheet(wb, newWorksheet, excelHandler.getSheetName());

    // step 4. 엑셀 파일 만들기
    let wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

    // step 5. 엑셀 파일 내보내기
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), excelHandler.getExcelFileName());

    $('#temp_table').remove();
    PAGE_NO = orgPageNo;
    PAGE_SIZE = orgPageSize;
}

function s2ab(s) {
    let buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    let view = new Uint8Array(buf);  //create uint8array as viewer
    for (let i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}