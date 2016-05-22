var settingsMenu = {
	openSettings: function(e) {
		e.preventDefault();
		$('#improveHNSettings').show();
	},
	hideSettings: function() {
		$('#improveHNSettings').hide();
	},
	setSetting: function(e) {
		var el = $(e.target);
		if(el.attr('type') == 'checkbox') {
			storage.saveSetting(el.attr('name'),el.is(':checked'));
			return;
		}
		if(el.attr('name') == 'settings_resetstorage') {
			console.log('clearing local storage');
			localStorage.clear();
		}
	},
	create: function() {
		// Create menu
		var menu = $('\
			<div id="improveHNSettings"\
			style="display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:400px;height:200px;background-color:#ccc;\
			border-radius:4px;box-shadow: 2px 2px 2px -1px rgba(0,0,0,0.75);padding:10px">\
			<h3 style="text-align:center;">Improve HN</h3>\
			<table>\
			<tr>\
			<td style="color:#828282">Load dark theme</td>\
			<td><input type="checkbox" '+(storage.getSetting("settings_loaddarktheme") ? "checked" : "")+' name="settings_loaddarktheme"/></td>\
			</tr>\
			<tr>\
			<td style="color:#828282">Persist comment hides in storage</td>\
			<td><input type="checkbox" '+(storage.getSetting("settings_persisthides") ? "checked" : "")+'  name="settings_persisthides"/></td>\
			</tr>\
			<tr>\
			<td style="color:#828282">Add specific colors for "Ask/Show HN"</td>\
			<td><input type="checkbox" '+(storage.getSetting("settings_coloredaskshow") ? "checked" : "")+'  name="settings_coloredaskshow"/></td>\
			</tr>\
			<tr>\
			<td><br><input type="button" name="settings_resetstorage" value="Reset local storage"/></td>\
			</tr>\
			<tr>\
			<td><br><a href="#">Hide</a></td>\
			</tr>\
			</table>\
			</div>\
			');

		// Append
		$('body').append(menu);
		// Add event listener for settings inputs
		$('#improveHNSettings input').click(settingsMenu.setSetting);
		$('#improveHNSettings a').click(settingsMenu.hideSettings);

		// Add to menu
		$($('.pagetop')[0]).append('| ');
		var settingsEl = $('<a href="#">[Improve HN settings]</a>');
		settingsEl.click(settingsMenu.openSettings);
		$($('.pagetop')[0]).append(settingsEl);

	}
};