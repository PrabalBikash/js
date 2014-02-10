/**
 * 作者：黄鑫
 * 日期：2013-03-11
 * 描述：Word风格主框架
 */
define(["dojo/_base/declare",
	"dojo/_base/lang",
	"dijit/_Templated",
	"dijit/_Widget",
	"dojo/_base/connect",
	//"dojo/text!./resources/Word.html",
	"./_Word",
	"./Toolbar",
	"./MainTabs",
	"dojo/i18n!./nls/Word",
	"./Menus",
    "../dialog/LogoutConfirm",
    "../utils/ajax",
	"./SmallTool",
    "../utils/randomUrl"],function($declare,$lang,$_Templated,$_Widget,$connect,$_Word,$Toolbar,$MainTabs,$i18n,$Menus,$AlertConfirm,$ajax,$SmallTool,$randomUrl){
	return $declare("capec.frame.Word",[$_Widget,$_Templated,$_Word],{
		templateString: '<div dojoAttachPoint="_word">'+
							'<div id="main_head">'+
								'<div id="top-header">'+
									'<div class="p_logo">'+
										'<span class="p_logo_lbg"></span>'+
										'<h1>'+
											'<a href="javascript:void(0);" dojoAttachEvent="onclick:_showDefPage">产品公共基础管理平台</a>'+
										'</h1>'+
									'</div>'+
									'<div class="p_ofenn"></div>'+
									'<div id="menu">'+
										'<div class="nav" dojoAttachPoint="_menuParent">'+
											'<!--ul dojoType="capec.frame.Menus"></ul-->'+
										'</div>'+
									'</div>'+
									'<div class="p_help_cancel">'+
										'<a href="javascript:void(0);" class="m_quit" dojoAttachEvent="onclick:_onLogout"></a>'+
									'</div>'+
								'</div>'+
								'<div class="clear"></div>'+
								'<div class="p_often_menu" dojoAttachPoint="_toolbarParent"></div>'+
								'<div class="bread_nav" style="display: none">'+
									'<div class="current_address">'+
										'当前位置：<a href="javascript:void(0);">首页</a> &gt;<a href="javascript:void(0);">基础应用</a>'+
									'</div>'+
									'<div class="past_nav">'+
										'<dl>'+
											'<dt>'+
												'<a href="javascript:void(0);"><img src="images/past_nav2.png" border="0" /> </a>'+
											'</dt>'+
											'<dd>'+
												'<a href="javascript:void(0);">已打开的文档</a>'+
											'</dd>'+
											'<dd>'+
												'<a href="javascript:void(0);">已打开的文档</a>'+
											'</dd>'+
											'<dd>'+
												'<a href="javascript:void(0);">已打开的文档</a>'+
											'</dd>'+
										'</dl>'+
									'</div>'+
								'</div>'+
							'</div>'+
							'<div id="main_foot">'+
								'<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
									'<tr>'+
										'<td>'+ $i18n._copyright +'</td>'+
									'</tr>'+
								'</table>'+
							'</div>'+
						'</div>',
		widgetsInTemplate: false,
		postCreate: function() {
			this.inherited(arguments);

			var __toolbar = new $Toolbar({
				baseClass: "p_often_sec",
				url: this.tbarSource
			});
			__toolbar.placeAt(this._toolbarParent);
			__toolbar.startup();

			this._mainTabs = new $MainTabs({
				style: {
					overflow: "hidden"
				},
				id: "content",
				tabPosition: "top",
				defaultPage: this.defaultPage
			});
			this._mainTabs.placeAt(this._word);
			this._mainTabs.startup();

			var __menus = new $Menus({
				url: this.menuSource
			});
			__menus.placeAt(this._menuParent);
			__menus.startup();

			this._smallTool = new $SmallTool({
				services: this.services
			});
			this._smallTool.placeAt(this._menuParent);
			this._smallTool.startup();

			__toolbar.bindTabs(this._mainTabs);
			__menus.bindTabs(this._mainTabs);
		},
		_showDefPage: function(){
			var __model = {};
			__model.id = "def";
			__model.href = this.defaultPage;
			//$connect.publish("/capec/MainTabs/openNewTab/",[__model]);
			this._mainTabs.openNewTab(__model);
		},
		_onLogout: function(){
			if(!this._logoutDialog){
				this._logoutDialog = $AlertConfirm({
					img: require.toUrl("capec/frame/resources/images/logout_32.png")
				});
			}
			this._logoutDialog.show($lang.hitch(this, "_logout"));
		},
		_logout: function(){
			$ajax({
				async : true,
				url : this.logoutSource,
				callback : $lang.hitch(this, "_logoutBack")
			});
		},
		_logoutBack: function(){
			setTimeout($lang.hitch(this, "_logoutBack2"), 500);
		},
		_logoutBack2: function(){
			top.location.href = $randomUrl(this.logoutPage);
		}
	});
});