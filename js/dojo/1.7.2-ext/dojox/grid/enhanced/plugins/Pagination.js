/**
 * 作者: 黄鑫
 * 日期: 2013-4-17
 * 作用: 对原生Grid分页增强
 */
define(["dojo/_base/declare",
        "dojox/grid/enhanced/plugins/Pagination" ], function($declare, $Pagination) {
	return $declare($Pagination, {
		postCreate: function(){
			this.inherited(arguments);
		}
	});
});