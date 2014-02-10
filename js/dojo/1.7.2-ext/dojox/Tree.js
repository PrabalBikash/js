/**
 * 作者: 黄鑫
 * 日期: 2013-2-27
 * 作用: 对原生树功能增强
 */
define(["dojo/_base/declare",
        "dijit/Tree" ], function($declare, $Tree) {
	return $declare("fore.Tree", $Tree, {
		onClick: function($item) {
			this.attr("selectedItem", $item);
			this.inherited(arguments);
		}
	});
});