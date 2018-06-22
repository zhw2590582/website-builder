// modal 弹窗使用

// 注：当元素上存在 data-modal-close，点击元素会关闭当前弹窗

// 1.创建触发按钮，data-modal 指向某个弹窗的 class
// <div data-modal="modal-test">open modal</div>

// 2.创建modal容器
// <div class="modal-wrap modal-test">
//     <div class="modal-inner">
//         <div class="modal-content">
//             modal-content
//         </div>
//         <div data-modal-close class="modal-close">modal-close</div>
//     </div>
// </div>

$(document).on('click', '[data-modal]', function(e) {
	$(`.${$(this).data('modal')}`).show();
});

$(document).on('click', '.modal-wrap', function(e) {
	let target = e.target;
	if (
		$(target).closest('.modal-inner').length === 0 ||
		$(target)
			.data()
			.hasOwnProperty('modalClose')
	) {
		$(this).hide();
	}
});
