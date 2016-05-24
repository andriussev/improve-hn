var storage = {
	prepare: function() {
		if(!('hiddenComments' in localStorage)) {
			localStorage['hiddenComments'] = JSON.stringify([]);
		}
		if(!('submissions' in localStorage)) {
			localStorage['submissions'] = JSON.stringify({});
		}
		if(!('settings' in localStorage)) {
			localStorage['settings'] = JSON.stringify({});			
		}

		var settings = JSON.parse(localStorage['settings']);
		var settingNames = ['settings_loaddarktheme','settings_persisthides','settings_coloredaskshow'];
		$.each(settingNames,function(key, val) {
			if(!(val in settings)) {
				settings[val] = true;
			}
		});
		localStorage['settings'] = JSON.stringify(settings);

		// console.log(localStorage);
	},
	/* Settings */
	getSetting: function(name) {
		var settings = JSON.parse(localStorage['settings']);
		return settings[name];		
	},
	saveSetting: function(name, value) {
		var settings = JSON.parse(localStorage['settings']);
		settings[name] = value;
		localStorage['settings'] = JSON.stringify(settings);
	},
	/* Comments */
	getHiddenComents() {
		return JSON.parse(localStorage['hiddenComments']);
	},
	isHidden(id) {
		return (localStorage['hiddenComments'].indexOf(id) >= 0);
	},
	addHiddenId: function(id) {
		if(!persistHides) return;
		var arr = [];
		if(localStorage['hiddenComments'].length != 0) {
			arr = JSON.parse(localStorage['hiddenComments']);
		}
		if(arr.length == 0) {
			arr = [];
		}
		arr.push(id);
		localStorage['hiddenComments'] = JSON.stringify(arr);
	},
	removeHiddenId: function(id) {
		if(!persistHides) return;
		var arr = [];
		if(localStorage['hiddenComments'].length != 0) {
			arr = JSON.parse(localStorage['hiddenComments']);
		}
		var index = arr.indexOf(id);
		arr.splice(index,1);

		localStorage['hiddenComments'] = JSON.stringify(arr);
	},
	/* End comments */

	/* Submissions */
	setSubmissionData: function(submissionId, commentIds,commentCount) {
		var submissions = JSON.parse(localStorage['submissions']);
		if(!(submissionId in submissions)) {
			submissions[submissionId] = {};
		}
		submissions[submissionId]['comments'] = commentIds;
		submissions[submissionId]['commentCount'] = commentCount;
		localStorage['submissions'] = JSON.stringify(submissions);
	},
	getSubmissionCommentCount: function(submissionId) {
		var submissions = JSON.parse(localStorage['submissions']);
		if(submissionId in submissions) {
			return submissions[submissionId]['commentCount'];
		}
		return 0;
	},
	commentExistsInSubmissionMemory: function(submissionId,commentId) {
		var submissions = JSON.parse(localStorage['submissions']);		
		if(!(submissionId in submissions)) {
			return;
		}
		return submissions[submissionId]['comments'].indexOf(commentId) >= 0;
	}
	/* End submissions */
};