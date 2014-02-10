/**
 * 作者：黄鑫
 * 日期：2013-03-11
 * 描述：为Href地址加上时间参数
 */
define(function() {
	return function($href){
		var __href = [];
		__href[0] = $href;
		__href[1] = ($href+"").indexOf("?") == -1 ? "?" : "&";
		__href[2] = "ts=";
		__href[3] = Date.parse(new Date()) / 1000;
		__href[4] = "&locale=";
		__href[5] = top.location.search.match(/locale=([\w\-]+)/) ? RegExp.$1 : "zh";
		return __href.join("");
	};
});