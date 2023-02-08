let LIST;
let PAGE_SIZE = 10;
let PAGE_NO = 1;
let PK = 0;

$(function() {
    init();
});

// 최초 실행
function init() {
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

// 리스트 가져오기
function getList() {
    PK = new URL(window.location.href).searchParams.get('pk');
    let result = {};

    commonAjax(
        'GET',
        '/user/find/'+PK+'/project?pageNo='+PAGE_NO+'&pageSize='+PAGE_SIZE,
        false,
        false,
        {},
        function(response) {
            result['myAuth'] = response.data.myAuth;
            result['myProjectList'] = response.data.myProjectList;
        },
        function(error) {

        });

    return result;
}

// 태이블 내용 만들기
function setList(pageNo = 0) {
    if(pageNo) PAGE_NO = pageNo;

    const data = getList();
    const count = data.myProjectList.count - PAGE_SIZE * (PAGE_NO - 1);

    const $userInfo = $('#user_info');
    $userInfo.find('li:eq(0) span:eq(1)').text(data.myAuth.user_id);
    $userInfo.find('li:eq(1) span:eq(1)').text(data.myAuth.user_name);
    $userInfo.find('li:eq(2) span:eq(1)').text(data.myAuth.order_type ? data.myAuth.order_type : '');

    let result = ``;

    if(data.myProjectList.count > 0) {
        data.myProjectList.list.forEach(function (data, idx) {
            result += `
            <tr onclick="showProject(${data.id})">
                <td>${count - idx}</td>
                <td><p class="pj_nm">${data.name}</p></td>
                <td>${data.updated_at ? data.updated_at.substring(0,10) : ''}</td>
                <td>${getAuthType(data.user_auth_type)}</td>
            </tr>
            `;
        });

    }else {
        result += `<tr><td colspan="4">결과가 존재하지 않습니다.</td></tr>`;
    }

    $('#main_tbody').html(result);
    makePaging(Math.ceil(data.myProjectList.count / PAGE_SIZE), PAGE_NO, setList);

    // TODO : 어떤 경우에 프로젝트 생성이 가능한지 알고 로직을 처리해야함
    // 일단 order_type이 없는 경우는 프로젝트 추가 못하게 막음
    if(!data.myAuth.order_type) $('#project_add_btn').remove();
}

// 프로젝트 상세화면 모달
function showProject(pk) {
    // TODO : 프로젝트 상세정보 가져오기

    commonAjax(
        'GET',
        '/project/find/'+pk,
        false,
        false,
        {},
        function(response) {
            const result = response.data;

            const modalTbody = $('#project_info table tbody');
            modalTbody.find('tr:eq(0) td:eq(1)').text(result.name);
            modalTbody.find('tr:eq(1) td:eq(1)').text(result.start_at.substring(0,10));
            modalTbody.find('tr:eq(2) td:eq(1)').text(result.end_at.substring(0,10));
            modalTbody.find('tr:eq(3) td:eq(1)').text(result.max_user_count);
            modalTbody.find('tr:eq(4) td:eq(1)').html(result.address + `<br/>` + result.address_detail);
            modalTbody.find('tr:eq(5) td:eq(1)').text(result.contents);
            modalTbody.find('tr:eq(6) td:eq(1)').html(`<img src="https://api.safeapp.codeidea.io${result.image}" alt="이미지">`);

            openModal('project_info');
        },
        function(error) {

        });
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

    }else if(1 === 0) {
    // }else if($img.length === 0) {
        $chooseFile.parent().find('.error').show();
        $chooseFile.focus();

    }else {
        modalConfirm('프로젝트를 추가하시겠습니까?', '취소', '추가', function() {
            /*let formData = new FormData();
            formData.append('address', $address.val());
            formData.append('address_detail', $address_detail.val());
            formData.append('contents', $comments.val());
            formData.append('end_at', $endDate.val());
            formData.append('image', $img[0]);
            formData.append('max_user_count', $count.text());
            formData.append('name', $name.val());
            formData.append('start_at', $startDate.val());
            formData.append('status', 'NONE');
            formData.append('user_id', PK);

            for (let key of formData.keys()) {
                console.log(key, ":", formData.get(key));
            }*/

            let submitData = {};
            submitData['address'] = $address.val();
            submitData['address_detail'] = $address_detail.val();
            submitData['contents'] = $comments.val();
            submitData['end_at'] = $endDate.val() + ' 00:00:00';
            submitData['image'] = '';
            submitData['max_user_count'] = Number($count.text());
            submitData['name'] = $name.val();
            submitData['start_at'] = $startDate.val() + ' 00:00:00';
            submitData['status'] = 'NONE';
            submitData['user_id'] = Number(PK);

            commonAjax(
                'POST',
                '/project/add',
                true,
                false,
                submitData,
                function(response) {
                    modalAlert('추가되었습니다.',function() {
                        modalToggle($project);
                        setList();
                    });
                },
                function(error) {

                });
        });
    }
}