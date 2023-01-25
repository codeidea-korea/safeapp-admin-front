$(function() {
    init();
});

// 최초 실행 함수
function init() {
    $('#user_name').text(getUserInfo().user_name);
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

    }else if($tag_list.find('li').length <= 0) {
        modalAlert('태그를 입력해주세요.',function() {
            $('#tag').focus();
        });

    }else if($case_list.find('li').length <= 0) {
        modalAlert('사고사례를 선택해주세요.', function () {
            showCase();
        });

    }else if(!$subject.val()) {
        modalAlert('작업공종을 입력해주세요.',function() {
            $subject.focus();
        });

    }else if(!$subject_detail.val()) {
        modalAlert('세부공종을 입력해주세요.',function() {
            $subject_detail.focus();
        });

    }else if(!$datepicker1.val()) {
        modalAlert('작업기간을 입력해주세요.',function() {
            $datepicker1.focus();
        });

    }else if(!$datepicker2.val()) {
        modalAlert('작업기간을 입력해주세요.',function() {
            $datepicker2.focus();
        });

    }else {
        let flag = true;

        $('#main_tbody').find('input[type=text], select').each(function(idx,elem) {
            if(!$(elem).val()) {
                modalAlert('내용을 확인해주세요.',function() {
                    $(elem).focus();
                });

                flag = false;
                return flag;
            }
        });

        if(flag) {
            modalConfirm('저장하시겠습니까?','취소','저장',function() {
                // TODO : 위험성 평가표 내용 저장
                // TODO : 위험성 평가표 컨텐츠들을 어떤 형식으로 배열에 담을까

                // $('#open_yn').val()

                modalAlert('저장되었습니다.',function() {
                    goList();
                });
            });
        }
    }
}