export function isMobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);
}

export function isAndroid() {
	return /(Android)/i.test(navigator.userAgent);
}

export function isIOS() {
	return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
}
