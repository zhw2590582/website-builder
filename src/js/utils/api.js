import showLoading from './showLoading';
import Timer from './timer';

$.ajaxSetup({
	type: 'get',
	timeout: 5000,
	dataType: 'jsonp',
	jsonp: 'callback',
	complete: () => {
		showLoading(false);
	},
	beforeSend: () => {
		showLoading();
	}
});

// 预约
// data: tel、game_id、platform(iOS\Android)
export function subscribe(data, success, error) {
	$.ajax({
		url: 'http://user-hub.xianyugame.com/api/subscribe/',
		data,
		success,
		error
	});
}

// 获取短信验证码
// data: tel
export function sendCode(data, success, error, el) {
    if ($(el).hasClass('disabled')) return;
	$.ajax({
		url: 'http://user-hub.xianyugame.com/api/send_vcode/',
		data,
		success: data => {
            new Timer(el);
            success && success(data);
        },
		error
	});
}

// 验证码验证
// data: tel、vcode、platform(iOS\Android)、game_id
export function verifyCode(data, success, error) {
	$.ajax({
		url: 'http://user-hub.xianyugame.com/api/verify/',
		data,
		success,
		error
	});
}

// 获得礼包码
// data: user_id、game_id、tel
export function giftCode(data, success, error) {
	$.ajax({
		url: 'http://gift-hub.xianyugame.com/api/gift_code/',
		data,
		success,
		error
	});
}