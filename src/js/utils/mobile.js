import fastclick from 'fastclick';
import { getURLParameters } from './url';
import debounce from './debounce';

// Debug 模式
const { debug } = getURLParameters();
if (debug) {
	var script = document.createElement('script');
	script.src = 'https://cdn.bootcss.com/vConsole/3.2.0/vconsole.min.js';
	document.body.appendChild(script);
	script.onload = function() {
		new VConsole();
	};
}

// 去掉点击延迟300秒
fastclick.attach(document.body);

// Rem 自适应
// 注：设计稿的 100px 等于 1rem
function initScreen() {
	$('html').css(
		'font-size',
		(document.documentElement.clientWidth / 375) * 312.5 + '%'
	);
}

initScreen();
window.addEventListener('resize', debounce(initScreen, 300));

// 横屏提醒
function forhorview() {
	if ($('#forhorview').length == 0) {
		$('body').append("<div id='forhorview'><p>推荐使用竖屏浏览哦~</p></div>");
	}
	if (window.orientation == 90 || window.orientation == -90) {
		$('#forhorview').show();
	} else {
		$('#forhorview').hide();
	}
}

forhorview();
window.addEventListener('orientationchange', forhorview);
