let PK = 0;

$(function() {
    init();
});

// 최초 실행 함수
function init() {
    setInfo();
}

//  정보 가져오기
function getInfo() {
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

// 정보 셋팅
function setInfo() {
    const $section01Elem = $('#section01');
    const data = getInfo();

    /* section01 시작 */
    let tags = ``;
    if(data.tag) {
        tags = `
        <div class="tag_wrap">
            <div class="view_tit">태그</div>
            <ul id="tag-list">
        `;
        data.tag?.split(',').forEach(function(tag) {
            tags += makeLi(tag);
        });

        tags += `
            </ul>
        </div>
        `;
    }

    const section01 = `
    <div class="write_wrap">
        <div class="user_img"></div>
        <div class="write_info ml10">
            <p>${data.user_name}</p>
            <p class="fs-sm">
            등록일 : ${data.created_date.substring(0,10)}&nbsp;&nbsp;|&nbsp;&nbsp; 
            열람횟수 : ${data.views}&nbsp;&nbsp;|&nbsp;&nbsp;
            좋아요 수 : ${data.like_count}
            </p>
        </div>
    </div>
    <div class="title mt20">
    <span class="fwb fs-xlg pa20">${data.name}</span>
    </div>
    <div class="mybutton">
        <button class="btn btn_w ml10"  onclick="goEdit()">
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
                ${tags}
            </div>
        </div>
    </div>
    `;

    if(!data.tag) $('.list-wrap .view.watch .tag_wrap:eq(0)').remove();
    if(!data.related_acid_no) $('.list-wrap .view.watch .tag_wrap:eq(1)').remove();
    $section01Elem.html(section01);

    /* section02 시작 */
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

    newDetails.forEach(function(detail) {
        detail.depth02.forEach(function(d02,idx02) {
            tempD03Arr = [];

            depth03s.forEach(function(d03, idx03) {
                if(d02.orders === d03.parent_depth) {
                    tempD03Arr.push(d03);
                }

            });

            detail.depth02[idx02].depth03 = tempD03Arr;
        });
    });

    let typeArr;
    let section02 = `<article class="cont_box check-work mt30 section02">`;

    newDetails.forEach(function(d01) {
        section02 += `
        <div class="list-wrap group01">
            <div class="list clear pa20">
                <div class="toggle_btn mr20"></div>
                <div class="tit">${d01.contents}</div>
            </div>
            <div class="view mb20">`;

        d01.depth02.forEach(function(d02) {
            section02 += `
            <div class="list-wrap group02">
                <div class="list clear pa20">
                    <div class="toggle_btn mr20"></div>
                    <div class="tit">${d02.contents}</div>
                </div>
                <div class="view check-view">`;

            d02.depth03.forEach(function(d03) {
                section02 += `
                <form class="check">
                    <div class="check_inner">
                        <div data-question="1" class="check_step-1 check_step">
                            <h1 class="check_question">${d03.contents}</h1>
                            <div class="answer_wrap">`;

                typeArr = [];
                typeArr = (d03.types) && d03.types.split(',');
                typeArr.forEach(function(type) {
                    section02 += `
                    <div class="answer">
                        <label class="answer_label"">${type}</label>
                    </div>
                    `;
                });

                section02 += `
                            </div>
                        </div>
                    </div>
                </form>
                `;
            });

            section02 += `
                </div>
            </div>
            `;
        });

        section02 += `
            </div>
        </div>
        `;
    });
    section02 += `</article>`;
    $section01Elem.after(section02);

    /* section03 시작 */
    let section03 = ``;
    const acidArr = (data.related_acid_no) ? data.related_acid_no.split(',') : [];

    if(acidArr.length > 0) {
        let acs = `
        <div class="tag_wrap">
            <div class="view_tit">사고사례</div>
            <ul id="case-list" style="display: flex; margin-top: 5px;">
        `;

        acidArr.forEach(function(acid) {
            if(acid) {
                commonAjax(
                    'GET',
                    '/board/accExp/find/'+acid,
                    false,
                    false,
                    {},
                    function(response) {
                        // section03 만들어 넣기
                        makeSection03(response);

                        // section01의 사고사례 만들어 넣기
                        acs += makeLi(response.title);
                    },
                    function(error) {

                    });
            }
        });

        acs += `
            </ul>
        </div>
        `;

        $('.view.watch').append(acs);
    }

    // 최하단 사고사례 엘리먼트 생성
    function makeSection03(data) {
        let imgElem = ``;
        if(data?.image) {
            imgElem = `
            <div class="news_img">
                <img src="https://api.safeapp.codeidea.io${data.image}" alt="">
            </div>
            `;
        }

        section03 += `
        <article class="cont_box news section03">
            <div class="txt_box">
                <div class="tit">${data.title}</div>
                <div class="txt mt30 fc_gy" style="height: auto">
                    <div class="form_table form_table2">
                        <table>
                            <tbody>
                            <tr>
                                <td class="bg">사고발생일시</td>
                                <td>${data.accident_at.substring(0,10) + ' ' + data.accident_at.substring(11,16)}</td>
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

        return section03;
    }

    if(!data.related_acid_no && !data.tag) {
        $('#section01 .list-wrap').remove();
    }

    $('.section02').after(section03);

    // 미리보기 모달 화면
    $('#modal_main_div').prepend(section02);
}

// 등록된 태그, 사고사례 - li 만들기
function makeLi(value) {
    return `<li class="tag-item">${value}</li>`;
}

// 목록으로
function goList() {
    location.href='main.html?menu=adm_check_list';
}

// 템플릿 편집
function goEdit() {
    location.href='main.html?menu=adm_check_adj&pk='+PK;
}