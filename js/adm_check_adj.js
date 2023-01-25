let TEMP_IDX = 0;
let PK = 0;

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

// 체크리스트 전체 내용 셋팅
function setList() {
    const data = getList();
    setSection01(data);
    setSection02(data);
    setSection03(data);
    setSection04(data);
}

// 체크리스트 가져오기
function getList() {
    PK = new URL(window.location.href).searchParams.get('pk');
    let result = {};

    // TODO : 체크리스트 상세 정보 조회

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

// 등록자 정보 및 체크리스트 제목 셋팅
function setSection01(data) {
    // TODO : data 바인딩

    const open_yn = 'Y';
    $('#user_name').text('유저1');
    $('#reg_date').text('등록일 : 2022-11-03');
    $('#title').val('거푸집 동바리 설치 체크리스트');
    (open_yn === 'Y') && $('#open_yn').click();
}

// 태그 및 사고사례 셋팅
function setSection02(data) {
    // TODO : data 바인딩

    const tags = ['aaa','bbb'];
    const cases = ['ccc'];

    tags.forEach(function(data) {
        makeTagBox($("#tag-list"),data);
    });

    cases.forEach(function(data) {
        makeTagBox($("#case-list"),data);
    });
}

// 체크리스트 내용 셋팅
function setSection03(data) {
    // TODO : data 바인딩

    data = [{},{}];
    data.forEach(function(data,idx) {
        makeLine(1);
    });
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
    const searchValue = $(".modal_case .searchTerm").val();
    // TODO : 사고사례 리스트 불러오기

    return [{},{},{},{}];
}

// 사고사례 내용 셋팅
function setCaseList() {
    const data = getCaseList();
    let result = ``;

    // TODO : 사고사례 내용 셋팅
    data.forEach(function(data) {
        result += `
            <li>
                <span class="news_cont">통영시 가오치항 어촌뉴딜 300사업 건축공사 2층 옹벽 거푸집 해체 중 작업자
                    <p class="fs-sm">- 작업장소 타 공종 간섭여부, 지반상태- 동바리 부재 구조검토서와 동일한 부재 반입여부- 동바리 부재 손상, 변형된 부재확인 및 제거상태</p>
                </span>
                <button class="btn bnt_m" type="button" onclick="addCase('aaaaaaaa',1)">추가</button>
            </li>
        `;
    });

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