let PAGE_SIZE = 15;
let PAGE_NO = 1;
let PK = 0;

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
    let img = ``;

    if(data.count > 0) {
        data.list.forEach(function (data) {
            result += `
            <tr>
                <td>${data.created_at.substring(0,10)}</td>
                <td>
                    <span class="ho_line pj_nm">${data.name}</span>
                </td>
                <td>${data.user_name}</td>
                <td>${getType(data.type)}</td>
                ${getStatus(data.status)}
                <!--<td><span class="st_cir wait">승인대기중</span></td>
                <td><span class="st_cir end">승인완료</span></td>
                <td><span class="st_cir recheck">재점검 요청</span></td>-->
                <td class="layer_btn">
                    <a href="#none" class="confirm">
                        <img src="../resources/img/icon/delete.png" alt="삭제ico" onclick="remove(${data.id},'${data.type}')">
                    </a>
                </td>
            </tr>
            `;
        });
    }else {
        result += `
        <tr>
            <td colspan="6">결과가 존재하지 않습니다.</td>
        </tr>
        `;
    }

    $('#main_tbody').html(result);
    makePaging(Math.ceil(data.count / PAGE_SIZE), PAGE_NO, setList);

}

// 리스트 가져오기
function getList() {
    PK = new URL(window.location.href).searchParams.get('pk');

    let result = {};
    let subUrl = '?pageNo='+PAGE_NO+'&pageSize='+PAGE_SIZE;
    subUrl += '&'+$('#s_type').val()+'='+$('#s_value').val();

    commonAjax(
        'GET',
        '/project/find/'+PK+'/doc/list'+subUrl,
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

// 리스트 페이지로 이동
function goList() {
    location.href='main.html?menu=adm_project_list';
}

// 삭제
function remove(pk,type) {
    modalConfirm('삭제하시겠습니까?','취소','삭제',function() {
        commonAjax(
            'DELETE',
            '/project/doc/remove/'+pk+'?docType='+type,
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

// 문서 구분 한글명
function getType(type) {
    let result = '';

    if(type === 'checkList') {
        result = '체크리스트';
    }else if(type === 'riskCheck') {
        result = '위험성 평가표';
    }else {
        result = '';
    }

    return result;
}

// 문서 현황 한글명
function getStatus(status) {
    let result = '';

    if(status === 'READY') {
        result = `<td><span class="st_cir ing">점검 요청</span></td>`;
    }else if(status === 'CHECK') {
        result = `<td><span class="st_cir ing">점검중</span></td>`;
    }else if(status === 'REVIEW') {
        result = `<td><span class="st_cir wait">검토 대기중</span></td>`;
    }else if(status === 'APPROVE') {
        result = `<td><span class="st_cir wait">승인 대기중</span></td>`;
    }else if(status === 'RECHECK') {
        result = `<td><span class="st_cir recheck">재점검 요청</span></td>`;
    }else if(status === 'APPROVE_COMPLETE') {
        result = `<td><span class="st_cir end">승인 완료</span></td>`;
    }else {
        result = `<td></td>`;
    }

    return result;
}