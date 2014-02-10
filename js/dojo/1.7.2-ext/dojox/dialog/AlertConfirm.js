/**
 * 作者：黄鑫
 * 日期：2013-03-28
 * 描述：提示确认对话框
 */
define(["dijit/Dialog",
	"dojo/_base/connect",
	"dojo/_base/declare",
	"dojo/dom-construct",
	"dijit/form/Button",
	"dojo/_base/lang",
	"dojo/i18n!./nls/AlertConfirm",
	"dijit/form/Button"], function($Dialog, $connect, $declare,$domConstruct,$Button,$lang,$i18n) {
	return $declare($Dialog, {
		_fn: null,
		baseClass: "",
		constructor: function($params) {
			this._fn = $params.confirm;
			var __content = [];
			__content.push("<div class='dijitDialogPaneContentArea'>");
			__content.push("<div style='height:32px;line-height:20px;'>");
			__content.push("<img style='float:left;' src='");
			__content.push($params.img);
			__content.push("'/>&nbsp;&nbsp;&nbsp;&nbsp;");
			__content.push(this.msg);
			__content.push("</div>");
			__content.push("</div>");
			this.content = __content.join("");
		},
		postCreate: function() {
			this.inherited(arguments);
			var __divClass = this.baseClass +"dialogPaneActionBar";
			this._div = $domConstruct.create("div", { "class": __divClass }, this.domNode);
			this._addButtons();
		},
		_addButtons: function(){
			var __param = {};
			__param["class"] = this.bassClass +"dialogPaneButton";

			__param.label = $i18n.btn_ok;
			this._okBtn = new $Button(__param);
			this._div.appendChild(this._okBtn.domNode);
			this._okBtn.on("click", $lang.hitch(this,"_ok"));

			__param.label = $i18n.btn_cancel;
			this._canBtn = new $Button(__param);
			this._div.appendChild(this._canBtn.domNode);
			this._canBtn.on("click", $lang.hitch(this,"hide"));
		},
		buildRendering: function() {
			this.inherited(arguments);
		},
		startup: function() {
			this.inherited(arguments);
		},
		_ok: function() {
			this._okBtn.set("disabled",true);
			this.hide();
			this._fn();
		},
		setConfirm: function($fn){
			this._fn = $fn;
		},
		show: function(){
			this._okBtn.set("disabled", false);
			this.inherited(arguments);
		},
		destroy: function(){
			this.destroyDescendants();
			this.inherited(arguments);
		}
	});
});
