/**
 * 作者：黄鑫
 * 日期：2013-05-13
 * 描述：_Widget
 */
define(["dojo/_base/declare",
	"dojo/_base/lang",
	"dijit/_Templated",
	"dijit/_Widget",
    "./utils/randomUrl",
    "./utils/ajax"],function($declare,$lang,$_Templated,$_Widget,$randomUrl,$ajax){
	return $declare("fore._Widget",[$_Widget,$_Templated],{
		_setDataUrlAttr: function($value){
			dojo.xhrGet({
				async : true,
				handleAs : "json",
				url : $randomUrl($value),
				load : $lang.hitch(this, "_onDataLoaded"),
				error : $lang.hitch(this, "_onError")
			});
		},
		_onDataLoaded: function($data){
			if($data.status == "success"){
				for(var __i_3=0,__item_3; __item_3=$data.items[__i_3]; __i_3++){
					this._addChild(__item_3);
				}
			}else{
				console.warn($data);
			}
		},
		_onError: function(){
			console.warn(arguments);
		},
		_addChild: function(){
			//
		}
	});
});