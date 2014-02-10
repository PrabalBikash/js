/**
 * 作者：黄鑫
 * 日期：2013-04-10
 * 描述：模块图片预览
 */
define(["dojo/_base/declare",
	"dijit/_Templated",
	"dijit/_Widget",
	"dojox/image/LightboxNano",
	"dojox/image/MagnifierLite"],function($declare,$_Templated,$_Widget){
	return $declare([$_Widget,$_Templated],{
		templateString: '<ul class="m_box"><li><a dojoType="dojox.image.LightboxNano" href="${img}"><img height="189" width="142" scale="5.67" dojoType="dojox.image.MagnifierLite" src="${img}" /></a></li><li><strong><center>${menuName}</center></strong></li></ul>',
		widgetsInTemplate: true
	});
});