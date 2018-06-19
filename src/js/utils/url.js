// Url 参数对象
export function getURLParameters() {
	var url = window.location.href;
	return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(function(a, v) {
		return (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a;
	}, {});
}