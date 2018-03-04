// https://en.wikipedia.org/w/api.php?action=query&list=allcategories&acprop=size%20&acprefix=programming&format=json
// https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&titles=&srsearch=query&srwhat=text

// function getArticles() {
//     $.ajax({
//         url: 'https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=10',
//         dataType: 'jsonp',
//         crossDomain: true,
//         success: function (data) {
//             //  getUrl()
//             getPagesByTitles();
//         }
//     });
// }

function makeWikiUrl(article) {
    return "https://wikipedia.org/wiki/" + encodeURIComponent(article);
};

function createArticles(pages) {
    for (var i = 0; i < pages.length; i++) {
        $('.pages ul').append(
            '<a target="_blank" href='+ makeWikiUrl(pages[i].title) +'>\
                <li>\
                    <h1>' + pages[i].title + '</h1>'
                    + pages[i].snippet +
                '</li>\
            </a>');
    }
}

function getUrl(inputContent) {
    return 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&titles=&srsearch=' + inputContent + '&srwhat=text';
}

function getPagesByTitles(query) {
    var pages = [];
    $.ajax({
        url: getUrl(query),
        // url: 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&titles=&srsearch=query&srwhat=text',
        dataType: 'jsonp',
        crossDomain: true,
        success: function (data) {
            for (var i = 0; i < data.query.search.length; i++) {
                pages.push({
                    title: data.query.search[i].title,
                    snippet: data.query.search[i].snippet
                });
            }
            createArticles(pages);
        }
    })
}


window.onload = function () {
    $('.input').keypress(function (e) {
        if (e.which === 13) {
            getPagesByTitles('Programming');
            return false;
        }
    });
};
