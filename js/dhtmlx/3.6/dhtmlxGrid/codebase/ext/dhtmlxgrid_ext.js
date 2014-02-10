/**
 * 作者：黄鑫
 * 日期：2013-07-30
 * 描述：grid_ext
 */
dhtmlXGridObject.prototype.init2 = function(){
	var t = this;
	t.init();
	/* 全选 */
	var __allChk = $("#"+ t.entBox.id +" input:checkbox")[0];
	/* 添加Check事件 */
	t.attachEvent("onCheckbox",function(){
		/* 获取总行数 */
		var __rowsize = t.getRowsNum();
		/* 获取check中的行号，返回数组 */
		var __rows = t.getCheckedRows(1).split(",");
		var __rowslen = __rows.length;
		__allChk.checked = (__rowsize == (__rowslen == 1 ? (__rows[0] == "" ? 0 : 1) : __rowslen));
	});
};

/* 清除全部选中Checkbox */
dhtmlXGridObject.prototype.clearSelection2 = function(){
	var t = this;
	t.clearSelection();
	var __allChk = $("#"+ t.entBox.id +" input:checkbox")[0];
	__allChk.checked = false;
};