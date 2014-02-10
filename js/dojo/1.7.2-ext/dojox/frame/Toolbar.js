/**
 * 作者：黄鑫
 * 日期：2013-03-11
 * 描述：主框架工具栏
 */
define(["dojo/_base/declare",
	"dojo/_base/lang",
	"dijit/_Templated",
	"dijit/_Widget",
	"./TButton",
	"../utils/ajax"],function($declare,$lang,$_Templated,$_Widget,$TButton,$ajax){
	return $declare("capec.frame.Toolbar",[$_Widget,$_Templated],{
		_tabs: null,
		bindTabs: function($value){
			this._tabs = $value;
		},
		templateString: "<ul></ul>",
		widgetsInTemplate: false,
		postCreate: function() {
			this.inherited(arguments);
			//加载常用工具数据
			this._loadData();
		},
		_loadData: function(){
			$ajax({
				async : true,
				url : this.url,
				callback : $lang.hitch(this, "_onDataLoaded")
			});
		},
		_onDataLoaded: function($data){
			if($data.items){
				for(var __i_3=0,__j_3=$data.items.length; __i_3<__j_3; __i_3++){
					var __btn = new $TButton({
						src: $data.items[__i_3].src,
						href: $data.items[__i_3].href,
						label: $data.items[__i_3].label,
						moduleid: $data.items[__i_3].id,
						openmode: $data.items[__i_3].openmode
					}).placeAt(this.domNode);

					__btn.on("click", $lang.hitch(this._tabs, "openNewTab", {
						id: __btn.moduleid,
						label: __btn.label,
						href: __btn.href,
						openmode: __btn.openmode,
						src: __btn.src
					}));
				}
			}
		}
	});
});