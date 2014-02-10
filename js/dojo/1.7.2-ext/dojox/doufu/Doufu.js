/**
 * 作者：黄鑫（huangxin@foreworld.net）
 * 日期：2013-04-29
 * 描述：简单豆腐
 */
define(["dojo/_base/declare",
	"dojo/_base/lang",
	"dijit/_Templated",
	"dijit/_Widget",
	"./LinkGroup",
    "../utils/randomUrl",
    "./_Doufu"],function($declare,$lang,$_Templated,$_Widget,$LinkGroup,$randomUrl,$_Doufu){
	return $declare("fore.doufu.Doufu",[$_Widget,$_Templated,$_Doufu],{
		templateString: '<div><div class="${baseClass}Head"><span class="${baseClass}Title">${title}</span></div><div class="${baseClass}Content" dojoAttachPoint="_linkGroup"></div><div class="${baseClass}Foot"></div></div>',
		baseClass: "foreDoufu",
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
				this._addLinkGroups($data);
			}else{
				console.warn($data);
			}
		},
		_onError: function(){
			console.warn(arguments);
		},
		_addLinkGroups: function($data){
			for(var __i_3=0,__item_3; __item_3=$data.items[__i_3]; __i_3++){
				this._addLinkGroup(__item_3);
			}
		},
		_addLinkGroup: function($data){
			new $LinkGroup({ items: $data }).placeAt(this._linkGroup);
		}
	});
});