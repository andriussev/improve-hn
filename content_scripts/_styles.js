var styles = {
	loadDarkTheme: function() {
		var css = '\
		body { background: #333; }\
		#hnmain { background:#555; }\
		.itemlist {width:100%;}\
		td { color: #eee;}\
		a:link, td.subtext a:link, span.age a {color:#ddd;}\
		a:visited, td.subtext a:visited, span.age a:visited {color:#888;}\
		a:hover,td.subtext a:hover {color:#fff;}\
		span.rank {color:#bbb}\
		td.subtext {color:#eee}\
		.votearrow{background:transparent;margin: 0 8px 0 0;}\
		\
		.comment span {color:#ddd}\
		.comhead a:link, .comment a:link {color:#ddd}\
		.comment a:visited {color:#888}\
		.comhead a:link, .comment a:hover {color:#fff}\
		.alternate-listing {background-color:#666}\
		',
		head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');

		style.type = 'text/css';
		if (style.styleSheet){
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
		head.appendChild(style);

		/* Listings styling */
		var listings = $(".itemlist tr.athing");
		var i = 0;
		$.each(listings,function(key, listing) {
			i+=1;
			var el = $(listing);
			var infoRow = el.next();
			// Set alternating
			if(i % 2 == 0) {
				el.addClass('alternate-listing');
				infoRow.addClass('alternate-listing');
				$(infoRow.next()).addClass('alternate-listing');
			}
		});
		/* Arrow styling */
		var els = $('div[title=upvote]');
		for(var i=0;i<els.length;i++) {
			els[i].innerHTML = '&#x25B2';
		}
		// TODO: Add downvote arrow
	}
};