/**
 * 作者：黄鑫
 * 日期：2012-10-17
 * 描述：简单link豆腐
 */
define(["dojo/_base/declare",
	"dojo/text!./resources/LinkDoufu.html",
	"dojo/_base/lang",
	"dijit/_Templated",
	"dijit/_Widget",
	"dojo/i18n!./nls/LinkDoufu",
	"./LinkGroup",
    "../utils/randomUrl"],function($declare,$template,$lang,$_Templated,$_Widget,$i18n,$LinkGroup,$randomUrl){
	return $declare("fore.doufu.LinkDoufu",[$_Widget,$_Templated],{
		templateString: '<div><div class="${baseClass}Head"><span class="${baseClass}Title">${title}</span><a class="${baseClass}More" href="${moreLink}">${_moreText}</a></div><div class="${baseClass}Content" dojoAttachPoint="_linkGroup"></div><div class="${baseClass}Foot"></div></div>',
		baseClass: "foreLinkDoufu",
		title: "No Name",
		constructor: function(){
			this._moreText = $i18n._moreText;
			this.inherited(arguments);
		},
		buildRendering: function(){
			this.inherited(arguments);
		},
		postCreate: function(){
			this.inherited(arguments);
		},
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
			if($data == null) return;
			if($data.opt == "s"){
				this._addLinkGroups($data);
			}else{
				console.log($data);
			}
		},
		_onError: function(){
			console.log(arguments);
		},
		_addLinkGroups: function($data){
			for(var __i_3=0,__group_3; __group_3=$data.items[__i_3]; __i_3++){
				this._addLinkGroup(__group_3);
			}
		},
		_addLinkGroup: function($data){
			new $LinkGroup({ items: $data }).placeAt(this._linkGroup);
		},
		destroy: function(){
			this.inherited(arguments);
		}
	});
});