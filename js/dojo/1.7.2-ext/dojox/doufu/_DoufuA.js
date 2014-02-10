/**
 * 作者：黄鑫（huangxin@foreworld.net）
 * 日期：2013-04-29
 * 描述：豆腐
 */
define(["dojo/_base/declare",
	"dojo/_base/lang",
	"dijit/_Templated",
	"dijit/_Widget",
    "../utils/randomUrl",
    "./_Doufu"],function($declare,$lang,$_Templated,$_Widget,$randomUrl,$_Doufu){
	return $declare("fore.doufu._DoufuA",[$_Widget,$_Templated,$_Doufu],{
		templateString: '<div><h3>${title}</h3><ul dojoAttachPoint="_liGroup"></ul></div>',
		_setDataUrlAttr: function($value){
			this._loadData();
		},
		_loadData: function(){
			dojo.xhrGet({
				async : true,
				handleAs : "json",
				url : $randomUrl(this.dataUrl),
				load : $lang.hitch(this, "_onDataLoaded"),
				error : $lang.hitch(this, "_onError")
			});
		},
		_onDataLoaded: function($data){
			if($data.status == "success"){
				this._addLinkPanes($data);
			}else{
				console.warn($data);
			}
		},
		_onError: function(){
			console.warn(arguments);
		},
		_addLinkPanes: function($data){
			for(var __i_3=0,__item_3; __item_3=$data.items[__i_3]; __i_3++){
				this._addLinkPane(__item_3);
			}
		}
	});
});