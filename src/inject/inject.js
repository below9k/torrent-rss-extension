chrome.extension.sendMessage({
    ready: true
}, function(response) {
    var parseLink = function(linkUrl) {
        var parsedLink = {
        	'link': linkUrl
        };
        if (linkUrl.trim().indexOf('magnet:?') === 0) {
            linkUrl = linkUrl.split('&');
            for (var i = 0; i < linkUrl.length; i++) {
                if (linkUrl[i].indexOf('dn=') !== -1) {
                    linkUrl[i] = linkUrl[i].split('+').join(' ').slice(3);
                    parsedLink.title = linkUrl[i];
                } else
                if (linkUrl[i].indexOf('xt=') !== -1) {
                    linkUrl[i] = linkUrl[i].slice(11);
                    parsedLink.hash = linkUrl[i];
                }
            }
            return parsedLink;
        } else {
            console.log('not a magnet linkUrl in clipboard.');
            return;
        }
    },
    readyStateCheckInterval = setInterval(function() {
        var parsedLink = {};
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            $('a[href^="magnet:"]').after(function() {
                var squareMe = $(this).css('height'),
                    parsedLink = parseLink($(this).attr('href'));

                return '<a href="#" data-title="' + parsedLink.title + '" data-link="' + parsedLink.link + '" data-hash="' + parsedLink.hash + '" class="below9k_rss_torrent_manager_add_link" style="height:' + squareMe + ';width:' + squareMe + ';"><div class="below9k_rss_torrent_manager_preview">' + parsedLink.title + '</div></a>';
            });
            $('.below9k_rss_torrent_manager_add_link').click(function(event) {
                var postData = {
                    title: $(event.target).data('title'),
                    link: $(event.target).data('link'),
                    hash: $(event.target).data('hash')
                };

                $.post('http://below9k.info/add_rss_entry.php',postData,function(res){
                	console.log('success',JSON.parse(res));
                }).fail(function(res){
                	console.log('failed',res);
                }).done(function(){
                	console.log('done');
                });
            });
        }
    }, 10);
});
