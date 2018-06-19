// Tab 切换
$(document).on('click', '.tabbar .item', function(e) {
	if (e.target.tagName === 'A') return;
	var index = $(this).index();
	$(this)
		.addClass('active')
		.siblings()
		.removeClass('active');
	$(this)
		.parent()
		.next()
		.find('.tab-items')
		.eq(index)
		.addClass('active')
		.siblings()
		.removeClass('active');
	return false;
});
