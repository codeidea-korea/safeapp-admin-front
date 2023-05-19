let PAGE_SIZE = 15;
let PAGE_NO = 1;

let GROUP_LIST = [];
let GROUP_PAGE_SIZE = 1000;
let GROUP_PAGE_NO = 1;

let PROJECT_NAME = '';
let PROJECT_PK = 0;

$(function() {
    init();
});

// 최초 실행
function init() {
    setList();
    setKakaoMap();

    $("#s_value").on("keyup",function(key){
        if(key.keyCode === 13) search();
    });

    // 파일 탐색기에서 취소 버튼 클릭시 파일 value가 null로 변하는데 그에 대한 이벤트는 없는것 같아서 새로 만들었음
    $('#chooseFile').on('change',function() {
        if($(this)[0].files.length === 0) {
            const $img = $('#drop-file .preview');
            $img.attr('src','');
            $img.hide();
        }
    });
}

// 태이블 내용 만들기
function setList(pageNo = 0) {
    if(pageNo) PAGE_NO = pageNo;

    const data = getList();
    const count = data.count - PAGE_SIZE * (PAGE_NO - 1);
    let result = `<tr><td colspan="11">결과가 존재하지 않습니다</td></tr>`;

    if(data.count > 0) {
        result = ``;
        data.list.forEach(function(data,idx) {
            result += `
            <tr>
                <td>${count - idx}</td>
                <td onclick="goDetail(${data.id})">
                    <p class="ho_line pj_nm">${data.name}</p>
                </td>
                <td>${data.created_at.substring(0,10)}</td>
                <td>${data.user_name}</td>
                <td>${data.temp_cnt}</td>
                <td>${data.check_cnt}</td>
                <td>${data.risk_cnt}</td>
                <td>${data.group_cnt}</td>
                <td class="layer_btn">
                    <a href="#none">
                        <img src="./resources/img/icon/edit.png" alt="프로젝트 관리" onclick="showProject(${data.id})">
                    </a>
                </td>
                <td class="layer_btn">
                    <a href="#none">
                        <img src="./resources/img/icon/member.png" alt="그룹원 목록" onclick="showGroup(${data.id},this)">
                    </a>
                </td>
                <td class="layer_btn">
                    <a href="#none">
                        <img src="./resources/img/icon/delete.png" alt="삭제" onclick="remove(${data.id})">
                    </a>
                </td>
            </tr>
            `;
        });
    }

    $('#main_tbody').html(result);
    makePaging(Math.ceil(data.count / PAGE_SIZE), PAGE_NO, setList, 'paging01');
}

// 리스트 가져오기
function getList() {
    let result = {};
    let url = '/project/list?pageNo='+PAGE_NO+'&pageSize='+PAGE_SIZE;

    const sValue = $('#s_value').val();
    const orderType = $('#s_type02').val();
    const status = $('#s_type03').val();
    const createdAtStart = $('#datepicker1').val();
    const createdAtEnd = $('#datepicker2').val();

    url += sValue ? '&'+$('#s_type01').val()+'='+sValue : '';   // 이름 검색
    url += orderType ? '&orderType='+orderType : '';    // 멤버십 유형
    url += status ? '&status='+status : ''; // 멤버십 상태
    url += createdAtStart ? '&createdAtStart='+createdAtStart : '';  // 결제일(시작)

    // createdAtEnd는 +1일 해서 보내라고 전달받음
    if(createdAtEnd) {
        const date = new Date(createdAtEnd);
        date.setDate(date.getDate() + 1);
        url += '&createdAtEnd='+changeDateFormat(date); // 결제일(종료)
    }

    commonAjax(
        'GET',
        url,
        false,
        false,
        {},
        function(response) {
            result['count'] = response.data.count;
            result['list'] = response.data.list;
        },
        function(error) {

        });

    return result;
}

// N개월 버튼 클릭
function setSearchDate(month) {
    if(month >= 0) {
        $('#datepicker1').val(todaySubMonth(month));
        $('#datepicker2').val(getToday());
    }else {
        $('#datepicker1').val('');
        $('#datepicker2').val('');
    }
}

// 검색
function search() {
    PAGE_NO = 1;
    setList();
}

// 프로젝트 상세 페이지로 이동
function goDetail(pk) {
    location.href='main.html?menu=adm_project_document&pk='+pk;
}

// 프로젝트 수정 모달
function showProject(pk) {
    commonAjax(
        'GET',
        '/project/find/'+pk,
        false,
        false,
        {},
        function(response) {
            PROJECT_PK = pk;
            const data = response.data;

            const $project = $('#project');
            $project.find('#p_name').val(data.name);
            $project.find('#datepicker3').val(data.start_at.substring(0,10));
            $project.find('#datepicker4').val(data.end_at.substring(0,10));
            $project.find('#result').text(data.max_user_count);
            $project.find('#address_kakao').val(data.address);
            $project.find('#address_detail').val(data.address_detail);
            $project.find('#text_word').val(data.contents);

            const $img = $('#drop-file .preview');
            $img.attr('src','https://api.safeapp.codeidea.io' + data.image);
            $img.show();

            openModal('project');
        },
        function(error) {

        });
}

// 프로젝트 수정
function updateProject() {
    const $project = $('#project');
    const $name = $project.find('#p_name');
    const $startDate = $project.find('#datepicker3');
    const $endDate = $project.find('#datepicker4');
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

    }/*else if(!$address_detail.val()) {
        $address_detail.parent().find('.error:eq(1)').show();
        $address_detail.focus();

    }*/else if(!$comments.val()) {
        $comments.parent().find('.error').show();
        $comments.focus();

    }else {
        modalConfirm('수정하시겠습니까?', '취소', '수정', function() {
            /*let formData = new FormData();
            formData.append('pk', PROJECT_PK);
            formData.append('name', $name.val());
            formData.append('startDate', $startDate.val());
            formData.append('endDate', $endDate.val());
            formData.append('count', $count.text());
            formData.append('address', $address.val());
            formData.append('address_detail', $address_detail.val());
            formData.append('comments', $comments.val());
            if($img.length > 0) {
                formData.append('file', $img[0]);
            }

            for (let key of formData.keys()) {
                console.log(key, ":", formData.get(key));
            }*/

            let image = '';

            new Promise( (succ, fail)=>{
                if($img.length > 0) {
                    let formData = new FormData();
                    formData.append('file', $img[0]);

                    commonMultiPartAjax(
                        'POST',
                        '/file/upload',
                        false,
                        formData,
                        function(response) {
                            image = response.web_file_nm;
                            succ();
                        },
                        function(error) {

                        });
                }else {
                    succ();
                }
            }).then(() =>{
                if(!image) {
                    // 새로운 이미지가 없으면 전에 저장된 이미지 경로 넣어줌
                    const temp = $('#drop-file .preview').attr('src').split('/upload');

                    if(temp.length > 1) {
                        image = '/upload' + temp[1];
                    }
                }

                let submitData = {};
                submitData['address'] = $address.val();
                /*submitData['address_detail'] = $address_detail.val();*/
                submitData['contents'] = $comments.val();
                submitData['end_at'] = $endDate.val() + ' 00:00:00';
                submitData['id'] = PROJECT_PK;
                submitData['image'] = image;
                submitData['max_user_count'] = Number($count.text());
                submitData['name'] = $name.val();
                submitData['start_at'] = $startDate.val() + ' 00:00:00';
                submitData['status'] = 'NONE';

                commonAjax(
                    'PUT',
                    '/project/edit/'+PROJECT_PK,
                    true,
                    false,
                    submitData,
                    function(response) {
                        modalAlert('수정되었습니다.',function() {
                            $chooseFile.val('');
                            modalToggle($project);
                            search();
                        });
                    },
                    function(error) {

                    });
            });
        });
    }
}

// 그룹원 목록 모달 오픈
function showGroup(pk,elem) {
    PROJECT_PK = pk;
    PROJECT_NAME = $(elem).closest('tr').find('.pj_nm').text();

    setGroupList();
    openModal('member');
}

// 그룹원 목록 셋팅
function setGroupList() {
    let data = getGroupList();
    let result = ``;

    data.forEach(function(data,idx) {
        result += `
        <tr data-pk="${data.id}">
            <td>${data.user_name}</td>
            <td>${data.email}</td>
            <td>`;

        // 마스터관리자가 아니면 권한 select box 보여주기
        if(data.user_auth_type !== 'TEAM_MASTER') {
            result += `
                <select className="member_auth" onchange="changeAuth(${idx},this)">
                    <option value="TEAM_MANAGER" ${data.user_auth_type === 'TEAM_MANAGER' && 'selected'}>관리자</option>
                    <option value="TEAM_USER" ${data.user_auth_type === 'TEAM_USER' && 'selected'}>그룹원</option>
                </select>`;
        }else {
            result += `마스터관리자`;
        }

        result += `
            </td>
            <td class="layer_btn">`;

        // 마스터관리자는 삭제 아이콘 없애기
        if(data.user_auth_type !== 'TEAM_MASTER') {
            result += `
                <a href="#none" class="confirm">
                    <img src="./resources/img/icon/delete.png" alt="삭제ico" onclick="removeGroupMember(${idx},this)">
                </a>
            `;
        }

        result += `
            </td>
        </tr>
        `;
    });

    $('#member_tbody').html(result);
    makePaging(Math.ceil(data.count / GROUP_PAGE_SIZE), GROUP_PAGE_NO, setGroupList, 'paging02');
}

// 그룹원 목록 리스트 구하기
function getGroupList() {
    let result = {};
    GROUP_LIST = [];

    commonAjax(
        'GET',
        '/project/find/'+PROJECT_PK+'/group/list?pageNo='+GROUP_PAGE_NO+'&pageSize='+GROUP_PAGE_SIZE,
        false,
        false,
        {},
        function(response) {
            result = response;
            GROUP_LIST = response;
        },
        function(error) {

        });

    return result;
}

// 그룹원 목록 - 그룹원 권한 변경시 발생 이벤트
function changeAuth(idx,elem) {
    GROUP_LIST[idx].user_auth_type = elem.value;
}

// 그룹원 목록 - 삭제 아이콘 클릭
function removeGroupMember(idx,elem) {
    modalConfirm('그룹원을 삭제하시겠습니까?','취소','삭제',function() {
        GROUP_LIST[idx].delete_yn = true;
        $(elem).closest('tr').remove();
    });
}

// 그룹원 목록 - 저장버튼 클릭
function saveGroupMember() {
    modalConfirm('저장하시겠습니까?','취소','저장',function() {
        commonAjax(
            'PUT',
            '/project/group/editList',
            true,
            false,
            GROUP_LIST,
            function(response) {
                modalAlert('저장되었습니다.',function() {
                    modalToggle($('#member'));
                    search();
                });
            },
            function(error) {

            });
    });
}

// 그룹원 추가 버튼 클릭
function addGroupMember() {
    const $popup = $('#member_add');
    $popup.find('.layer_cont .tit').text(PROJECT_NAME);
    modalToggle($popup);
}

// 그룹원 추가 - 이메일주소 +,-버튼 클릭
function controlEmailBox(elem,type = true) {
    const $emailBox = $(elem).closest('.email_box');

    // + 버튼
    if(type) {
        $emailBox.after(`
            <div style="position:relative" class="email_box">
                <input type="email"  class="th_80 mb10"autocomplete="off" placeholder="이메일주소">
                <div class="adj-btn"style="left:82%">
                    <div class="plus-button"onclick="controlEmailBox(this)"></div>
                    <div class="plus-button minus-button" onclick="controlEmailBox(this,false)"></div>
                </div>
            </div>
        `);

    // - 버튼
    }else {
        if($('.email_box').length > 1) {
            $emailBox.remove();
        }
    }
}

// 그룹원 추가 - 초청메일 보내기
function sendMail() {
    let flag = true;
    let emailArr = [];

    $('.email_box').each(function(idx,elem) {
        if(!isEmail($(elem).find('input[type=email]').val())) {
            modalAlert('이메일을 확인해주세요.');
            flag = false;
            return flag;

        }else {
            emailArr.push($(elem).find('input[type=email]').val());
        }
    });

    if(!flag) return;

    if(!$('#member_add_textarea').val()) {
        modalAlert('내용을 확인해주세요.');

    }else {
        modalConfirm('초청메일을 발송하시겠습니까?','취소','확인',function() {
            const content = '?content=' + $('#member_add_textarea').val();
            const id = '&id=' + PROJECT_PK;

            let emails = '';
            emailArr.forEach(function(data) {
               emails += '&emails=' + data;
            });

            commonAjax(
                'POST',
                '/project/group/addList' + content + id + emails,
                false,
                false,
                {},
                function(response) {

                },
                function(error) {

                });

            modalAlert('초청메일이 발송되었습니다.',function() {
                modalToggle($('#member_add'));
            });
        });
    }
}

// 삭제버튼 클릭
function remove(pk) {
    modalConfirm('삭제하시겠습니까?','취소','삭제',function() {
        commonAjax(
            'DELETE',
            '/project/remove/'+pk,
            false,
            false,
            {},
            function(response) {
                modalAlert('삭제되었습니다.',search);
            },
            function(error) {

            });
    });
}