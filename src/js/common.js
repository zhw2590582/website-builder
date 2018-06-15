import 'normalize.css';
import '../sass/common';
import fastclick from 'fastclick';

// 去掉点击延迟300秒
fastclick.attach(document.body);

// Rem 自适应
$('html').css('font-size', document.documentElement.clientWidth / 375 * 312.5 + '%');
window.onresize = function() {
  $('html').css('font-size', document.documentElement.clientWidth / 375 * 312.5 + '%');
};

// Pop 弹窗
$(document).on('click','.pop_bg', function(e){
  if ($(e.target).closest('.pop_inner').length === 0 || $(e.target).hasClass('pop_close')) {
    $(this).closest('.pop_bg').hide();
  }
});

// Tab 切换
$(document).on('click', '.tabbar .item', function(e){
    if(e.target.tagName === "A") return;
    var index = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    $(this).parent().next().find('.tab-items').eq(index).addClass('active').siblings().removeClass('active');
    return false;
});  

// Tip 提示
export function showMessage(info, time) {
  if (typeof info !== 'string') {
    info = JSON.stringify(info);
  }
  var id = (function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  })(1, 10000000);
  $('body').append('<div id="msg' + id + '" class="showMessage">' + info + '</div>');
  setTimeout(function() {
    $('#msg' + id).remove();
  }, time || 1500);
}

// Loading 显示
export function showLoading(type = true) {
  if(type){
    if($('.showLoading').length > 0) return;
    $('body').append('<div class="showLoading"></div>');
  } else {
    $('.showLoading').remove();
  }
}

// Url 参数对象
export function getURLParameters() {
  var url = window.location.href;
  return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(function(a, v) {
    return (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a;
  }, {});
}

// String 剪裁
export function truncateString(str, num) {
  return str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;
}

// 预约
// data: tel、game_id、platform(iOS\Android)
export function subscribe(data, success, error) {
  $.ajax({
    type: 'get',
    url: 'http://user-hub.xianyugame.com/api/subscribe/',
    data: data,
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'callback',
    success: success,
    error: error
  });
}

// 获取短信验证码
// data: tel
export function sendCode(data, success, error) {
  $.ajax({
    type: 'get',
    url: 'http://user-hub.xianyugame.com/api/send_vcode/',
    data: data,
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'callback',
    success: success,
    error: error
  });
}

// 验证码验证
// data: tel、vcode、platform(iOS\Android)、game_id
export function verifyCode(data, success, error) {
  $.ajax({
    type: 'get',
    url: 'http://user-hub.xianyugame.com/api/verify/',
    data: data,
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'callback',
    success: success,
    error: error
  });
}

// 获得礼包码
// data: user_id、game_id、tel
export function giftCode(data, success, error) {
  $.ajax({
    type: 'get',
    url: 'http://gift-hub.xianyugame.com/api/gift_code/',
    data: data,
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'callback',
    success: success,
    error: error
  });
}