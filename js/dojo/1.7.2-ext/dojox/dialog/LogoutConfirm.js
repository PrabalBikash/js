/**
 * 作者：黄鑫
 * 日期：2013-04-18
 * 描述：退出对话框
 */
define(["./AlertConfirm",
	"dojo/_base/connect",
    "dojo/_base/declare"], function($AlertConfirm, $connect, $declare) {
	return $declare("fore.dialog.LogoutConfirm", $AlertConfirm,{
		title: "提示",
		msg: "您确定要退出系统吗？",
		style: { width: "300px", heigth:"170px" },
		postCreate: function(){
			this.inherited(arguments);
			$connect.subscribe("/show/LogoutDialog/", this, "show");
		},
		show: function($fn){
			this.setConfirm($fn);
			this.inherited(arguments);
		}
	});
});
