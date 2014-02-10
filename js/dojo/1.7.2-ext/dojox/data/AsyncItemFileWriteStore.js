/**
 * 作者：黄鑫
 * 日期：2013-04-26
 * 作用：异步树专用
 */
define(["dojo/data/ItemFileWriteStore",
	"dojo/_base/declare"], function($ItemFileWriteStore,$declare){
	return $declare("capec.data.ItemFileWriteStore",$ItemFileWriteStore,{
		_assertIsItem: function(){
			//this.inherited(arguments);
		}
	});
});