let TEMP_IDX = 0;
let PAGE_SIZE = 20000;
let PAGE_NO = 1;

$(function() {
    init();
});

// 최초 실행 함수
function init() {
    setTagEvent(3, false);
    makeLine(1);
    setCaseList();

    $(".modal_case .searchTerm").on("keyup",function(key){
        if(key.keyCode === 13) setCaseList();
    });
}

// 공개여부 버튼 클릭 이벤트
function changeOpenYN(elem) {
    const $checkbox = $(elem).find('input[type=checkbox]');

    if($checkbox.val() === 'N') {
        $checkbox.val('Y');
    }else {
        $checkbox.val('N');
    }
}

// 사고사례 + 버튼 클릭
function showCase() {
    modalToggle($('.modal_case'));
}

// 사고사례 리스트 불러오기
function getCaseList() {
    let result = {};
    let subUrl = '?pageNo='+PAGE_NO+'&pageSize='+PAGE_SIZE+'&name='+$(".modal_case .searchTerm").val();

    commonAjax2(
        'GET',
        '/board/accidents'+subUrl,
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

// 사고사례 내용 셋팅
function setCaseList(pageNo = 0) {
    const data = getCaseList();
    if(pageNo) PAGE_NO = pageNo;
    let result = `<li><span class="news_cont">결과가 존재하지 않습니다.</span></li>`;

    if(data.count > 0) {
        result = ``;

        data.list.forEach(function(data) {
            result += `
            <li>
                <span class="news_cont">${data.title}
                    <p class="fs-sm">- ${data.accident_reason}</p>
                </span>
                <button class="btn bnt_m" type="button" onclick="addCase('${data.title}',${data.id})">추가</button>
            </li>
        `;
        });
    }

    $('#modal_case_ul').html(result);
}

// 사고사례 팝업 - 추가 버튼 클릭
function addCase(title,pk) {
    if($('#case-list li').length < 2) {
        $('#case-list').append(`<li class="tag-item" data-pk="${pk}"><span class="tag-item-value">${title}</span><span class="del-btn">X</span></li>`);

    }else {
        modalAlert('최대 2개 선택 가능합니다.')
    }
}

// 라인 추가
function makeLine(lv, elem) {
    let result = makeLineElem(lv,'',$(elem).closest('.group02').data('template'));
    let $target = '';

    switch(lv) {
        case 1:
            $target = $('#main_article');
            break;
        case 2:
            $target = $(elem).closest('.group01').find('.top_group02');
            break;
        case 3:
            $target = $(elem).closest('.group02').find('.top_group03');
            break;
    }

    $target.append(result);
}

// lv3 내부 버튼 엘리먼트 생성
function getLv3Inner(template) {
    let lv3Inner = ``;

    if(template === 2) {
        lv3Inner = `
        <div class="answer">
            <label class="answer_label">Y</label>
        </div>
        <div class="answer">
            <label class="answer_label">N</label>
        </div>
        `;

    }else if(template === 3) {
        lv3Inner = `
        <div class="answer">
            <label class="answer_label">양호</label>
        </div>
        <div class="answer">
            <label class="answer_label">보통</label>
        </div>
        <div class="answer">
            <label class="answer_label">불량</label>
        </div>
        `;

    }else {
        lv3Inner = `
        <div class="answer">
            <label class="answer_label">예</label>
        </div>
        <div class="answer">
            <label class="answer_label">아니오</label>
        </div>
        <div class="answer">
            <label class="answer_label">해당없음</label>
        </div>
        `;
    }

    return lv3Inner;
}
/*function getLv3Inner(template) {
    TEMP_IDX++;
    let lv3Inner = ``;

    if(template === 2) {
        lv3Inner = `
        <div class="answer">
            <input class="answer_input" type="radio" id="a${TEMP_IDX}" name="q1">
            <label class="answer_label" for="a${TEMP_IDX}">Y</label>
        </div>
        <div class="answer">
            <input class="answer_input" type="radio" id="b${TEMP_IDX}" name="q1">
            <label class="answer_label" for="b${TEMP_IDX}">N</label>
        </div>
        `;

    }else if(template === 3) {
        lv3Inner = `
        <div class="answer">
            <input class="answer_input" type="radio" id="a${TEMP_IDX}" name="q1">
            <label class="answer_label" for="a${TEMP_IDX}">양호</label>
        </div>
        <div class="answer">
            <input class="answer_input" type="radio" id="b${TEMP_IDX}" name="q1">
            <label class="answer_label" for="b${TEMP_IDX}">보통</label>
        </div>
        <div class="answer">
            <input class="answer_input" type="radio" id="c${TEMP_IDX}" name="q1">
            <label class="answer_label" for="c${TEMP_IDX}">불량</label>
        </div>
        `;

    }else {
        lv3Inner = `
        <div class="answer">
            <input class="answer_input" type="radio" id="a${TEMP_IDX}" name="q1">
            <label class="answer_label" for="a${TEMP_IDX}">예</label>
        </div>
        <div class="answer">
            <input class="answer_input" type="radio" id="b${TEMP_IDX}" name="q1">
            <label class="answer_label" for="b${TEMP_IDX}">아니오</label>
        </div>
        <div class="answer">
            <input class="answer_input" type="radio" id="c${TEMP_IDX}" name="q1">
            <label class="answer_label" for="c${TEMP_IDX}">해당없음</label>
        </div>
        `;
    }

    return lv3Inner;
}*/

// lv별 라인 엘리먼트 생성
function makeLineElem(lv,text,template) {
    let result = ``;
    let lv3Inner = getLv3Inner(template);
    text = (text) ? text : '';

    const lv3 = `
    <form class="check group03">
        <div class="check_inner">
            <div data-question="1" class="check_step-1 check_step">
                <h1 class="check_question">
                    <input type="text" value="${text}" class="group03_value">
                </h1>
                ${lv3Inner}
                <div id="adj-btn">
                    <div class="plus-button" onclick="makeLine(3,this)"></div>
                    <div class="plus-button minus-button" onclick="removeLine(3,this)"></div>
                </div>
            </div>
        </div>
    </form>
    `;

    const lv2 = `
    <div class="list-wrap group02">
        <div class="list clear pa20">
            <div class="toggle_btn mr20"></div>
            <div class="tit">
                <input type="text" class="group02_value">
                <label>
                    <div class="dotted-menu" onclick="toggleottedMenu(this)">
                        <span class="line"></span>
                        <span class="line"></span>
                        <span class="line"></span>
                    </div>
                    <ul id="menu">
                        <li>
                            <a href="javascript:;" onclick="selectBasicForm(1,this)">
                                <span>예</span>
                                <span>아니오</span>
                                <span>해당없음</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;" onclick="selectBasicForm(2,this)">
                                <span>Y</span>
                                <span>N</span>
                                <span>-</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;" onclick="selectBasicForm(3,this)">
                                <span>양호</span>
                                <span>보통</span>
                                <span>불량</span>
                            </a>
                        </li>
                    </ul>
                </label>
                <div id="adj-btn">
                    <div class="plus-button" onclick="makeLine(2,this)"></div>
                    <div class="plus-button minus-button" onclick="removeLine(2,this)"></div>
                    <div class="plus-button arrow-button" onclick="makeLine(3,this)"></div>
                </div>
            </div>
        </div>
        <div class="view check-view top_group03">
        ${lv3}
        </div>
    </div>
    `;

    const lv1 = `
    <div class="list-wrap group01" data-template="1">
        <div class="list clear pa20 top_div">
            <div class="toggle_btn mr20"></div>
            <div class="tit">
                <input type="text" class="group01_value">
                <!--<label for="menu-toggle">
                    <div class="dotted-menu">
                        <span class="line"></span>
                        <span class="line"></span>
                        <span class="line"></span>
                    </div>
                    <input type="checkbox" id="menu-toggle" />
                    <ul id="menu">
                        <li><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                    </ul>
                </label>-->
                <div id="adj-btn">
                    <div class="plus-button" onclick="makeLine(1)"></div>
                    <div class="plus-button minus-button" onclick="removeLine(1,this)"></div>
                    <div class="plus-button arrow-button" onclick="makeLine(2,this)"></div>
                </div>
            </div>
        </div>
        <div class="view mb20 top_group02">
        ${lv2}
        </div>
    </div>
    `;

    switch(lv) {
        case 1:
            result = lv1;
            break;

        case 2:
            result = lv2;
            break;

        case 3:
            result = lv3;
            break;
    }

    return result;
}

// 라인 제거
function removeLine(lv, elem) {
    if($('.group0' + lv).length > 1) {
        let $target = '';
        const msg = lv < 3 ? '하위 내용이 모두 제거됩니다.<br/>제거하시겠습니까?' : '제거하시겠습니까?';

        modalConfirm(msg,'취소','제거',function() {
            switch(lv) {
                case 1:
                    $target = $(elem).closest('.group01');
                    break;

                case 2:
                    $target = $(elem).closest('.group02');
                    break;

                case 3:
                    $target = $(elem).closest('.group03');
                    break;
            }

            $target.remove();
        });

    }else {
        modalAlert('제거할 수 없습니다.');
    }
}

// ... 버튼 클릭
function toggleottedMenu(elem) {
    elem = $(elem).parent().find('#menu');
    let display = elem.css('display');

    if(display === 'none') {
        elem.css('z-index','999');
        elem.css('position','absolute');
        elem.css('display','block');

    }else {
        elem.css('z-index','');
        elem.css('position','');
        elem.css('display','none');
    }
}

// ... 내부 컨텐츠 클릭
function selectBasicForm(template,elem) {
    const $group02 = $(elem).closest('.group02');

    $group02.data('template', template);
    $group02.find('.answer').remove();

    let lv3Inner = ``;

    $group02.find('.group03 .check_inner .check_step').each(function(idx,elem) {
        TEMP_IDX++;
        lv3Inner = getLv3Inner(template);
        $(elem).find('.check_question').after(lv3Inner);
    });

    toggleottedMenu($(elem).parent().parent().parent().find('.dotted-menu'));
}

// 목록으로
function goList() {
    location.href='main.html?menu=adm_check_list';
}

// 저장
function save() {
    const $title = $('#title');
    const $tag_list = $('#tag-list');
    const $case_list = $('#case-list');
    const $group01 = $('.group01');

    if(!$title.val()) {
        modalAlert('템플릿명을 입력해주세요.',function() {
            $title.focus();
        });

    }else if($tag_list.find('li').length <= 0) {
        modalAlert('태그를 입력해주세요.',function() {
            $('#tag').focus();
        });

    }else if($case_list.find('li').length <= 0) {
        modalAlert('사고사례를 선택해주세요.',function() {
            showCase();
        });

    }else {
        let $value01 = '';
        let $value02 = '';
        let $value03 = '';
        let flag = true;

        let parentOrders = 0;
        let ordersLv1 = 0;
        let ordersLv2 = 100;
        let ordersLv3 = 200;
        let detailArr = [];
        let typeArr;

        // lv1 체크
        $group01.each(function(idx,elem) {
            $value01 = $(elem).find('.group01_value');

            if(!$value01.val()) {
                flag = false;

                modalAlert('내용을 입력해주세요.',function() {
                    $value01.focus();
                });

            }else {
                parentOrders++;
                ordersLv1++;

                detailArr.push({
                    contents: $value01.val(),
                    depth: 1,
                    iz_title: 'Y',
                    orders: ordersLv1,
                    parent_depth: 0,
                    types: '',
                    parent_orders: parentOrders
                });

                // lv2 체크
                $(elem).find('.group02').each(function(idx2,elem2) {
                    $value02 = $(elem2).find('.group02_value');

                    if(!$value02.val()) {
                        flag = false;

                        modalAlert('내용을 입력해주세요.',function() {
                            $value02.focus();
                        });

                    }else {
                        parentOrders++;
                        ordersLv2++;

                        detailArr.push({
                            contents: $value02.val(),
                            depth: 2,
                            iz_title: 'Y',
                            orders: ordersLv2,
                            parent_depth: ordersLv1,
                            types: '',
                            parent_orders: parentOrders
                        });

                        // lv3 체크
                        $(elem2).find('.group03').each(function(idx3,elem3) {
                            $value03 = $(elem3).find('.group03_value');

                            if(!$value03.val()) {
                                flag = false;

                                modalAlert('내용을 입력해주세요.',function() {
                                    $value03.focus();
                                });

                            }else {
                                typeArr = [];
                                $(elem3).find('.answer').each(function(idx4,elem4) {
                                    typeArr.push($(elem4).find('label').text());
                                });

                                parentOrders++;
                                ordersLv3++;

                                detailArr.push({
                                    contents: $value03.val(),
                                    depth: 3,
                                    iz_title: 'Y',
                                    orders: ordersLv3,
                                    parent_depth: ordersLv2,
                                    types : typeArr.join(','),
                                    parent_orders: parentOrders
                                });
                            }
                            if(!flag) return false;
                        });
                    }
                    if(!flag) return false;
                });
            }
            if(!flag) return false;
        });
        if(!flag) return false;

        modalConfirm('저장하시겠습니까?','취소','저장',function() {
            new Promise( (succ, fail)=>{

                let inputItems = [];
                let related_acid_no = [];

                $tag_list.find('li').each(function(idx,elem) {
                    inputItems.push($(elem).find('span:eq(0)').text());
                });

                $case_list.find('li').each(function(idx,elem) {
                    related_acid_no.push($(elem).data('pk'));
                });

                let submitData01 = {
                    name: $title.val(),
                    user_id: 13,
                    tag: inputItems.join(','),
                    visibled: $('#open_yn').val(),
                    related_acid_no: related_acid_no.join(',')
                }

                // 체크리스트 등록
                commonAjax2(
                    'POST',
                    '/check/checklist',
                    true,
                    false,
                    submitData01,
                    function(response) {
                        succ(response);
                    },
                    function(error) {

                    });

            }).then((arg) =>{
                detailArr.forEach(function(data) {
                    // 체크리스트 상세 내용 등록
                    commonAjax2(
                        'POST',
                        '/api/checklistProjectDetail/'+arg.id,
                        true,
                        true,
                        data,
                        function(response) {

                        },
                        function(error) {

                        });
                });
            });

            modalAlert('저장되었습니다.',goList);
        });
    }
}