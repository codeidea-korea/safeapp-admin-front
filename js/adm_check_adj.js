let PK = 0;
let PAGE_NO = 1;
let PAGE_SIZE = 10;
let AC_ARR = [];

$(function() {
    init();
});

// 최초 실행 함수
function init() {
    setList();
    setTagEvent(3, false);
    setCaseList();

    $(".modal_case .searchTerm").on("keyup",function(key){
        if(key.keyCode === 13) setCaseList();
    });
}

// 체크리스트 가져오기
function getList() {
    PK = new URL(window.location.href).searchParams.get('pk');

    let result = {};

    commonAjax(
        'GET',
        '/checkList/find/'+PK,
        false,
        false,
        {},
        function(response) {
            result = response;
        },
        function(error) {

        });

    return result;
}

// 체크리스트 전체 내용 셋팅
function setList() {
    const data = getList();

    /* section01 */
    $('#user_name').text(data.user_name);
    $('#reg_date').html(
        `등록일 : ${data.created_date.substring(0,10)}&nbsp;&nbsp;|&nbsp;&nbsp;
        열람횟수 : ${data.views}&nbsp;&nbsp;|&nbsp;&nbsp;
        좋아요 수 : ${data.like_count}`);
    $('#title').val(data.name);
    (data.visibled === 'Y') && $('#open_yn').click();

    /* section02 */
    // 태그
    if(data.tag) {
        data.tag.split(',').forEach(function(data) {
            $('#tag-list').append(`<li class="tag-item"><span class="tag-item-value">${data}</span><span class="del-btn">X</span></li>`);
        });
    }

    /* section03 */
    const details = data.details;
    let depth01s = [];
    let depth02s = [];
    let depth03s = [];
    let newDetails = [];
    let tempD02Arr;
    let tempD03Arr;

    // orders asc 정렬
    details.sort(function(a,b) {
        return a.orders - b.orders;
    });

    /* details를 직접 가공해서 사용 */
    details.forEach(function(data) {
        if(data.depth === 1) {
            depth01s.push(data);
        }else if(data.depth === 2) {
            depth02s.push(data);
        }else {
            depth03s.push(data);
        }
    });

    depth01s.forEach(function(d01,idx01) {
        newDetails.push(d01);
        tempD02Arr = [];

        depth02s.forEach(function(d02) {
            if(d01.orders === d02.parent_depth) {
                tempD02Arr.push(d02);
            }
        });

        newDetails[idx01].depth02 = tempD02Arr;
    });

    newDetails.forEach(function(detail,idx) {
        detail.depth02.forEach(function(d02,idx02) {
            tempD03Arr = [];

            depth03s.forEach(function(d03, idx03) {
                if(d02.orders === d03.parent_depth) {
                    tempD03Arr.push(d03);

                    if(d03.types.includes('예')) {
                        detail.depth02[idx02].template = 1;
                    }else if(d03.types.includes('Y')) {
                        detail.depth02[idx02].template = 2;
                    }else if(d03.types.includes('양호')) {
                        detail.depth02[idx02].template = 3;
                    }
                }
            });

            detail.depth02[idx02].depth03 = tempD03Arr;
        });
    });

    let typeArr;
    let section03 = ``;

    newDetails.forEach(function(d01) {
        section03 += `
        <div class="list-wrap group01">
            <div class="list clear pa20 top_div">
                <div class="toggle_btn mr20"></div>
                <div class="tit">
                    <input type="text" class="group01_value" value="${d01.contents}">
                    <div class="adj-btn">
                        <div class="plus-button" onclick="makeLine(1)"></div>
                        <div class="plus-button minus-button" onclick="removeLine(1,this)"></div>
                        <div class="plus-button arrow-button" onclick="makeLine(2,this)"></div>
                    </div>
                </div>
            </div>
            <div class="view mb20 top_group02">
        `;

        d01.depth02.forEach(function(d02) {
            section03 += `
            <div class="list-wrap group02" data-template="${d02.template}">
                <div class="list clear pa20">
                    <div class="toggle_btn mr20"></div>
                    <div class="tit">
                        <input type="text" class="group02_value" value="${d02.contents}">
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
                        <div class="adj-btn">
                            <div class="plus-button" onclick="makeLine(2,this)"></div>
                            <div class="plus-button minus-button" onclick="removeLine(2,this)"></div>
                            <div class="plus-button arrow-button" onclick="makeLine(3,this)"></div>
                        </div>
                    </div>
                </div>
                <div class="view check-view top_group03">
            `;

            d02.depth03.forEach(function(d03) {
                section03 += `
                    <form class="check group03">
                        <div class="check_inner">
                            <div data-question="1" class="check_step-1 check_step">
                                <h1 class="check_question">
                                    <input type="text" class="group03_value" value="${d03.contents}">
                                </h1>
                `;

                typeArr = [];
                typeArr = (d03.types) && d03.types.split(',');
                typeArr.forEach(function(type) {
                    section03 += `
                                <div class="answer">
                                    <label class="answer_label">${type}</label>
                                </div>
                    `;
                });

                section03 += `
                                <div class="adj-btn">
                                    <div class="plus-button" onclick="makeLine(3,this)"></div>
                                    <div class="plus-button minus-button" onclick="removeLine(3,this)"></div>
                                </div>
                            </div>
                        </div>
                    </form>
                `;
            });

            section03 += `
                </div>
            </div>
            `;
        });

        section03 += `
            </div>
        </div>
        `;
    });

    /* section04 시작 */
    let section04 = ``;
    const acidArr = (data.related_acid_no) ? data.related_acid_no.split(',') : [];

    acidArr.forEach(function(acid) {
        if(acid) {
            commonAjax(
                'GET',
                '/board/accExp/find/'+acid,
                false,
                false,
                {},
                function(response) {
                    // 최하단 사고사례 내용 셋팅
                    makeSection04(response);

                    // section02의 사고사례 내용 셋팅
                    $('#case-list').append(`<li class="tag-item" data-pk="${response.id}"><span class="tag-item-value">${response.title}</span><span class="del-btn" onclick="delCase(${response.id})">X</span></li>`);
                },
                function(error) {

                });
        }
    });

    function makeSection04(data) {
        let imgElem = ``;
        if(data?.image) {
            imgElem = `
            <div class="news_img">
                <img src="https://api.safeapp.codeidea.io${data.image}" alt="">
            </div>
            `;
        }

        section04 += `
        <article class="cont_box news section03" id="unique${data.id}">
            <div class="txt_box">
                <div class="tit">${data.title}</div>
                <div class="txt mt30 fc_gy" style="height: auto">
                    <div class="form_table form_table2">
                        <table>
                            <tbody>
                            <tr>
                                <td class="bg">사고발생일시</td>
                                <td>${data.accident_at}</td>
                            </tr>
                            <tr>
                                <td class="bg">사고경위</td>
                                <td>${data.accident_reason}</td>
                            </tr>
                            <tr>
                                <td class="bg">사고원인</td>
                                <td>${data.accident_cause}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="more_btn mt30">
                    <a href="main.html?menu=adm_case_detail&pk=${data.id}" target="_blank" tabindex="-1">자세히 보기</a>
                </div>
            </div>
            ${imgElem}
        </article>
        `;

        return section04;
    }

    const $mainArticle = $('#main_article');
    const $section04Elem = $('.section04');

    $mainArticle.html(section03);

    if($section04Elem.length > 0) {
        $section04Elem.after(section04);
    }else {
        $mainArticle.after(section04);
    }
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
    let subUrl = '?pageNo='+PAGE_NO+'&pageSize='+PAGE_SIZE+'&keyword='+$(".modal_case .searchTerm").val();

    commonAjax(
        'GET',
        '/board/accExp/list'+subUrl,
        false,
        false,
        {},
        function(response) {
            result['count'] = response.data.count;
            result['list'] = response.data.list;

            AC_ARR = result['list'];
        },
        function(error) {

        });

    return result;
}

// 사고사례 내용 셋팅
function setCaseList(pageNo = 0) {
    if(pageNo) PAGE_NO = pageNo;

    const data = getCaseList();
    let result = `<li><span class="news_cont">결과가 존재하지 않습니다.</span></li>`;

    if(data.count > 0) {
        result = ``;
        data.list.forEach(function(data,idx) {
            result += `
            <li>
                <span class="news_cont">${data.title}
                    <p class="fs-sm">- ${data.accident_reason}</p>
                </span>
                <button class="btn bnt_m" type="button" onclick="addCase('${data.title}',${data.id},${idx})">추가</button>
            </li>
        `;
        });
    }

    $('#modal_case_ul').html(result);
    makePaging(Math.ceil(data.count / PAGE_SIZE), PAGE_NO, setCaseList);
}

// 사고사례 팝업 - 추가 버튼 클릭
function addCase(title,pk,idx) {
    let flag = true;
    const caseLiLength = $('#case-list li').length;

    if(caseLiLength < 2) {
        if(caseLiLength > 1) {
            // 중복 체크
            $('#case-list .tag-item').forEach(function(elem) {
                if($(elem).data('pk') === pk) {
                    modalAlert('이미 추가된 사고사례입니다.');
                    flag = false;
                    return flag;
                }
            });

        }else {
            if($('#case-list .tag-item').data('pk') === pk) {
                modalAlert('이미 추가된 사고사례입니다.');
                flag = false;
            }
        }

        if(flag) {
            // 중복 없으면 추가
            $('#case-list').append(`<li class="tag-item" data-pk="${pk}"><span class="tag-item-value">${title}</span><span class="del-btn" onclick="delCase(${pk})">X</span></li>`);
            makeAcElem(AC_ARR[idx]);
        }

    }else {
        modalAlert('최대 2개 선택 가능합니다.');
    }
}

function delCase(pk) {
    $('#unique'+pk).remove();
}

// 사고사례 추가버튼 클릭시 하단에 엘리먼트 생성
function makeAcElem(data) {
    let section03 = ``;
    let imgElem = ``;
    const uniqueIdx = 'unique'+data.id;

    if(data.image) {
        imgElem = `
            <div class="news_img">
                <img src="https://api.safeapp.codeidea.io${data.image}" alt="">
            </div>
            `;
    }

    section03 += `
    <article class="cont_box news section03" id="${uniqueIdx}">
        <div class="txt_box">
            <div class="tit">${data.title}</div>
            <div class="txt mt30 fc_gy">
                <div class="form_table form_table2">
                    <table>
                        <tbody>
                        <tr>
                            <td class="bg">사고발생일시</td>
                            <td>${data.accident_at}</td>
                        </tr>
                        <tr>
                            <td class="bg">사고경위</td>
                            <td>${data.accident_reason}</td>
                        </tr>
                        <tr>
                            <td class="bg">사고원인</td>
                            <td>${data.accident_cause}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="more_btn mt30">
                <a href="main.html?menu=adm_case_detail&pk=${data.id}" target="_blank" tabindex="-1">자세히 보기</a>
            </div>
        </div>
        ${imgElem}
    </article>
    `;

    const $section03Elem = $('.section03');

    if($section03Elem.length > 0) {
        $section03Elem.after(section03);
    }else {
        $('#main_article').after(section03);
    }
}

// 라인 추가
function makeLine(lv, elem) {
    let result = makeLineElem(lv,'',lv === 3 ? $(elem).closest('.group02').data('template') : '');
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
                <div class="adj-btn">
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
                <div class="adj-btn">
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
                <div class="adj-btn">
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

    }/*else if($tag_list.find('li').length <= 0) {
        modalAlert('태그를 입력해주세요.',function() {
            $('#tag').focus();
        });

    }else if($case_list.find('li').length <= 0) {
        modalAlert('사고사례를 선택해주세요.',function() {
            showCase();
        });

    }*/else {
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

        modalConfirm('수정하시겠습니까?','취소','수정',function() {
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
                    related_acid_no: related_acid_no.join(','),
                    details: detailArr
                }

                // 체크리스트 수정
                commonAjax(
                    'PUT',
                    '/checkList/edit/'+PK,
                    true,
                    false,
                    submitData01,
                    function(response) {
                        succ(response);
                    },
                    function(error) {

                    });

            }).then((arg) =>{
                let cnt = 0;

                detailArr.forEach(function(data) {
                    // 체크리스트 상세 내용 수정
                    commonAjax(
                        'POST',
                        '/checkList/detail/add/'+arg.id,
                        true,
                        false,
                        data,
                        function(response) {
                            cnt++;

                            if(cnt === detailArr.length) {
                                modalAlert('수정되었습니다.',goList);
                            }
                        },
                        function(error) {

                        });
                });
            });
        });
    }
}