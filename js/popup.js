$(document).ready(function() {
    $('.pasteField').focus();

    document.execCommand('paste');

    $('button').click(function(event) {

        $.post('http://below9k.info/add_rss_entry.php', {
            title: $('.title').val(),
            category: $('.category').val(),
            link: $('.link').val(),
            pubDate: new Date().toISOString(),
            description: $('.description').val(),
            hash: $('.hash').val()
        }, function(data) {
            var style = 'success';
            if(typeof data !== 'object')
                data = JSON.parse(data);
            if (data.error)
                style = 'error';
            if (data.warning)
                style = 'warning';
            $('.status span').html('<b class=' + style + '>' + data.message + '</b>');
            setTimeout(function(){
                window.close();
            }, 700);
        }).fail(function() {
            $('.status span').html('<b class="error">Failed..</b>');
        });
    });

    $('.inputField').change(function(event) {
        if ($(event.target).val().length > 0) {
            console.log('filled');
            $(event.target).parent().addClass('inputFilled');
        } else {
            console.log('unfilled');
            $(event.target).parent().removeClass('inputFilled');
        }
    });

    // This is out of window/view
    $('.pasteField').change(function(event) {
        var link = $(event.target).val(),
            parsedLink;

        parsedLink = parseLink(link);

        if (parsedLink) {

            if (parsedLink.title.length > 0) $('.title').val(parsedLink.title).parent().addClass('inputFilled');
            if (link.length > 0) $('.link').val(link).parent().addClass('inputFilled');
            if (parsedLink.hash.length > 0) {
                $('.hash').val(parsedLink.hash).parent().addClass('inputFilled');
                $('label[for="hash_input"]').text(parsedLink.hash).parent().addClass('inputFilled');
                if (parsedLink.title.toLowerCase().indexOf('hdtv') !== -1 ||
                    parsedLink.title.toLowerCase().indexOf('season') !== -1)
                    $('.category').val('TV Shows');
                else if(parsedLink.title.toLowerCase().indexOf('anime') !== -1 ||
                        parsedLink.title.toLowerCase().indexOf('horriblesubs') !== -1 ||
                        parsedLink.title.toLowerCase().indexOf('bakedfish') !== -1 ||
                        parsedLink.title.toLowerCase().indexOf('horriblesubs') !== -1 ||
                        parsedLink.title.toLowerCase().indexOf('fansub') !== -1)
                    $('.category').val('Anime');
                else
                    $('.category').val('Movies'); // Default
            }

            console.log('updated', parsedLink);

        } else {
            console.log('not a magnet link in clipboard.');
        }
    });

    $('.title').focus();
});
