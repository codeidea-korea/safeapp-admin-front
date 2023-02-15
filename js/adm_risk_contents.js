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
    let result = {};
    PK = new URL(window.location.href).searchParams.get('pk');
    PK = 4538;

    commonAjax(
        'GET',
        '/riskCheck/find/'+PK,
        false,
        false,
        {},
        function(response) {

        },
        function(error) {

        });

    return result;
}

// 정보 셋팅
function setInfo() {
    const data = getInfo();

    const section01 = `
    <div class="write_wrap">
        <div class="user_img"></div>
        <div class="write_info ml10">
            <p>유저1</p>
            <p class="fs-sm">등록일 : 2022-11-03</p>
        </div>
    </div>
    <div class="title mt20">
        <span class="fwb fs-xlg pa20">거푸집 동바리 설치 위험성 평가표</span>
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
    <h3 class="fs-lg mb20">작업개요</h3>
    <div class="form_table form_table2">
        <table>
            <tbody>
            <tr>
                <td class="bg">작업공종</td>
                <td>굴착작업</td>
            </tr>
            <tr>
                <td class="bg">세부공종</td>
                <td>굴착작업</td>
            </tr>
            <tr>
                <td class="bg">작업기간</td>
                <td>2022-10-02 ~ 2022-10-05</td>
            </tr>
            </tbody>
        </table>
    </div>
    `;

    const section03 = `
    <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td colspan="3"></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td colspan="3"></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td colspan="3"></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td colspan="3"></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    `;

    const section04 = `
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

    $('#section01, #pop_section01').html(section01);
    $('#section02, #pop_section02').html(section02);
    $('#main_tbody, #pop_main_tbody').append(section03);
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
function goEdit(pk) {
    location.href='main.html?menu=adm_risk_adj&pk='+pk;
}