function makePaging(pageLength, targetPage, callback, elemId) {
    let $pagination = !elemId ? $('.pagination') : $('#'+elemId);
    let html = "";
    let active = "";
    let style = "";
    let prevPage = 1;
    let nextPage = 1;

    if(targetPage > 1) {
        prevPage = targetPage-1;
    }

    if(targetPage < pageLength) {
        nextPage = targetPage+1;

    }else if(targetPage === pageLength) {
        nextPage = targetPage;
    }

    html += '<ul>';
    html += '<li data-pageNum="1"><a class="paging-btn p-prev" href="javascript:;">맨처음</a></li>';
    html += '<li data-pageNum="'+(prevPage)+'"><a class="paging-btn prev" href="javascript:;">이전</a></li>';

    let startNo = 0;
    let endNo = 10;

    if(pageLength > 10) {
        if(targetPage-5 > 0) {
            if(targetPage+5 <= pageLength) {
                startNo = targetPage-6;

            }else {
                startNo = pageLength-10;
            }
        }

        if(targetPage > 5) {
            if(targetPage+5 <= pageLength) {
                endNo = targetPage+4;

            }else {
                endNo = pageLength;
            }
        }
    }else {
        endNo = pageLength;
    }

    for(let i = startNo; i < endNo; i++) {
        if((i+1) === targetPage) {
            active = "active";
        } else {
            active = "";
        }

        html += '<li class=\"'+active+'\" data-pageNum="'+(i+1)+'" style="'+style+'"><a href=\"javascript:;\">'+(i+1)+'</a></li>';
    }

    html += '<li data-pageNum="'+nextPage+'"><a class="paging-btn next" href="javascript:;">다음</a></li>';
    html += '<li data-pageNum="'+pageLength+'"><a class="paging-btn n-next" href="javascript:;">마지막</a></li>';
    html += '</ul>';

    $pagination.html(html);

    $pagination.find('ul li').click(function() {
        callback(Number($(this).data("pagenum")));
    });
}