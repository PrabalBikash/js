/**
 * 作者：黄鑫
 * 日期：2013-05-05
 * 描述：Div1
 */
define(["dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
    "../utils/randomUrl",
	"./_Ul",
	"./_Li",
	"./_ALink",
    "./_Div"],function($declare,$lang,$domConstruct,$randomUrl,$_Ul,$_Li,$_ALink,$_Div){
	return $declare("fore.doufu._Div1",$_Div,{
		_setDataUrlAttr: function(){
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
			var __ul = $_Ul();
			__ul.placeAt(this.domNode);
			this._ulDom = __ul.domNode;
		},
		_addChildWidget: function($params){
			this._addLi1($params, this._ulDom);
		},
		_addLi1: function($params, $domNode){
			var __li = $_Li();
			__li.placeAt($domNode);
			$_ALink({ href: $params.url, title: $params.title, innerHTML: $params.name }).placeAt(__li.domNode);
		}
	});
});