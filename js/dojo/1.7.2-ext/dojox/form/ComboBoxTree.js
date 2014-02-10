/**
 * 作者：黄鑫
 * 日期：2013-04-25
 * 描述：ComboBox树
 */
define(["dojo/_base/declare",
	"dijit/form/ValidationTextBox",
	"dojo/_base/lang",
	"dijit/_HasDropDown",
	"../EnhancedTree",
	"dijit/tree/ForestStoreModel",
	"dojo/_base/connect",
	"../utils/ajax",
	"../utils/toTreeObj",
	"dojo/data/ItemFileWriteStore",
	"dijit/layout/ContentPane"], function($declare, $TextBox, $lang, $_HasDropDown, $Tree, $ForestStoreModel, $connect, $ajax, $toTreeObj, $ItemFileWriteStore, $ContentPane){
	return $declare("capec.form.ComboBoxTree", [$TextBox,$_HasDropDown], {
		baseClass: "dijitTextBox dijitComboBox dijitDateTextBox",
		popupClass: $declare($ContentPane, {
			vpath: "",
			constructor: function(){
				this.inherited(arguments);
				if(arguments.vpath) this.vpath = arguments.vpath;
			},
			postCreate : function() {
				this.inherited(arguments);
				this._loadData();
			},
			_loadData: function(){
				var __treeParams = this.parent.treeParams;
				$ajax({
					async : true,
					url : __treeParams.vpath + __treeParams.dataUrl,
					callback : $lang.hitch(this, "_onDataLoaded")
				});
			},
			_onDataLoaded: function($data){
				var __treeParams = this.parent.treeParams;
				var __items = $toTreeObj($data,__treeParams.rootId,{
					identifier: __treeParams.identifier,
					fidentifier: __treeParams.fidentifier,
					label: __treeParams.label
				}).children;
				var __store = new $ItemFileWriteStore({
					data: {
						identifier: __treeParams.identifier,
						label: __treeParams.label,
						items: __items == undefined ? [] : __items
					}
				});
				this._setStore(__store);
			},
			_addEvents: function(){
				this._connect1 = $connect.connect(this._tree, "onClick", this, "_onSelected");
			},
			_onSelected: function($item){
				var __treeParams = this.parent.treeParams;
				this.parent.closeDropDown();
				var __value = $item.root ? $item.label : $item[__treeParams.label][0];
				var __key = $item.root ? $item.id : $item[__treeParams.identifier][0];
				this.parent.set("value", __value);
				this.parent.set("key", __key);
			},
			_addTree: function($store){
				var __treeParams = this.parent.treeParams;
				this._tree = new $Tree({
					showRoot: __treeParams.showRoot == undefined ? true : __treeParams.showRoot,
					openOnDblClick: true,
					keepSelection: true,
					defaultOpen: true,
					rowSelector: true,
					style: {
						height: "100%",
						margin: 0,
						padding: 0
					},
					model: new $ForestStoreModel({
						store: $store,
						query: { type: "*" },
						rootId: __treeParams.rootId,
						rootLabel: __treeParams.rootLabel,
						childrenAttrs: [ "children" ]
					})
				},document.createElement("div"));
				this.domNode.appendChild(this._tree.domNode);
			},
			_setStore: function($store){
				if($store != null) {
					this._addTree($store);
					this._addEvents();
				}
			},
			getSelectedItem: function(){
				return this._tree.selectedItem;
			},
			_removeHandles: function(){
				this._connect1.remove();
			},
			destroy: function(){
				this._removeHandles();
				this.destroyDescendants();
				this.inherited(arguments);
			}
		}),
		value: "",
		openDropDown: function(){
			if(this.dropDown){
				//this.dropDown.destroy();
			}else{
				var __PopupProto = $lang.isString(this.popupClass) ? $lang.getObject(this.popupClass, false) : this.popupClass;
				var __textBox = this;
				var __value = this.get("value");
				var __params = {
					id: this.id + "_popup",
					dir: __textBox.dir,
					lang: __textBox.lang,
					value: __value,
					parent: this,
					style: {
						height: "100px",
						background: "white",
						border: "1px solid #CCC"
					}
				};
				if(this.styleParams) __params.style = this.styleParams;
				this.dropDown = new __PopupProto(__params);
			}
			this.inherited(arguments);
		},
		closeDropDown: function(/*Boolean*/ focus){
			this.inherited(arguments);
		},
		getSelectedItem: function(){
			//console.log(this);
			//return this.dropDown ? this.dropDown.getSelectedItem() : null;
			return { key: this.key, value: this.value };
		}
	});
});
