$(document).ready(function() {
    var clickHandler = function(event) {
        var parsedLink = parseLink(event.linkUrl, event.pageUrl),
            postData = {
                title: parsedLink.title,
                link: parsedLink.link,
                hash: parsedLink.hash
            };

        $.post('http://below9k.info/add_rss_entry.php', postData, function(res) {
            console.log('success', JSON.parse(res));
        }).fail(function(res) {
            console.log('failed', res);
        }).done(function() {
            console.log('done');
        });
    };
    chrome.contextMenus.create({
        "title": "Add Link",
        "contexts": ["selection", "link"],
        "onclick": clickHandler
    });
});
