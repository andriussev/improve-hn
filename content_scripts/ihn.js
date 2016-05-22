// Structure of storage is prepared,
// if first load, a JSON of array is saved
storage.prepare();

var useDarkTheme = storage.getSetting('settings_loaddarktheme');
var persistHides = storage.getSetting('settings_persisthides');

// If set as true, dark theme will be loaded,
// including a change of vote arrows
if(useDarkTheme) {
	styles.loadDarkTheme();
}

// Load settings tool
settingsMenu.create();

if(window.location.href.match(/item/) != null) { // Submissions only
	// From all comments: 
	// parses data (comment id, nest level),
	// adds Show/Hide buttons
	// saves submission data (comment ids, count)
	// adds [new comment]
	utils.initialSubmissionCalculation();

	// Find all comments that should be hidden,
	// hide them and all inside-nesting comments too
	utils.initialCommentsHiding();

} else { // Listing pages
	// Go through all submissions,
	// show new comment count
	utils.initialListingCalculation();
}