// Tab 切换使用

// 注：当 .tab-bar .item 上存在 data-redirect 属性时，不触发tab

// <div class="tab-wrap">
// 	   <div class="tab-bar">
// 		   <div data-redirect class="item">tab-bar1</div>
// 		   <div class="item">tab-bar2</div>
// 		   <div class="item">tab-bar3</div>
// 	   </div>
// 	   <div class="tab-content">
// 		   <div class="item">tab-content1</div>
// 		   <div class="item">tab-content2</div>
// 		   <div class="item">tab-content3</div>
// 	   </div>
// </div>

$(document).on('click', '.tab-bar .item', function(e) {
	if (
		$(target)
			.data()
			.hasOwnProperty('redirect')
	) {
		return;
	}
	let index = $(this).index();
	$(this)
		.addClass('active')
		.siblings()
		.removeClass('active');
	$(this)
		.closest('.tab-wrap')
		.find('.tab-content .item')
		.eq(index)
		.addClass('active')
		.siblings()
		.removeClass('active');
	return false;
});
