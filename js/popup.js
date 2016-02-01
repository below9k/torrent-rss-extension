$(document).ready(function() {
    $('.loading').hide();
    $('.paste-field').focus();

    document.execCommand('paste');

    $('button').click(function(event) {
        $('.loading').show();
        $.post('http://below9k.info/add_rss_entry.php', {
            title: $('.title').val(),
            category: $('.category').val(),
            link: $('.link').val(),
            pubDate: new Date().toUTCString(),
            description: $('.description').val(),
            hash: $('.hash').val(),
            version: 1
        }, function(data) {
            var style = 'success';
            if (typeof data !== 'object') {
                console.log(data);
                data = JSON.parse(data);
            }
            if (data.error) {
                style = 'error';
                data.message = '<i class="fa fa-times"></i>&nbsp;' + data.message;
            }
            if (data.warning) {
                style = 'warning';
                data.message = '<i class="fa fa-warning"></i>&nbsp;' + data.message;
            }
            if (style === 'success')
                data.message = '<i class="fa fa-check"></i>&nbsp;' + data.message;

            $('.loading').hide();
            $('button').addClass(style).html(data.message);
            // if (style === 'success')
            //     setTimeout(function() {
            //         window.close();
            //     }, 700);
        }).fail(function() {
            $('.loading').hide();
            $('button').addClass('error').html('Failed to connect to server. Try again.');
        });
    });

    $('.input-field').change(function(event) {
        if ($(event.target).val().length > 0) {
            $(event.target).parent().addClass('input-filled');
        } else {
            $(event.target).parent().removeClass('input-filled');
        }
    });

    // This is out of window/view
    $('.paste-field').change(function(event) {
        var link = $(event.target).val(),
            parsedLink;

        parsedLink = parseLink(link);

        if (parsedLink) {

            if (parsedLink.title.length > 0) $('.title').val(parsedLink.title).parent().addClass('input-filled');
            if (link.length > 0) $('.link').val(link).parent().addClass('input-filled');
            if (parsedLink.hash.length > 0) {
                $('.hash').val(parsedLink.hash).parent().addClass('input-filled');
                $('label[for="hash_input"]').text(parsedLink.hash).parent().addClass('input-filled');
                if (parsedLink.title.toLowerCase().indexOf('hdtv') !== -1 ||
                    parsedLink.title.toLowerCase().indexOf('season') !== -1)
                    $('.category').val('TV Shows');
                else if (parsedLink.title.toLowerCase().indexOf('anime') !== -1 ||
                    parsedLink.title.toLowerCase().indexOf('horriblesubs') !== -1 ||
                    parsedLink.title.toLowerCase().indexOf('bakedfish') !== -1 ||
                    parsedLink.title.toLowerCase().indexOf('deadfish') !== -1 ||
                    parsedLink.title.toLowerCase().indexOf('horriblesubs') !== -1 ||
                    parsedLink.title.toLowerCase().indexOf('fansub') !== -1 ||
                    parsedLink.title.toLowerCase().indexOf('subs') !== -1)
                    $('.category').val('Anime');
                else
                    $('.category').val('Movies'); // Default
            }

        } else {
            console.log('not a magnet link in clipboard.');
        }
    });

    $('.title').focus();
});
