let LIST;
let PAGE_SIZE = 10;
let PAGE_NO = 1;
let PK = 0;

$(function() {
    init();
});

// 최초 실행
function init() {
    PK = new URL(window.location.href).searchParams.get('pk');

    // TODO : 사용자 정보 조회

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

    const $userInfo = $('#user_info');
    $userInfo.find('li:eq(0) span:eq(1)').text(11);
    $userInfo.find('li:eq(1) span:eq(1)').text(22);
    $userInfo.find('li:eq(2) span:eq(1)').text(33);

    setList();
    setKakaoMap();

    // 파일 탐색기에서 취소 버튼 클릭시 파일 value가 null로 변하는데 그에 대한 이벤트는 없는것 같아서 새로 만들었음
    $('#chooseFile').on('change',function() {
        if($(this)[0].files.length === 0) {
            const $img = $('#drop-file .preview');
            $img.attr('src','');
            $img.hide();
        }
    });
}

// 회원정보, 프로젝트 목록 탭 클릭 이벤트
function moveTab(type) {
    const url = type === 1 ? 'main.html?menu=adm_member_adj' : 'main.html?menu=adm_member_project';
    location.href = url + '&pk='+PK;
}

// 태이블 내용 만들기
function setList(pageNo = 0) {
    if(pageNo) PAGE_NO = pageNo;
    let data = getList();
    let result = ``;
    let count = 0;

    data.list = [{},{}];
    data.count = 35;

    LIST = data.list;

    // TODO : 데이터 바인딩

    if(data.count > 0) {
        count = data.count - PAGE_SIZE * (PAGE_NO - 1);

        data.list.forEach(function (data, idx) {
            result += `
            <tr onclick="showProject(1)">
                <td>${count - idx}</td>
                <td><p class="pj_nm">asdfasdfasdf</p></td>
                <td>2022-10-11</td>
                <td>그룹원</td>
            </tr>
            `;
        });

        $('#main_tbody').html(result);

        makePaging(Math.ceil(data.count / PAGE_SIZE), PAGE_NO, setList);
    }
}

// 리스트 가져오기
function getList() {
    // TODO : 리스트 조회

    let result = {};

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

// 프로젝트 상세화면 모달
function showProject(pk) {
    // TODO : 프로젝트 상세정보 가져오기

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

    // TODO : 프로젝트 데이터 바인딩

    const modalTbody = $('#project_info table tbody');
    modalTbody.find('tr:eq(0) td:eq(1)').text(11);
    modalTbody.find('tr:eq(1) td:eq(1)').text(22);
    modalTbody.find('tr:eq(2) td:eq(1)').text(33);
    modalTbody.find('tr:eq(3) td:eq(1)').text(44);
    modalTbody.find('tr:eq(4) td:eq(1)').text(55);
    modalTbody.find('tr:eq(5) td:eq(1)').text(66);
    modalTbody.find('tr:eq(6) td:eq(1)').html(`<img src="./resources/img/icon/n_img.png" alt="이미지">`);

    openModal('project_info');
}

// 프로젝트 추가
function insertProject() {
    const $project = $('#project');
    const $name = $project.find('#p_name');
    const $startDate = $project.find('#datepicker1');
    const $endDate = $project.find('#datepicker2');
    const $count = $project.find('#result');
    const $address = $project.find('#address_kakao');
    const $address_detail = $project.find('#address_detail');
    const $comments = $project.find('#text_word');
    const $chooseFile = $('#chooseFile');
    const $img = $chooseFile[0].files;

    $project.find('.error').hide();

    if(!$name.val()) {
        $name.parent().find('.error').show();
        $name.focus();

    }else if(!$startDate.val()) {
        $startDate.parent().find('.error').show();
        $startDate.focus();

    }else if(!$endDate.val()) {
        $endDate.parent().find('.error').show();
        $endDate.focus();

    }else if(Number($count.text()) < 0) {
        $count.parent().find('.error').show();
        $count.focus();

    }else if(!$address.val()) {
        $address.parent().find('.error:eq(0)').show();
        $address.focus();

    }else if(!$address_detail.val()) {
        $address_detail.parent().find('.error:eq(1)').show();
        $address_detail.focus();

    }else if(!$comments.val()) {
        $comments.parent().find('.error').show();
        $comments.focus();

    }else if($img.length === 0) {
        $chooseFile.parent().find('.error').show();
        $chooseFile.focus();

    }else {
        modalConfirm('프로젝트를 추가하시겠습니까?', '취소', '추가', function() {
            // TODO : 프로젝트 추가

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
            let formData = new FormData();

            formData.append('userPk', PK);
            formData.append('name', $name.val());
            formData.append('startDate', $startDate.val());
            formData.append('endDate', $endDate.val());
            formData.append('count', $count.text());
            formData.append('address', $address.val());
            formData.append('address_detail', $address_detail.val());
            formData.append('comments', $comments.val());
            formData.append('file', $img[0]);

            for (let key of formData.keys()) {
                console.log(key, ":", formData.get(key));
            }

            modalAlert('추가되었습니다.',function() {
                modalToggle($project);
                setList();
            });
        });
    }
}