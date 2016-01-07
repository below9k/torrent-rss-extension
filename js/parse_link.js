
/*
 *  Magnet URI Scheme - https://en.wikipedia.org/wiki/Magnet_URI_scheme
 *
 *  dn (Display Name) – Filename
 *  xl (eXact Length) – Size in bytes
 *  xt (eXact Topic) – URN containing file hash
 *  as (Acceptable Source) – Web link to the file online
 *  xs (eXact Source) – P2P link.
 *  kt (Keyword Topic) – Key words for search
 *  mt (Manifest Topic) – link to the metafile that contains a list of magneto (MAGMA – MAGnet MAnifest)
 *  tr (address TRacker) – Tracker URL for BitTorrent downloads
 */

var parseLink = function(linkUrl,pageUrl) {
    var parsedLink = {
    		'link': linkUrl
    	},
    	pageUrl = pageUrl || 'contextMenu';
    // HTTPS://KAT.CR/ -- Check for KAT.cr torrent DL
    if (pageUrl.indexOf('https://kat.cr/') === 0) {
        if (linkUrl.indexOf('https://kat.cr/torrents') !== -1) {
        	alert(this);
        }
        if (linkUrl.indexOf('magnet:?') === 0 || linkUrl.indexOf('magnet:?') === 0) {
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
        }
    }
    // END KAT.CR --
    // OTHER
    else {
    	console.log('popup?',linkUrl);
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
    }
}
