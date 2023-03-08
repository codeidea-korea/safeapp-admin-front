let PAGE_SIZE = 5;
let PAGE_NO = 1;

$(function() {
    init();
});

// 최초 실행
function init() {
    setList();

    $("#s_value, #s_type_value").on("keyup",function(key){
        if(key.keyCode === 13) search();
    });
}

// 태이블 내용 만들기
function setList(pageNo = 0) {
    if(pageNo) PAGE_NO = pageNo;

    const data = getList();
    let result = `<ul class="board tac"><li class="th_100 tac">결과가 존재하지 않습니다.</li></ul>`;

    if(data.count > 0) {
        let visibled = ``;
        let contents = ``;
        result = ``

        data.list.forEach(function(data) {
            visibled = data?.visibled !== 'Y' ? `<img src="./resources/img/icon/lock.png" alt="비공개 아이콘">` : ``;

            if(data?.contents && data?.contents?.length > 0) {
                contents = ``;

                data.contents.forEach(function(content) {
                    if(content) contents += `- ` + content + `<br/>`;
                });
            }

            result += `
            <ul class="board">
                <li class="th_5 tac">
                    <input type="checkbox" class="main_ul_checkbox" value="${data.id}">
                </li>
                <li class="th_70">
                    <table class="board_list">
                        <caption>번호, 구분, 제목, 첨부파일, 작성일, 조회 내용이 담겨있는 표</caption>
                        <colgroup>
                            <col style="width: auto;">
                            <col style="width: 10%;">
                            <col style="width: 10%;">
                        </colgroup>
                        <thead>
                        <tr>
                            <th scope="col">제목</th>
                            <th scope="col">작성자/작성일/열람횟수/좋아요수</th>
                            <th scope="col">내용</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="tit">
                                <a href="javascript:void(0);">
                                    <span class="text fs-lg fwb" onclick="goDetail(${data.id})">${visibled} ${data.name}</span>
                                </a>
                            </td>
                            <td class="write">
                                <ul>
                                    <li>${data.user_id}</li>
                                    <li>등록일 : ${data?.created_date?.substring(0,10)}</li>
                                    <li>열람횟수 : ${data.views}회</li>
                                    <li>좋아요 수 : ${data.like_count}회</li>
                                </ul>
                            </td>
                            <td class="board_cont">${contents}</td>
                        </tr>
                        </tbody>
                    </table>
                </li>
                <li class="th_15">
                    <div class="btn form_btn btn_m" onclick="goDetail(${data.id})">템플릿 열기</div>
                </li>
            </ul>
            `;
        });
    }

    $('#main_div').html(result);
    makePaging(Math.ceil(data.count / PAGE_SIZE), PAGE_NO, setList);
}

// 리스트 가져오기
function getList() {
    let result = {};
    let subUrl = '?pageNo='+PAGE_NO+'&pageSize='+PAGE_SIZE;

    const keyword = $('#s_value').val();
    const typeValue = $('#s_type_value').val();
    const visibled = $('#s_open_type').val();
    const createdAtStart = $('#datepicker1').val();
    const createdAtEnd = $('#datepicker2').val();

    subUrl += keyword && '&keyword='+keyword;
    subUrl += typeValue && '&'+$('#s_type').val()+'='+typeValue;
    subUrl += visibled && '&visibled='+visibled;
    subUrl += createdAtStart && '&createdAtStart='+createdAtStart;
    subUrl += createdAtEnd && '&createdAtEnd='+createdAtEnd;

    const $orderType = $('#order_type').val();

    if($orderType === 'new') {
        subUrl += '&createdAtDesc=Y';
    }else if($orderType === 'like') {
        subUrl += '&likesDesc=Y';
    }else if($orderType === 'view') {
        subUrl += '&viewsDesc=Y';
    }

    commonAjax(
        'GET',
        '/riskCheck/list'+subUrl,
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

// 최신순, 좋아요순, 조회순 변경 이벤트
function changeOrderType() {
    search();
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

// 좋아요 하트 버튼에 토글 이벤트 부여
function setToggleLike() {
    $('.like_ico').click(function(){
        if($(this).hasClass('on')){
            $(this).removeClass('on');
        }else{
            $(this).addClass('on');
        }
    });
}

// 좋아요 하트 버튼 클릭
function like(pk,elem) {
    setTimeout(function() {
        const type = $(elem).hasClass('on');

        // TODO : 좋아요 클릭시 로직 추가

    },200);
}

// 등록 페이지로 이동
function goWrite() {
    location.href='main.html?menu=adm_risk_write';
}

// 체크리스트 상세 페이지로 이동
function goDetail(pk) {
    location.href='main.html?menu=adm_risk_contents&pk='+pk;
}

// 삭제
function remove() {
    const $checkbox = $('.main_ul_checkbox:checked');
    const checkboxLenth = $checkbox.length;

    if($checkbox.length > 0) {
        modalConfirm('삭제하시겠습니까?','취소','삭제',function() {
            let cnt = 0;
            $checkbox.each(function(idx,elem) {
                commonAjax(
                    'DELETE',
                    '/riskCheck/remove/'+$(elem).val(),
                    false,
                    false,
                    {},
                    function(response) {
                        cnt++;
                    },
                    function(response) {

                    });

                if(checkboxLenth === cnt) {
                    modalAlert('삭제되었습니다.',function() {
                        search();
                    });
                }
            });
        });

    }else {
        modalAlert('삭제할 대상을 체크해주세요.');
    }
}