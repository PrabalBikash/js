/**
 * 作者：黄鑫
 * 日期：2013-03-28
 * 描述：表单对话框封装
 */
define(["dojo/_base/connect",
	"dojo/_base/declare",
	"dojo/i18n!./nls/FormDialog",
	"dojo/_base/array",
	"dojo/_base/lang",
	"dijit/Dialog",
	"dojo/dom-construct",
	"dijit/form/Button"], function($connect,$declare,$i18n,$array,$lang,$Dialog,$domConstruct,$Button) {
	return $declare($Dialog,{
		model: "Create",
		bassClass: "",
		_connects_: null,
		constructor: function($params) {
			this.href = arguments[0].vpath + this.href;
			this._connects_ = [];
		},
		postCreate: function() {
			this.inherited(arguments);
			var __divClass = this.bassClass +"dialogPaneActionBar";
			this._div = $domConstruct.create("div", { "class": __divClass }, this.domNode);
			this._addButtons();
		},
		_addButtons: function(){
			var __btnParams = {};
			__btnParams["class"] = this.bassClass +"dialogPaneButton";

			var __newBtn = null;
			var __connect = null;

			__btnParams.label = "保存";
			__newBtn = new $Button(__btnParams);
			this._div.appendChild(__newBtn.domNode);
			this._connects_.push($connect.connect(__newBtn, "onClick", this, "_submit"));

			__btnParams.label = "重置";
			__newBtn = new $Button(__btnParams);
			this._div.appendChild(__newBtn.domNode);
			this._connects_.push($connect.connect(__newBtn, "onClick", this, "_reset"));

			__btnParams.label = "关闭";
			__newBtn = new $Button(__btnParams);
			this._div.appendChild(__newBtn.domNode);
			this._connects_.push($connect.connect(__newBtn, "onClick", this, "hide"));

		},
		addButton: function($button){
			var __btnParams = {};
			__btnParams["class"] = this.bassClass +"dialogPaneButton";
			__btnParams.label = $button.label;

			var __newBtn = new $Button(__btnParams);
			this._div.appendChild(__newBtn.domNode);
			this._connects_.push($connect.connect(__newBtn, "onClick", this, $button.funName));
		},
		onLoad: function(){
			this.inherited(arguments);
			this._draw();
			this._setTitle();
			this._setData();
		},
		_removeHandles: function(){
			for(var __p in this._connects_){
				this._connects_[__p].remove();
			}
		},
		show: function(){
			this.model = arguments[0].model;
			if(dijit.byId(this.fid) != undefined){
				this._setTitle();
				this._setData();
			}
			this.inherited(arguments);
		},
		destroy: function(){
			this._removeHandles();
			this.destroyDescendants();
			this.inherited(arguments);
		}
	});
});
