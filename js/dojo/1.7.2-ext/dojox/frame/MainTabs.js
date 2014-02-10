/**
 * 作者：黄鑫
 * 日期：2013-03-11
 * 描述：标签容器
 */
define(["dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/connect",
	"dijit/layout/ContentPane",
	"dojox/layout/ContentPane",
    "../layout/TabContainer",
	"dojo/i18n!./nls/MainTabs",
    "../utils/randomUrl"], function($declare, $lang, $connect, $ContentPane, $xContentPane, $TabContainer, $i18n, $randomUrl) {
	return $declare("capec.frame.MainTabs", $TabContainer, {
		postCreate : function() {
			this.inherited(arguments);
			setTimeout($lang.hitch(this, "_addDefPage"),300);
		},
		startup:function(){
			this.inherited(arguments);
		},
		_addDefPage: function(){
			var __params = {
				id: "_main_tab_def",
				title : $i18n._default,
				closable : false,
				adjustPaths : true,
				renderStyles : true,
				executeScripts : true,
				style : {
					padding: "0px"
				}
			};
			__params.content = "<iframe frameborder='0' height='100%' width='100%' src='"+ $randomUrl(this.defaultPage) +"'/>";

			var __defPage = new $ContentPane(__params);
			// 添加新tab页，并定位到该页面
			this.addChild(__defPage);
			this.selectChild(__defPage);
		},
		openNewTab : function($module) {
			// 判断href是否为空
			if ($module.href) {
				var __tab = dijit.byId("_main_tab_" + $module.id);
				// 判断tab页是否已经存在，存在则定位到该tab页
				if (!__tab) {
					var __params_3 = {
						id: "_main_tab_" + $module.id,
						title : $module.label,
						closable : true,
						adjustPaths : true,
						renderStyles : true,
						executeScripts : true,
						style: {
							padding: "0px"
						}
					};

					// 创建新tab页
//					if($module.openmode == "inner"){
//						__params_3.href = $randomUrl($module.href);
//						__tab = new $xContentPane(__params_3);
//					}else{
						//__params_3.content = "<iframe frameborder='0' height='100%' width='100%' src='"+ $randomUrl($module.href) +"'/>";
						__tab = new $ContentPane(__params_3);
						setTimeout(function() {
							__tab.domNode.innerHTML = "<iframe frameborder='0' height='100%' width='100%' src='"+ $randomUrl($module.href) +"'/>";
						},10);
//					}

//					$aspect.after(__tab,"onLoad",function(){
//						setTimeout(function() {
//							__tab._layout();
//							__tab.resize();
//						},200);
//					});

					// 添加新tab页，并定位到该页面
					this.addChild(__tab);
				}
				this.selectChild(__tab);
			}
		}
	});
});