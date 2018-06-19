import showMessage from './showMessage';

export default class Timer {
	constructor(el, second = 60) {
		this.el = el;
		this.second = second;
        this.state = true;
        $(this.el).addClass('disabled');
        showMessage('已发送手机验证！');
        this.setTime();
	}

	setTime() {
		if (this.second < 0) {
			this.second = 60;
			this.state = false;
			$(this.el)
				.removeClass('disabled')
				.text('获取验证码');
		} else {
			setTimeout(() => {
				$(this.el).text(this.second-- + 's');
				this.setTime();
			}, 1000);
		}
	}
}
