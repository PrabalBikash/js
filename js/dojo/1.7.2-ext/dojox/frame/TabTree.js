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
    "../dialog/LogoutConfirm",
    "../utils/ajax",
    "../utils/toTreeObj",
	"dijit/layout/BorderContainer",
	"dijit/layout/ContentPane",
	"../Tree",
	"dojo/data/ItemFileReadStore",
	"dijit/tree/ForestStoreModel",
	"dijit/layout/AccordionContainer",
    "../utils/randomUrl",
    "../layout/TabContainer",
	"dojox/layout/ToggleSplitter"],function($declare,$lang,$_Templated,$_Widget,$connect,$AlertConfirm,$ajax,$toTreeObj,$BorderContainer,$ContentPane,$Tree,$ItemFileReadStore,$ForestStoreModel,$AccordionContainer,$randomUrl,$TabContainer){
	return $declare("capec.frame.TabTree",[$_Widget,$_Templated],{
		templateString: '<div style="display:none"></div>',
		widgetsInTemplate: false,
		postCreate: function() {
			this.inherited(arguments);

			var __ww = $BorderContainer({
				style:{
					width: "100%",
					height: "100%",
					margin:0,
					padding:0
				},
				_splitterClass: "dojox.layout.ToggleSplitter",
				liveSplitters: false,
				design: "headline"
			});

			this._left = $TabContainer({
				region: "left",
				splitter:true,
				minSize:150,
				maxSize:250,
				style:{
					width:"220px",
					margin: "0 0 0 3px"
				}
			});
			this._center = $ContentPane({
				baseClass: "main_tabs",
				region: "center",
				style: {
					margin: "0 3px 0 0"
				},
				content: "<iframe frameborder='0' height='100%' width='100%' src=''></iframe>"
			});
			this._top = $ContentPane({
				baseClass: "main_top",
				region: "top"
			});
			var __bottom = $ContentPane({
				baseClass: "main_copyright",
				region: "bottom",
				content:"版权所有：郑州新开普电子股份有限公司"
			});


			__ww.placeAt(this.domNode.parentNode);
			this._left.placeAt(__ww.domNode);
			this._center.placeAt(__ww.domNode);
			this._top.placeAt(__ww.domNode);
			__bottom.placeAt(__ww.domNode);
			__ww.startup();

			setTimeout($lang.hitch(this, "_loadTopPage"), 100);
			setTimeout($lang.hitch(this, "_loadLeft"), 100);
//			setTimeout($lang.hitch(this, "_loadDefPage"), 100);
		},
		_loadLeft: function(){
			var ___fun = $AccordionContainer({ title: "常用功能" });
			this._left.addChild(___fun);
			//
			var __allfun = $AccordionContainer({ title: "全部功能" });
			this._left.addChild(__allfun);
			//
			this._loadTreeData();
			//
			this._connect1 = $connect.connect(__allfun, "onShow", this, "_loadTreeData2");
		},
		_loadTopPage: function(){
//			var __url = dojo.moduleUrl("capec.frame.resources") +"tabtree/top.html";
			this._top.domNode.innerHTML = "<iframe frameborder='0' height='100%' width='100%' src='"+ $randomUrl(this.topPage) +"'></ifram>";
		},
		_loadDefPage: function(){
			this._openNewTab({ href: [this.defaultPage] });
		},
		_loadTreeData: function(){
			$ajax({
				async: true,
				url: this.offenSource,
				callback: $lang.hitch(this, "_loadTreeDataBack2")
			});
		},
		_loadTreeData2: function(){
			this._connect1.remove();
			$ajax({
				async: true,
				url: this.menuSource,
				callback: $lang.hitch(this, "_loadTreeDataBack")
			});
		},
		_loadTreeDataBack: function($data){
			var __treeObj = $toTreeObj($data,0,{
				identifier: $data.identifier,
				fidentifier: "p_id",
				label: $data.label
			});

			for(var __i_3=0,__tree_3,__acc_3=this._left.getChildren()[1];__tree_3=__treeObj.children[__i_3];__i_3++){
				var __pane_4 = new $ContentPane({
					title: __tree_3.modulename,
					iconClass:__tree_3.icon,
					style: {
						margin: 0,
						padding: "2px"
					}
				});

				__acc_3.addChild(__pane_4);

				if(__tree_3.children != null){
					var __tree_5 = new $Tree({
						showRoot: false,
						openOnDblClick: true,
						model: new $ForestStoreModel({
							store: new $ItemFileReadStore({
								data: {
									"identifier": "id",
									"label": "modulename",
									"items": __tree_3.children
								}
							}),
							query: { "type": "*" },
							rootId: "id",
							rootLabel: "modulename",
							childrenAttrs: ["children"]
						}),
						style: {
							margin: 0,
							padding: 0
						}
					}).placeAt(__pane_4.containerNode);

					__tree_5.on("click", $lang.hitch(this, "_openNewTab"));
				}
			}
		},
		_loadTreeDataBack2: function($data){
			var __treeObj = $toTreeObj($data,0,{
				identifier: $data.identifier,
				fidentifier: "p_id",
				label: $data.label
			});

			for(var __i_3=0,__tree_3,__acc_3=this._left.getChildren()[0];__tree_3=__treeObj.children[__i_3];__i_3++){
				var __pane_4 = new $ContentPane({
					title: __tree_3.modulename,
					iconClass:__tree_3.icon,
					style: {
						margin: 0,
						padding: "2px"
					}
				});

				__acc_3.addChild(__pane_4);

				if(__tree_3.children != null){
					var __tree_5 = new $Tree({
						showRoot: false,
						openOnDblClick: true,
						model: new $ForestStoreModel({
							store: new $ItemFileReadStore({
								data: {
									"identifier": "id",
									"label": "modulename",
									"items": __tree_3.children
								}
							}),
							query: { "type": "*" },
							rootId: "id",
							rootLabel: "modulename",
							childrenAttrs: ["children"]
						}),
						style: {
							margin: 0,
							padding: 0
						}
					}).placeAt(__pane_4.containerNode);

					__tree_5.on("click", $lang.hitch(this, "_openNewTab"));
				}
			}

			this._loadDefPage();
		},
		_openNewTab: function($module){
			var __href = $module.href[0];
			if(__href && __href != "" && this._center.get("currUrl") != __href){
				this._center.set("currUrl", __href);
				this._center.domNode.children[0].src = $randomUrl(__href);
			}
		},
		openNewTab: function($module){
			this._openNewTab($module);
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
			top.location.href = this.logoutPage;
		}
	});
});