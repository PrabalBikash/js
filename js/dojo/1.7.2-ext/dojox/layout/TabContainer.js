/**
 * 作者：黄鑫
 * 日期：2013-03-20
 * 描述：对原生标签容器扩展
 */
define(["dojo/_base/declare",
	"dijit/layout/TabContainer"], function($declare, $TabContainer) {
	return $declare($TabContainer, {
		postCreate: function() {
			this.inherited(arguments);
		}
	});
});