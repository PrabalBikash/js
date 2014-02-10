/**
 * 作者：黄鑫
 * 日期：2013-05-04
 * 描述：_Side
 */
define(["dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
    "../utils/randomUrl",
	"./_Ul",
    "./_Div"],function($declare,$lang,$domConstruct,$randomUrl,$_Ul,$_Div){
	return $declare("fore.doufu._Side",$_Div,{
		baseClass: "foreSide",
		_setDataUrlAttr: function($value){
			$domConstruct.create("h3", { innerHTML: this.name }, this.domNode);
			this._addUl();
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
				var __items = $data.items;
				for(var __i_3=0,__item_3; __item_3=__items[__i_3]; __i_3++){
					this._addChildWidget(__item_3);
				}
			}else{
				console.warn($data);
			}
		},
		_onError: function(){
			console.warn(arguments);
		},
		_addUl: function(){
			var __ul = new $_Ul().placeAt(this.domNode);
			this._ulDom = __ul.domNode;
		}
	});
});