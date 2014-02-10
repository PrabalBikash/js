/**
 * 作者：黄鑫
 * 日期：2013-07-24
 * 描述：js原型工具类
 */
String.prototype.replaceAll = function($oText, $nText) {
	return this.replace(new RegExp($oText, "gm"), $nText);
};
