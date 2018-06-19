import fastclick from 'fastclick';

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
