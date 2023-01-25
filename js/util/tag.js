function setTagEvent(max = 10, isHide=true) {
    const $tag = $("#tag");

    if(isHide) {
        $tag.hide();

        $('.tag_add').on('click',function(){
            $("#tag").slideToggle("normal");
        });
    }

    $tag.on("keyup", function (e) {
        let self = $(this);

        if (e.key === "Enter") {
            e.preventDefault(); // SpaceBar 시 빈공간이 생기지 않도록 방지

            if($('#tag-list .tag-item').length < max) {
                let tagValue = self.val(); // 값 가져오기

                // 값이 없으면 동작 안합니다.
                if (tagValue !== "") {
                    let result = 0;

                    // 같은 태그가 있는지 검사
                    $('#tag-list .tag-item .tag-item-value').each(function(idx,elem) {
                        if($(elem).text() === tagValue) {
                            result++;
                            return false;
                        }
                    });

                    if (result === 0) {
                        makeTagBox($("#tag-list"),tagValue);
                    }
                }
            }else {
                modalAlert('최대 ' + max + '개 등록 가능합니다.');
            }

            self.val("");
        }
    });

    // 삭제 버튼은 비동기적 생성이므로 document 최초 생성시가 아닌 검색을 통해 이벤트를 구현시킨다.
    $(document).on("click", ".del-btn", function () {
        $(this).parent().remove();
    });
}

function makeTagBox(elem,value) {
    $(elem).append("<li class='tag-item'><span class='tag-item-value'>" + value + "</span><span class='del-btn'>X</span></li>");
}