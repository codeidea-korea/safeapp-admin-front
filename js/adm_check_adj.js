let PK = 0;
let PAGE_NO = 1;
let PAGE_SIZE = 20000;

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

    commonAjax2(
        'GET',
        '/check/checklists/'+PK,
        false,
        true,
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
    // (open_yn === 'Y') && $('#open_yn').click();

    /* section02 */
    data.tag.split(',').forEach(function(data) {
        $('#tag-list').append(`<li class="tag-item"><span class="tag-item-value">${data}</span><span class="del-btn">X</span></li>`);
    });

    data.related_acid_no.split(',').forEach(function(data) {
        $('#case-list').append(`<li class="tag-item" data-pk="${data}"><span class="tag-item-value">${data}</span><span class="del-btn">X</span></li>`);
    });

    /* section03 */
    const details = data.details;
    let depth01s = [];
    let depth02s = [];
    let depth03s = [];
    let newDetails = [];
    let tempD02Arr;
    let tempD03Arr;

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
                    <div id="adj-btn">
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
                        <div id="adj-btn">
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
                                <div id="adj-btn">
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

    $('#main_article').html(section03);
}

// 최하단 사고사례 내용 셋팅
function setSection04(data) {
    // TODO : data 바인딩
    let contents = ``;

    data = [{},{}];
    data.forEach(function(data,idx) {
        contents += `
        <article class="cont_box news section03">
            <div class="txt_box">
                <div class="tit">통영시 가오치항 어촌뉴딜 300사업 건축공사 2층 옹벽 거푸집 해체 중 작업자가 사망하는 사건이 발생했습니다.</div>
                <div class="txt mt30 fc_gy">
                    법관이 중대한 심신상의 장해로 직무를 수행할 수 없을 때에는 법률이 정하는 바에 의하여 퇴직하게 할 수 있다. 국회는 헌법개정안이 공고된 날로부터 60일 이내에 의결하여야 하며, 국회의
                    의결은 재적의원 3분의 2 이상의 찬성을 얻어야 한다.
                    <br>
                    <br>
                    대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이 아닌 법관을 둘 수 있다.대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이 아닌 법관을 둘 수 있다.
                </div>
                <div class="more_btn mt30">
                    <a href="main.html?menu=adm_case_detail&pk=1" target="_blank" tabindex="-1">자세히 보기</a>
                </div>
            </div>
            <div class="news_img">
                <img src="" alt="">
            </div>
        </article>
        `;
    });

    $('#main_article').after(contents);
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
        modalAlert('최대 2개 선택 가능합니다.');
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
        let allArr = [];

        // lv1 체크
        $group01.each(function(idx,elem) {
            $value01 = $(elem).find('.group01_value');

            if(!$value01.val()) {
                flag = false;

                modalAlert('내용을 입력해주세요.',function() {
                    $value01.focus();
                });

            }else {
                // lv2 체크
                $(elem).find('.group02').each(function(idx2,elem2) {
                    $value02 = $(elem2).find('.group02_value');

                    if(!$value02.val()) {
                        flag = false;

                        modalAlert('내용을 입력해주세요.',function() {
                            $value02.focus();
                        });

                    }else {
                        // lv3 체크
                        $(elem2).find('.group03').each(function(idx3,elem3) {
                            $value03 = $(elem3).find('.group03_value');

                            if(!$value03.val()) {
                                flag = false;

                                modalAlert('내용을 입력해주세요.',function() {
                                    $value03.focus();
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
            // TODO : 체크리스트 저장
            // TODO : 체크리스트 컨텐츠들을 어떤 형식으로 배열에 담을까

            // $('#open_yn').val()

            modalAlert('수정되었습니다.',function() {
               goList();
            });
        });
    }

}