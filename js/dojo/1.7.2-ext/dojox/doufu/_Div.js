/**
 * 作者：黄鑫
 * 日期：2013-05-04
 * 描述：_Div
 */
define(["dojo/_base/declare",
	"dijit/_Templated",
	"dijit/_Widget"],function($declare,$_Templated,$_Widget){
	return $declare("fore.doufu._Div",[$_Widget,$_Templated],{
		templateString: '<div></div>'
	});
});