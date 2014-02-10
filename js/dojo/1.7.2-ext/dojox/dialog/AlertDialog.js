/**
 * 作者：黄鑫
 * 日期：2013-03-28
 * 描述：提示对话框
 */
define(["require",
    "dijit/Dialog",
	"dojo/_base/connect",
	"dojo/_base/declare",
	"dojo/dom-construct",
	"dijit/form/Button",
	"dojo/_base/lang",
	"dojo/dom",
	"dojo/i18n!./nls/AlertConfirm",
	"dijit/form/Button"], function($require,$Dialog, $connect, $declare,$domConstruct,$Button,$lang,$dom,$i18n) {
	return $declare($Dialog, {
		_fn: null,
		baseClass: "",
		postCreate: function() {
			this.inherited(arguments);
			var __divClass = this.baseClass +"dialogPaneActionBar";
			this._div = $domConstruct.create("div", { "class": __divClass }, this.domNode);
			this._addButtons();
		},
		_addButtons: function(){
			var __param = {};
			__param["class"] = this.bassClass +"dialogPaneButton";

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
		show: function($params){
			var __content = [];
			__content.push("<div class='dijitDialogPaneContentArea'>");
			__content.push("<div style='height:32px;line-height:20px;'>");
			__content.push("<img style='float:left;' src='");
			__content.push($require.toUrl("capec/dialog/resources/images/error_32.png"));
			__content.push("'/>&nbsp;&nbsp;&nbsp;&nbsp;");
			__content.push($params.msg);
			__content.push("</div>");
			__content.push("</div>");
			this.set("content", __content.join(""));
			this.inherited(arguments);
		},
		destroy: function(){
			this.destroyDescendants();
			this.inherited(arguments);
		}
	});
});
