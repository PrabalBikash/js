/**
 * 作者：黄鑫
 * 日期：2013-03-11
 * 描述：登陆表单组件
 */
define(["dojo/_base/declare",
	"dijit/_Templated",
	"dijit/_Widget",
	//"dojo/text!./resources/LoginForm.html",
	"./_LoginForm"],function($declare,$_Templated,$_Widget,$_LoginForm){
	return $declare([$_Widget,$_Templated,$_LoginForm],{
		baseClass: "",
		templateString: '<div><div class="${baseClass}Row"><p><label for="${id}_inputUsername">${_labelUsername}</label><input id="${id}_inputUsername" dojoAttachPoint="_inputUsername" dojoAttachEvent="onkeydown:_onkeydown" /></p></div><div class="${baseClass}Row"><p><label for="${id}_inputPassword">${_labelPassword}</label><input id="${id}_inputPassword" type="password" dojoAttachPoint="_inputPassword" dojoAttachEvent="onkeydown:_onkeydown" /></p></div><div class="${baseClass}RowV"><p><label for="${id}_inputVerifyCode">${_labelVerifyCode}</label><input id="${id}_inputVerifyCode" dojoAttachPoint="_inputVerifyCode" dojoAttachEvent="onkeydown:_onkeydown" /></p><img src="${verifyUrl}" alt="${_imgAltVerifyCode}" style="cursor:pointer" title="${_imgTipVerifyCode}" dojoAttachEvent="onclick:_refreshVerifyCode" dojoAttachPoint="_imgVerifyCode" /></div><div class="${baseClass}Button"><input type="button" dojoAttachEvent="onclick:_onSubmit" value="${_buttonValLogin}" dojoAttachPoint="_buttonLogin" />&nbsp;&nbsp;<input type="button" dojoAttachEvent="onclick:_onReset" value="${_buttonValReset}" /></div><div class="${baseClass}Message" dojoAttachPoint="_message"></div></div>',
		widgetsInTemplate: true
	});
});