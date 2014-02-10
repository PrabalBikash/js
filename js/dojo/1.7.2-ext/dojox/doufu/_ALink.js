/**
 * 作者：黄鑫
 * 日期：2013-05-04
 * 描述：_ALink
 */
define(["dojo/_base/declare",
	"dijit/_Templated",
	"dijit/_Widget"],function($declare,$_Templated,$_Widget){
	return $declare("fore.doufu._ALink",[$_Widget,$_Templated],{
		templateString: '<a></a>'
	});
});