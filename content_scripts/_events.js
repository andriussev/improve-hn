var events = {
	hiderClick: function(e) {
		var el = $(e.target);
		var container = el.closest('tr.athing');
		var hidden = el.attr('tree_hidden');
		if(hidden == 0) {
			storage.addHiddenId(container.attr('comment_id'));
			el.attr('tree_hidden',1);
			el.html('[Show]');
		} else{
			storage.removeHiddenId(container.attr('comment_id'));
			el.attr('tree_hidden',0);
			el.html('[Hide]');
		}
		utils.toggleTree(container,el.attr('tree_hidden'));
	}
}