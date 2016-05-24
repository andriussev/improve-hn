var utils = {
	parseIndent:function(container) {
		return container.find('.ind').width();
	},
	parseId:function(container) {
		var href = container.find('.age a').attr('href') + "";
		if(href == 'undefined') {
			return 0;
		}
		return href.substr(8,href.length-1);		
	},
	parseCommentCount:function(container,id) {
		// Find <a> containing the comment count
		var commentHolder = container.next().find('td > a[href=\'item?id='+id+'\']');
		// Get the number of comment count, return it
    	var currentCommentCount = parseInt(commentHolder.html().replace(/ comm(.*)/,''));
    	if(isNaN(currentCommentCount)) {
    		currentCommentCount = 0;
    	}
    	return currentCommentCount;
	},
	toggleTree:function(container,doHide) {
		var indent = container.attr('indent');
		var comments = container.nextAll();
		var i = 0;

		// Hide or show the root clicked comment
		if(doHide == 1) {
			container.find('.comment').hide();
		} else {
			container.find('.comment').show();   
		}

		// Loop through all comments that 
		// have a bigger nesting and hide them
		while(i<(comments.length)) {
			var nextIndent = $(comments[i]).attr('indent');
			if(nextIndent > indent) {
				if(doHide == 1) {
					$(comments[i]).hide();
				} else {
					$(comments[i]).show();     
				}
			} else {
				break;
			}
			i++;
		}
	},
	initialListingCalculation: function() {
		var listings = $("tr.athing");

		// Go through all the listings (submissions)
		$.each(listings,function(key, listing) {
			var el = $(listing);
			var infoRow = el.next();

			// Mark each listing's id
			var id = utils.parseId(infoRow);
		    el.attr('submission_id',id);

		    // Set previous viewed comment count
	    	var previousCommentCount = storage.getSubmissionCommentCount(id);
	    	if(previousCommentCount == 0) {
	    		return;
	    	}

			// Get the number of comment count
	    	var commentHolder = infoRow.find('td > a[href=\'item?id='+id+'\']');
	    	var currentCommentCount = parseInt(commentHolder.html().replace(/ comm(.*)/,''));
	    	if(isNaN(currentCommentCount)) {
	    		currentCommentCount = 0;
	    	}

	    	// Get comment count difference
	    	var commentCountDiff = currentCommentCount - previousCommentCount;
	    	if(commentCountDiff == 0) {
	    		return;
	    	}

	    	var colorDiffs = ['aaa','gray'];
	    	// Add span to show count
	    	var commentDiffCont = '<span style="color:'+((commentCountDiff>0) ? colorDiffs[0] : colorDiffs[1])+'">'+commentCountDiff+'</span>';
	    	commentHolder.html(commentHolder.html() + " ("+commentDiffCont+")");
		});

    	// Add color differentiation for specific types of submissions
    	if(storage.getSetting('settings_coloredaskshow')) {
	    	$.each($('.title a'),function(key, el) {
	    		var el = $(el);
	    		el.html(el.html().replace('Ask HN:','<span style="color:#ffaa00;">Ask HN:</span>'));
	    		el.html(el.html().replace('Show HN:','<span style="color:#00ffaa;">Show HN:</span>'));
	    	});
	    }

	},
	initialSubmissionCalculation: function() {
		var submissionId = window.location.href.replace(/(.*)item\?id=/,'');
		submissionId = parseInt(submissionId);
		var comments = $("tr.athing");
		var commentIds = [];

		// Parse comment data
		$.each(comments,function(key, comment) {
			var el = $(comment);

		    // Mark each comment's absolute indent level.
		    // hn indents with 40 * n images.
		    var indent = utils.parseIndent(el);
		    el.attr('indent',(indent / 40));
		    
		    // Mark each comment's id.
		    // hn holds them as a url to the specific comment.
		    var id = utils.parseId(el);
		    el.attr('comment_id',id);

		    // Push to array
		    commentIds.push(id);
		    
		    // Define text for buttons
		    var isHidden = storage.isHidden(id);
		    var text = 'Hide';
		    if(isHidden) {
		    	text = 'Show';
		    }
		    
		    // Add Hide/Show buttons
		    var hider = $('<a class=\'hide_tree\'>['+text+']</a>');
		    el.find('.par').after(hider);
		    hider.attr('tree_hidden',(isHidden)?1:0);
		    hider.click(events.hiderClick);

		    // Check if comment is new
		    if(!storage.commentExistsInSubmissionMemory(submissionId,id)) {
	    		var colorDiffs = ['fff','gray'];
		    	var newCommentCont = '<span style="color:'+colorDiffs[0]+'"> [New comment]</span>';
	    		hider.after(newCommentCont);
		    }
		});

		// Save submission stats to storage
		var listingContainer = $(comments[0]);
		var commentCount = utils.parseCommentCount(listingContainer,submissionId);
		storage.setSubmissionData(submissionId,commentIds,commentCount);

	},
	initialCommentsHiding: function() {
		var comments = $("tr.athing");
		$.each(comments,function(key, comment) {
			var el = $(comment);
			var id = el.attr('comment_id');
			var isHidden = storage.isHidden(id);
			if(isHidden) {
				utils.toggleTree(el,1);
			}
		});
	}
};