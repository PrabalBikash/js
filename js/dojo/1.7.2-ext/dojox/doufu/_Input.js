/**
 * 作者：黄鑫
 * 日期：2013-05-19
 * 描述：_Input
 */
define(["dojo/_base/declare",
	"dijit/_Templated",
	"dijit/_Widget"],function($declare,$_Templated,$_Widget){
	return $declare("fore.doufu._Input",[$_Widget,$_Templated],{
		templateString: '<input dojoAttachEvent="onkeydown:_onkeydown" />',
		_onkeydown: function(){ }
	});
});