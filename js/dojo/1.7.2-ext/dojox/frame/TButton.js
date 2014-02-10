/**
 * 作者：黄鑫
 * 日期：2013-03-11
 * 描述：主框架工具栏按钮
 */
define(["dojo/_base/declare",
	//"dojo/text!./resources/TButton.html",
	"dijit/_Templated",
	"dijit/_Widget",
	"dojo/_base/connect"],function($declare,$_Templated,$_Widget,$connect){
	return $declare("capec.frame.TButton",[$_Widget,$_Templated],{
		templateString: '<li><a href="javascript:void(0);" class="${baseClass}"><img src="${src}" alt="${label}"/></a><a href="javascript:void(0);">${label}</a></li>',
		widgetsInTemplate: true,
		baseClass: "",
		src: "",
		href: "#",
		label: "",
		openmode: "inner",
		moduleid: "",
//		_onClick: function(){
//			var __model = {};
//			__model.id = this.moduleid;
//			__model.label = this.label;
//			__model.href = this.href;
//			__model.openmode = this.openmode;
//			__model.src = this.src;
//			$connect.publish("/capec/MainTabs/openNewTab/",[__model]);
//		},
		postCreate: function() {
			this.inherited(arguments);
		}
	});
});