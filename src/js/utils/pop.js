// Pop 弹窗
$(document).on('click', '.pop_bg', function(e) {
	if (
		$(e.target).closest('.pop_inner').length === 0 ||
		$(e.target).hasClass('pop_close')
	) {
		$(this)
			.closest('.pop_bg')
			.hide();
	}
});
