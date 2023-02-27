let PK = 0;

$(function() {
    init();
});

// 최초 실행 함수
function init() {
    setInfo();
}

// 정보 가져오기
function getInfo() {
    PK = new URL(window.location.href).searchParams.get('pk');
    let result = {};

    commonAjax(
        'GET',
        '/riskCheck/find/'+PK,
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
    const data = getInfo();

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
            좋아요 수 : ${data.likes}
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
    $('#section01, #pop_section01').html(section01);

    const section02 = `
    <h3 class="fs-lg mb20">작업개요</h3>
    <div class="form_table form_table2">
        <table>
            <tbody>
            <tr>
                <td class="bg">작업공종</td>
                <td>${data.instruct_work}</td>
            </tr>
            <tr>
                <td class="bg">세부공종</td>
                <td>${data.instruct_detail}</td>
            </tr>
            <tr>
                <td class="bg">작업기간</td>
                <td>${data.work_start_at.substring(0,10) + ' ~ ' + data.work_end_at.substring(0,10)}</td>
            </tr>
            </tbody>
        </table>
    </div>
    `;
    $('#section02, #pop_section02').html(section02);

    const details = data.details;
    let depth01s = [];
    let depth02s = [];
    let newDetails = [];
    let tempD02Arr;

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

    let section03 = ``;
    newDetails.forEach(function(d01) {
        section03 += `<tr>`;
        section03 += `    <td>${d01.contents ? d01?.contents : ''}</td>`;
        section03 += `    <td>${d01.address ? d01.address : ''}</td>`;
        section03 += `    <td>${d01.tools ? d01?.tools : ''}</td>`;
        section03 += `    <td>${d01.risk_factor_type ? d01?.risk_factor_type : ''}</td>`;
        section03 += `    <td>${d01.related_guide ? d01?.related_guide : ''}</td>`;
        section03 += `    <td>${d01.relate_law ? d01?.relate_law : ''}</td>`;
        section03 += `    <td>${d01.risk_type ? getRiskType(d01?.risk_type) : ''}</td>`;
        section03 += `    <td>${d01.reduce_reponse ? d01?.reduce_reponse : ''}</td>`;
        section03 += `    <td></td>`;
        section03 += `    <td></td>`;
        section03 += `    <td></td>`;
        section03 += `</tr>`;

        d01.depth02.forEach(function(d02) {
            section03 += `<tr>`;
            section03 += `    <td colspan="3"></td>`;
            section03 += `    <td>${d02?.risk_factor_type ? d02?.risk_factor_type : ''}</td>`;
            section03 += `    <td>${d02?.related_guide ? d02?.related_guide : ''}</td>`;
            section03 += `    <td>${d02?.relate_law ? d02?.relate_law : ''}</td>`;
            section03 += `    <td>${d02?.risk_type ? getRiskType(d02?.risk_type) : ''}</td>`;
            section03 += `    <td>${d02?.reduce_reponse ? d02?.reduce_reponse : ''}</td>`;
            section03 += `    <td></td>`;
            section03 += `    <td></td>`;
            section03 += `    <td></td>`;
            section03 += `</tr>`;
        });

    });
    $('#main_tbody, #pop_main_tbody').append(section03);

    function getRiskType(riskType) {
        if(riskType+'' === '0') {
            return '상';
        }else if(riskType+'' === '1') {
            return '중';
        }else {
            return '하';
        }
    }

    let section04 = ``;
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
                        makeSection04(response);

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

        return section04;
    }

    if(!data.related_acid_no && !data.tag) {
        $('#section01 .list-wrap').remove();
    }

    $('#section03').after(section04);
}

// 등록된 태그, 사고사례 - li 만들기
function makeLi(value) {
    return `<li class="tag-item">${value}</li>`;
}

// 목록으로
function goList() {
    location.href='main.html?menu=adm_risk_list';
}

// 템플릿 편집
function goEdit() {
    location.href='main.html?menu=adm_risk_adj&pk='+PK;
}