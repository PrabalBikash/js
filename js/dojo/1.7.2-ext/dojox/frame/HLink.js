/**
 * 作者：黄鑫
 * 日期：2013-04-10
 * 描述：link链接
 */
define(["dojo/_base/declare",
	"dijit/_Templated",
	"dijit/_Widget"],function($declare,$_Templated,$_Widget){
	return $declare([$_Widget,$_Templated],{
		templateString: '<h3><a href="${url}" style="cursor:${cursor}">${name}</a></h3>'
	});
});