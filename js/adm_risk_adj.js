let PAGE_NO = 1;
let PAGE_SIZE = 10;
let AC_ARR = [];

$(function() {
    init();
});

// 최초 실행 함수
function init() {
    setInfo();
    setTagEvent(3, false);
    setCaseList();

    $(".modal_case .searchTerm").on("keyup",function(key){
        if(key.keyCode === 13) setCaseList();
    });
}

// 위험성 평가표 전체 내용 셋팅
function setInfo() {
    const data = getInfo();
    setSection01(data);
    setSection02(data);
    setSection03(data);
    setSection04(data);
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

// 등록자 정보 및 위험성 평가표 제목 셋팅
function setSection01(data) {
    const open_yn = data.visibled;
    $('#user_name').text(data.user_name);
    $('#basic_info').html(
        `등록일 : ${data.created_date.substring(0,10)}&nbsp;&nbsp;|&nbsp;&nbsp;
        열람횟수 : ${data.views}&nbsp;&nbsp;|&nbsp;&nbsp;
        좋아요 수 : ${data.likes}`);
    $('#list_title').val(data.name);
    (open_yn === 'Y') && $('#open_yn').click();
}

// 태그 및 사고사례 셋팅
function setSection02(data) {
    if(data.tag) {
        data.tag?.split(',').forEach(function(tag) {
            if(tag) makeTagBox($("#tag-list"),tag);
        });
    }

    if(data.related_acid_no) {
        let bottomAcidArea = ``;

        // 최하단 사고사례 엘리먼트 생성 함수
        function makeBottomAcidArea(data) {
            let imgElem = ``;
            if (data?.image) {
                imgElem = `
            <div class="news_img">
                <img src="https://api.safeapp.codeidea.io${data.image}" alt="">
            </div>
            `;
            }

            bottomAcidArea += `
            <article class="cont_box news section03" id="unique${data.id}">
                <div class="txt_box">
                    <div class="tit">${data.title}</div>
                    <div class="txt mt30 fc_gy" style="height: auto">
                        <div class="form_table form_table2">
                            <table>
                                <tbody>
                                <tr>
                                    <td class="bg">사고발생일시</td>
                                    <td>${data.accident_at.substring(0, 10) + ' ' + data.accident_at.substring(11, 16)}</td>
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

            return bottomAcidArea;
        }

        data.related_acid_no?.split(',').forEach(function(acid,idx) {
            if(acid) {
                commonAjax(
                    'GET',
                    '/board/accExp/find/'+acid,
                    false,
                    false,
                    {},
                    function(response) {
                        // 최하단 사고사례 내용 셋팅
                        makeBottomAcidArea(response);

                        // 사고사례 내용 셋팅
                        $('#case-list').append(`<li class="tag-item" data-pk="${response.id}"><span class="tag-item-value">${response.title}</span><span class="del-btn" onclick="delCase(${response.id})">X</span></li>`);
                    },
                    function(error) {

                    });
            }
        });

        $('#main_article').after(bottomAcidArea);
    }
}

// 작업개요 셋팅
function setSection03(data) {
    $('#subject').val(data.instruct_work);
    $('#subject_detail').val(data.instruct_detail);
    $('#datepicker1').val(data.work_start_at.substring(0,10));
    $('#datepicker2').val(data.work_end_at.substring(0,10));
}

// 위험성 평가표 테이블 내용 셋팅
function setSection04(data) {
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

    let detailElem = ``;
    console.log(newDetails)
    newDetails.forEach(function(d01,idx) {
        detailElem += `
        <tfoot class="lv1" style="display: contents">
            <tr>
                <td>
                    <input type="text" class="tb_text01" value="${d01.contents ? d01?.contents : ''}">
                </td>
                <td>
                    <input type="text" class="tb_text02" value="${d01.address ? d01.address : ''}">
                </td>
                <td>
                    <input type="text" class="tb_text03" value="${d01.tools ? d01?.tools : ''}">
                </td>
                <td>
                    <select class="tb_select01">
                        <option value="기계(설비)적 요인" ${d01.risk_factor_type === '기계(설비)적 요인' && 'selected'}>기계(설비)적 요인</option>
                        <option value="전기적 요인" ${d01.risk_factor_type === '전기적 요인' && 'selected'}>전기적 요인</option>
                        <option value="화학(물질)적 요인" ${d01.risk_factor_type === '화학(물질)적 요인' && 'selected'}>화학(물질)적 요인</option>
                        <option value="생물학적 요인" ${d01.risk_factor_type === '생물학적 요인' && 'selected'}>생물학적 요인</option>
                        <option value="작업특성요인" ${d01.risk_factor_type === '작업특성요인' && 'selected'}>작업특성요인</option>
                        <option value="작업환경요인" ${d01.risk_factor_type === '작업환경요인' && 'selected'}>작업환경요인</option>
                    </select>
                </td>
                <td>
                    <input type="text" class="tb_text04" value="${d01.related_guide ? d01?.related_guide : ''}">
                </td>
                <td>
                    <input type="text" class="tb_text05" value="${d01.relate_law ? d01?.relate_law : ''}">
                </td>
                <td>
                    <select class="tb_select02">
                        <option value="상" ${d01.risk_type === '0' && 'selected'}>상</option>
                        <option value="중" ${d01.risk_type === '1' && 'selected'}>중</option>
                        <option value="하" ${d01.risk_type === '2' && 'selected'}>하</option>
                    </select>
                </td>
                <td>
                    <input type="text" class="tb_text06" value="${d01.reduce_reponse ? d01?.reduce_reponse : ''}">
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
        `;

        d01.depth02.forEach(function(d02) {
            detailElem += `
            <tr class="lv2">
                <td colspan="3"></td>
                <td>
                    <select class="tb_select01">
                        <option value="기계(설비)적 요인" ${d02.risk_factor_type === '기계(설비)적 요인' && 'selected'}>기계(설비)적 요인</option>
                        <option value="전기적 요인" ${d02.risk_factor_type === '전기적 요인' && 'selected'}>전기적 요인</option>
                        <option value="화학(물질)적 요인" ${d02.risk_factor_type === '화학(물질)적 요인' && 'selected'}>화학(물질)적 요인</option>
                        <option value="생물학적 요인" ${d02.risk_factor_type === '생물학적 요인' && 'selected'}>생물학적 요인</option>
                        <option value="작업특성요인" ${d02.risk_factor_type === '작업특성요인' && 'selected'}>작업특성요인</option>
                        <option value="작업환경요인" ${d02.risk_factor_type === '작업환경요인' && 'selected'}>작업환경요인</option>
                    </select>
                </td>
                <td>
                    <input type="text" class="tb_text04" value="${d02.related_guide ? d02?.related_guide : ''}">
                </td>
                <td>
                    <input type="text" class="tb_text05" value="${d02.relate_law ? d02?.relate_law : ''}">
                </td>
                <td>
                    <select class="tb_select02">
                        <option value="상" ${d02.risk_type === '0' && 'selected'}>상</option>
                        <option value="중" ${d02.risk_type === '1' && 'selected'}>중</option>
                        <option value="하" ${d02.risk_type === '2' && 'selected'}>하</option>
                    </select>
                </td>
                <td>
                    <input type="text" class="tb_text06" value="${d02.reduce_reponse ? d02?.reduce_reponse : ''}">
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
        });

        detailElem += `</tfoot>`;
    });

    $('#main_tbody').append(detailElem);
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
                <option value="상">상</option>
                <option value="중">중</option>
                <option value="하">하</option>
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
                    <option value="상">상</option>
                    <option value="중">중</option>
                    <option value="하">하</option>
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

// 수정
function update() {
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
                        instruct_work : $subject.val(),
                        instruct_detail : $subject_detail.val(),
                        work_start_at : $datepicker1.val()+'T00:00:00',
                        work_end_at : $datepicker2.val()+'T00:00:00'
                    }

                    // 위험성 평가표 수정
                    commonAjax(
                        'PUT',
                        '/riskCheck/edit/'+PK,
                        true,
                        false,
                        submitData01,
                        function(response) {
                            succ(response);
                        },
                        function(error) {

                        });

                }).then((arg) =>{
                    let parentOrders = 0;
                    let ordersLv1 = 0;
                    let ordersLv2 = 100;
                    let detailArr = [];

                    $('#main_tbody .lv1').each(function(idx,elem) {
                        parentOrders++;
                        ordersLv1++;

                        const temp = $(elem).find('tr:eq(0)');

                        detailArr.push({
                            contents: $(temp).find('.tb_text01').val(),
                            address: $(temp).find('.tb_text02').val(),
                            tools: $(temp).find('.tb_text03').val(),
                            risk_factor_type : $(temp).find('.tb_select01').val(),
                            relate_guide : $(temp).find('.tb_text04').val(),
                            relate_law : $(temp).find('.tb_text05').val(),
                            risk_type : $(temp).find('.tb_select02').val(),
                            reduce_response : $(temp).find('.tb_text06').val(),
                            orders: ordersLv1,
                            parent_depth: 0,
                            parent_orders: parentOrders
                        });

                        $(elem).find('.lv2').each(function(idx2,elem2) {
                            parentOrders++;
                            ordersLv2++;

                            detailArr.push({
                                risk_factor_type : $(elem2).find('td:eq(1)').find('select').val(),
                                relate_guide : $(elem2).find('td:eq(2)').find('input[type=text]').val(),
                                relate_law : $(elem2).find('td:eq(3)').find('input[type=text]').val(),
                                risk_type : $(elem2).find('td:eq(4)').find('select').val(),
                                reduce_response : $(elem2).find('td:eq(5)').find('input[type=text]').val(),
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
}