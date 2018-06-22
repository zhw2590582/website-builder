import fastclick from 'fastclick';
import { getURLParameters } from './url';

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
$('html').css(
	'font-size',
	(document.documentElement.clientWidth / 375) * 312.5 + '%'
);

window.onresize = function() {
	$('html').css(
		'font-size',
		(document.documentElement.clientWidth / 375) * 312.5 + '%'
	);
};
