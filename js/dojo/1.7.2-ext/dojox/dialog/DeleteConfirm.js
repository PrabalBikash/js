/**
 * 作者：黄鑫
 * 日期：2013-03-28
 * 描述：提示确认对话框
 */
define(["./AlertConfirm",
    	"dojo/_base/connect",
        "dojo/_base/declare"], function($AlertConfirm, $connect, $declare) {
	return $declare($AlertConfirm,{
		title: "提示",
		msg: "您确定要执行该删除操作吗？",
		style: { width: "300px",heigth:"170px" },
		postCreate: function(){
			this.inherited(arguments);
			$connect.subscribe("/show/DeleteDialog/", this, "show");
		},
		show: function($fn){
			this.setConfirm($fn);
			this.inherited(arguments);
		}
	});
});
