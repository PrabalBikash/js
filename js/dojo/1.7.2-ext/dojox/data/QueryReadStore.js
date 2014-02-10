/**
 * 作者: 黄鑫
 * 日期: 2013-2-27
 * 作用: 对原生类功能增强
 */
define(["dojo/_base/declare",
        "dojox/data/QueryReadStore",
    	"../dialog/AlertDialog"], function($declare, $QueryReadStore,$AlertDialog) {
	return $declare($QueryReadStore, {
		_xhrFetchHandler: function($data){
			this.inherited(arguments);
			var __dlg = $AlertDialog({
				title: "错误",
				msg: "什么什么不能选中!",
				img: "../../images/alert.png"
			});
			switch($data.code){
				case "500":
					console.log($data);
		 			__dlg.show({msg: $data.msg});
					break;
				default:
					console.log($data);
					break;
			}
			if($data.status == "timeout"){
				top.location.href = $randomUrl("login.html?msg="+ $data.msg);
				return;
			}
			if(this.grid){
				this.grid.selection.clear();
				if($data.items.length == 0){
					this.grid.showMessage("没有找到相关数据");
				}
			}
		}
	});
});