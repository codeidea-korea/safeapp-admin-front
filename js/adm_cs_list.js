let PAGE_SIZE = 10;
let PAGE_NO = 1;

$(function() {
    init();
});

// 최초 실행
function init() {
    setList();
}

// 태이블 내용 만들기
function setList(pageNo = 0) {
    if(pageNo) PAGE_NO = pageNo;
    let data = getList();
    let result = `<tr><td colspan="8">결과가 존재하지 않습니다.</td></tr>`;

    if(data.count > 0) {
        result = ``;
        count = data.count - PAGE_SIZE  * (PAGE_NO - 1);

        data.list.forEach(function(data,idx) {
            const legUser = data.inquiry_user ? data.inquiry_user.user_name : data.inquiry_admin.admin_name;
            const title = data.attachment ? `<span class="ho_line pj_nm list_ico list-link">${data.title}</span>` : `${data.title}`;

            result += `
            <tr>
                <td>${count - idx}</td>
                <td>${getInquiryType(data.inquiry_type)}</td>
                <td>${getServiceType(data.service_type)}</td>
                <td onclick="goDetail(${data.id})">${title}</td>
                <td>${legUser}</td>
                <td>${data.is_answer === 'Y' ? '완료' : '미완료'}</td>
                <td>${data.created_at.substring(0,10)}</td>
                <td class="layer_btn">
                    <a href="javascript:;" class="confirm">
                        <img onclick="showModal(${data.id})" src="./resources/img/icon/delete.png" alt="삭제ico">
                    </a>
                </td>
            </tr>
            `;
        });
    }

    $('#main_tbody').html(result);
    makePaging(Math.ceil(data.count / PAGE_SIZE), PAGE_NO, setList);
}

// 리스트 가져오기
function getList() {
    let result = {};

    commonAjax(
        'GET',
        '/board/inquiry/list?isAnswer='+$('#search_type').val(),
        false,
        false,
        {},
        function(response) {
            result['count'] = response.data.count;
            result['list'] = response.data.list;
        },
        function(response) {

        });

    return result;
}

// 검색
function search() {
    PAGE_NO = 1;
    setList();
}

// 유형 한글명
function getInquiryType(value) {
    if(value === 'REPORT') {
        return '신고';
    }else if(value === 'QUESTION') {
        return '문의';
    }else if(value === 'PROPOSAL') {
        return '제안';
    }
}

// 서비스 한글명
function getServiceType(value) {
    if(value === 'REPORT') {
        return '신고';
    }else if(value === 'MEMBERSHIP') {
        return '멤버십';
    }else if(value === 'PAYMENT') {
        return '결제';
    }else if(value === 'PROJECT') {
        return '프로젝트';
    }else if(value === 'CHECKLIST') {
        return '체크리스트';
    }else if(value === 'RISKCHECK') {
        return '위험성평가';
    }else if(value === 'ACCIDENT') {
        return '사고사례';
    }else if(value === 'CONCERN_ACCIDENT') {
        return '아차사고';
    }else if(value === 'DASHBOARD') {
        return '대시보드';
    }else if(value === 'REGISTER') {
        return '회원가입';
    }else if(value === 'ETC') {
        return '기타';
    }else {
        return value;
    }
}

// 등록 페이지로 이동
function goWrite() {
    location.href='main.html?menu=adm_inquiry_write';
}

// 문의 상세 페이지로 이동
function goDetail(pk) {
    location.href='main.html?menu=adm_inquiry_detail&pk='+pk;
}

// 삭제
function showModal(pk) {
    modalConfirm('문의를 삭제하시겠습니까?','취소','삭제',function() {
        commonAjax(
            'DELETE',
            '/board/inquiry/remove/'+pk,
            false,
            false,
            {},
            function(response) {
                modalAlert('삭제되었습니다.',search);
            },
            function(response) {

            });
    });
}