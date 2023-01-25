let PK = 0;

$(function() {
    init();
});

// 최초 실행 함수
function init() {
    setInfo();
    setToggleLike();
}

// 정보 셋팅
function setInfo() {
    PK = new URL(window.location.href).searchParams.get('pk');
    // TODO : 체크리스트 상세 정보 조회

    const data = [{},{}];

    const section01 = `
    <div class="write_wrap">
        <div class="user_img"></div>
        <div class="write_info ml10">
            <p>유저1</p>
            <p class="fs-sm">등록일 : 2022-11-03</p>
        </div>
    </div>
    <div class="title mt20">
    <span class="fwb fs-xlg pa20">거푸집 동바리 설치 체크리스트
        <span class="like_ico ml10" onclick="like();"></span>
    </span>
    </div>
    <div class="mybutton">
        <button class="btn btn_w ml10"  onclick="goEdit(1)">
            <img class="mr5" src="../resources/img/icon/edit.png" alt="템플릿 편집">템플릿 편집
        </button>
        <button class="btn layer_btn btn_w ml10" onclick="">
            <a href="#none" class="preview" style="color:#333;">
                <img class="mr5" src="../resources/img/icon/preview.png" alt="미리보기">미리보기
            </a>
        </button>
    </div>
    <div class="content-tag mt30">
        <div class="list-wrap">
            <div class="list">
                <img class="toggle_btn btn" src="../resources/img/icon/closeView_.png" alt="보기/감추기 버튼">
            </div>
            <div class="view watch">
                <div class="tag_wrap">
                    <div class="view_tit">태그</div>
                    <ul id="tag-list">
                        ${makeLi('aaa')}${makeLi('bbb')}
                    </ul>
                </div>
                <div class="tag_wrap">
                    <div class="view_tit">사고사례</div>
                    <ul id="case-list" style="display: flex; margin-top: 5px;">
                        ${makeLi('ccc')}${makeLi('ddd')}
                    </ul>
                </div>
            </div>
        </div>
    </div>
    `;

    const section02 = `
    <article class="cont_box check-work mt30 section02">
        <div class="list-wrap group01">
            <div class="list clear pa20">
                <div class="toggle_btn mr20"></div>
                <div class="tit">작업전</div>
            </div>
            <div class="view mb20">
                <div class="list-wrap group02">
                    <div class="list clear pa20">
                        <div class="toggle_btn mr20"></div>
                        <div class="tit">안전점검</div>
                    </div>
                    <div class="view check-view">
                        <form class="check">
                            <div class="check_inner">
                                <div data-question="1" class="check_step-1 check_step">
                                    <h1 class="check_question">안전모 착용을 하였습니까?</h1>
                                    <div class="answer_wrap">
                                        <div class="answer">
                                            <label class="answer_label"">네</label>
                                        </div>
                                        <div class="answer">
                                            <label class="answer_label">아니오</label>
                                        </div>
                                        <div class="answer">
                                            <label class="answer_label">해당없음</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="list-wrap group01">
            <div class="list clear pa20">
                <div class="toggle_btn mr20"></div>
                <div class="tit">작업전</div>
            </div>
            <div class="view mb20">
                <div class="list-wrap group02">
                    <div class="list clear pa20">
                        <div class="toggle_btn mr20"></div>
                        <div class="tit">안전점검</div>
                    </div>
                    <div class="view check-view">
                        <form class="check">
                            <div class="check_inner">
                                <div data-question="1" class="check_step-1 check_step">
                                    <h1 class="check_question">안전모 착용을 하였습니까?</h1>
                                    <div class="answer_wrap">
                                        <div class="answer">
                                            <label class="answer_label"">네</label>
                                        </div>
                                        <div class="answer">
                                            <label class="answer_label">아니오</label>
                                        </div>
                                        <div class="answer">
                                            <label class="answer_label">해당없음</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="list-wrap group01">
            <div class="list clear pa20">
                <div class="toggle_btn mr20"></div>
                <div class="tit">작업전</div>
            </div>
            <div class="view mb20">
                <div class="list-wrap group02">
                    <div class="list clear pa20">
                        <div class="toggle_btn mr20"></div>
                        <div class="tit">안전점검</div>
                    </div>
                    <div class="view check-view">
                        <form class="check">
                            <div class="check_inner">
                                <div data-question="1" class="check_step-1 check_step">
                                    <h1 class="check_question">안전모 착용을 하였습니까?</h1>
                                    <div class="answer_wrap">
                                        <div class="answer">
                                            <label class="answer_label"">네</label>
                                        </div>
                                        <div class="answer">
                                            <label class="answer_label">아니오</label>
                                        </div>
                                        <div class="answer">
                                            <label class="answer_label">해당없음</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="list-wrap group01">
            <div class="list clear pa20">
                <div class="toggle_btn mr20"></div>
                <div class="tit">작업전</div>
            </div>
            <div class="view mb20">
                <div class="list-wrap group02">
                    <div class="list clear pa20">
                        <div class="toggle_btn mr20"></div>
                        <div class="tit">안전점검</div>
                    </div>
                    <div class="view check-view">
                        <form class="check">
                            <div class="check_inner">
                                <div data-question="1" class="check_step-1 check_step">
                                    <h1 class="check_question">안전모 착용을 하였습니까?</h1>
                                    <div class="answer_wrap">
                                        <div class="answer">
                                            <label class="answer_label"">네</label>
                                        </div>
                                        <div class="answer">
                                            <label class="answer_label">아니오</label>
                                        </div>
                                        <div class="answer">
                                            <label class="answer_label">해당없음</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </article>
    `;

    const section03 = `
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

    const $section01Elem = $('#section01');
    $section01Elem.html(section01);
    $section01Elem.after(section02);
    $('.section02').after(section03);

    $('#modal_main_div').prepend(section02);
}

// 등록된 태그, 사고사례 - li 만들기
function makeLi(value) {
    return `<li class="tag-item">${value}</li>`;
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

// 목록으로
function goList() {
    location.href='main.html?menu=adm_check_list';
}

// 템플릿 편집
function goEdit(pk) {
    location.href='main.html?menu=adm_check_adj&pk='+pk;
}