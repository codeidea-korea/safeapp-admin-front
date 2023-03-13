let PAGE_NO = 1;
let PAGE_SIZE = 10;
let AC_ARR = [];

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

    const $section03Elem = $('.section03');

    if($section03Elem.length > 0) {
        $section03Elem.after(section03);
    }else {
        $('#main_article').after(section03);
    }
}

// 라인 추가
function makeLine(lv, elem, type) {
    const line = makeLineElem(lv);

    if(lv === 1) {
        $('#main_tbody').append(line);

    }else {
        if(type === 'A') {
            // 화살표를 누르면 가장 아래에 생성
            $(elem).closest('.lv1').append(line);
        }else {
            // 더하기를 누르면 바로 아래에 생성
            $(elem).closest('tr').after(line);
        }
    }
}

// 라인 엘리먼트 생성
function makeLineElem(lv) {
    const lv2 = `
    <tr class="lv2">
        <td colspan="3"></td>
        <td>
            <select>
                <option value="기계(설비)적 요인">기계(설비)적 요인</option>
                <option value="전기적 요인">전기적 요인</option>
                <option value="화학(물질)적 요인">화학(물질)적 요인</option>
                <option value="생물학적 요인">생물학적 요인</option>
                <option value="작업특성요인">작업특성요인</option>
                <option value="작업환경요인">작업환경요인</option>
            </select>
        </td>
        <td>
            <input type="text">
        </td>
        <td>
            <input type="text">
        </td>
        <td>
            <select>
                <option value="0">상</option>
                <option value="1">중</option>
                <option value="2">하</option>
            </select>
        </td>
        <td>
            <input type="text">
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>
            <div class="adj-btn">
                <div class="plus-button" onclick="makeLine(2,this,'P')"></div>
                <div class="plus-button minus-button" onclick="removeLine(2,this)"></div>
            </div>
        </td>
    </tr>
    `;

    const lv1 = `
    <tfoot class="lv1" style="display: contents">
        <tr>
            <td>
                <input type="text" class="tb_text01">
            </td>
            <td>
                <input type="text" class="tb_text02">
            </td>
            <td>
                <input type="text" class="tb_text03">
            </td>
            <td>
                <select class="tb_select01">
                    <option value="기계(설비)적 요인">기계(설비)적 요인</option>
                    <option value="전기적 요인">전기적 요인</option>
                    <option value="화학(물질)적 요인">화학(물질)적 요인</option>
                    <option value="생물학적 요인">생물학적 요인</option>
                    <option value="작업특성요인">작업특성요인</option>
                    <option value="작업환경요인">작업환경요인</option>
                </select>
            </td>
            <td>
                <input type="text" class="tb_text04">
            </td>
            <td>
                <input type="text" class="tb_text05">
            </td>
            <td>
                <select class="tb_select02">
                    <option value="0">상</option>
                    <option value="1">중</option>
                    <option value="2">하</option>
                </select>
            </td>
            <td>
                <input type="text" class="tb_text06">
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
                <div class="adj-btn">
                    <div class="plus-button" onclick="makeLine(1)"></div>
                    <div class="plus-button minus-button" onclick="removeLine(1,this)"></div>
                    <div class="plus-button arrow-button" onclick="makeLine(2,this,'A')"></div>
                </div>
            </td>
        </tr>
        ${lv2}
    </tfoot>
    `;

    if(lv === 1) {
        return lv1;
    }else {
        return lv2;
    }
}

// 라인 제거
function removeLine(lv, elem) {
    if((lv === 1 && $('.lv1').length === 1) || (lv === 2 && $(elem).closest('.lv1').find('.lv2').length === 1)) {
        modalAlert('제거할 수 없습니다.');
        return false;

    }else {
        let $target = '';
        const msg = lv === 1 ? '하위 내용이 모두 제거됩니다.<br/>제거하시겠습니까?' : '제거하시겠습니까?';

        modalConfirm(msg,'취소','제거',function() {
            switch(lv) {
                case 1:
                    $target = $(elem).closest('.lv1');
                    break;

                case 2:
                    $target = $(elem).closest('.lv2');
                    break;
            }

            $target.remove();
        });
    }
}

// 리스트 화면으로
function goList() {
    location.href='main.html?menu=adm_risk_list';
}

// 저장
function save() {
    const $title = $('#list_title');
    const $tag_list = $('#tag-list');
    const $case_list = $('#case-list');
    const $subject = $('#subject');
    const $subject_detail = $('#subject_detail');
    const $datepicker1 = $('#datepicker1');
    const $datepicker2 = $('#datepicker2');

    if(!$title.val()) {
        modalAlert('제목을 입력해주세요.',function() {
            $title.focus();
        });

    }/*else if($tag_list.find('li').length <= 0) {
        modalAlert('태그를 입력해주세요.',function() {
            $('#tag').focus();
        });

    }else if($case_list.find('li').length <= 0) {
        modalAlert('사고사례를 선택해주세요.', function () {
            showCase();
        });

    }*/else if(!$subject.val()) {
        modalAlert('작업공종을 입력해주세요.',function() {
            $subject.focus();
        });

    }/*else if(!$subject_detail.val()) {
        modalAlert('세부공종을 입력해주세요.',function() {
            $subject_detail.focus();
        });

    }*/else if(!$datepicker1.val()) {
        modalAlert('작업기간을 입력해주세요.',function() {
            $datepicker1.focus();
        });

    }else if(!$datepicker2.val()) {
        modalAlert('작업기간을 입력해주세요.',function() {
            $datepicker2.focus();
        });

    }else {
        let flag = true;

        /*$('#main_tbody').find('input[type=text], select').each(function(idx,elem) {
            if(!$(elem).val()) {
                modalAlert('내용을 확인해주세요.',function() {
                    $(elem).focus();
                });

                flag = false;
                return flag;
            }
        });*/

        if(flag) {
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
                        admin_id: getUserInfo().id,
                        tag: inputItems.join(','),
                        visibled: $('#open_yn').val(),
                        related_acid_no: related_acid_no.join(','),
                        instruct_work : $subject.val(),
                        instruct_detail : $subject_detail.val(),
                        work_start_at : $datepicker1.val()+'T00:00:00',
                        work_end_at : $datepicker2.val()+'T00:00:00'
                    }

                    // 위험성 평가표 등록
                    commonAjax(
                        'POST',
                        '/riskCheck/add',
                        true,
                        false,
                        submitData01,
                        function(response) {
                            succ(response);
                        },
                        function(error) {

                        });

                }).then((arg) =>{
                    const parentPk = arg.id;
                    let parentOrders = 0;
                    let ordersLv1 = 0;
                    let ordersLv2 = 100;
                    let detailArr = [];

                    $('#main_tbody .lv1').each(function(idx,elem) {
                        parentOrders++;
                        ordersLv1++;

                        const temp = $(elem).find('tr:eq(0)');

                        detailArr.push({
                            risk_check_id: parentPk,
                            contents: $(temp).find('.tb_text01').val(),
                            address: $(temp).find('.tb_text02').val(),
                            tools: $(temp).find('.tb_text03').val(),
                            risk_factor_type : $(temp).find('.tb_select01').val(),
                            related_guide : $(temp).find('.tb_text04').val(),
                            related_law : $(temp).find('.tb_text05').val(),
                            risk_type : $(temp).find('.tb_select02').val(),
                            reduce_response : $(temp).find('.tb_text06').val(),
                            depth: 1,
                            orders: ordersLv1,
                            parent_depth: 0,
                            parent_orders: parentOrders
                        });

                        $(elem).find('.lv2').each(function(idx2,elem2) {
                            parentOrders++;
                            ordersLv2++;

                            detailArr.push({
                                risk_check_id: parentPk,
                                contents: '',
                                address: '',
                                tools: '',
                                risk_factor_type : $(elem2).find('td:eq(1)').find('select').val(),
                                related_guide : $(elem2).find('td:eq(2)').find('input[type=text]').val(),
                                related_law : $(elem2).find('td:eq(3)').find('input[type=text]').val(),
                                risk_type : $(elem2).find('td:eq(4)').find('select').val(),
                                reduce_response : $(elem2).find('td:eq(5)').find('input[type=text]').val(),
                                depth: 2,
                                orders: ordersLv2,
                                parent_depth: ordersLv1,
                                parent_orders: parentOrders
                            });
                        });
                    });

                    let cnt = 0;
                    detailArr.forEach(function(data) {
                        // 위험성 평가표 상세 내용 등록
                        commonAjax(
                            'POST',
                            '/riskCheck/detail/add',
                            true,
                            false,
                            data,
                            function(response) {
                                cnt++;

                                if(cnt === detailArr.length) {
                                    modalAlert('저장되었습니다.',goList);
                                }
                            },
                            function(error) {

                            });
                    });
                });
            });
        }
    }
}