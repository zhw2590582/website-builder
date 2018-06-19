// Loading 显示
export default function showLoading(type = true) {
	if (type) {
		if ($('.showLoading').length > 0) return;
		$('body').append('<div class="showLoading"></div>');
	} else {
		$('.showLoading').remove();
	}
}
