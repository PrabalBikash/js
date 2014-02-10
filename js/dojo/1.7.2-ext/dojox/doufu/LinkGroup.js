/**
 * 作者：黄鑫
 * 日期：2013-04-10
 * 描述：link链接组
 */
define(["dojo/_base/declare",
	"dijit/_Templated",
	"dijit/_Widget",
	"./Link"],function($declare,$_Templated,$_Widget,$Link){
	return $declare("fore.doufu.LinkGroup",[$_Widget,$_Templated],{
		templateString: "<ul></ul>",
		_setItemsAttr: function($value){
			this._addLinks($value);
		},
		_addLinks: function($items){
			for(var __i_3=0,__item_3; __item_3=$items[__i_3]; __i_3++){
				this._addLink(__item_3);
			}
		},
		_addLink: function($args){
			new $Link($args).placeAt(this.domNode);
		}
	});
});