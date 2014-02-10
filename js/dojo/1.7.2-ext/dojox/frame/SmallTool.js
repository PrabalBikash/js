/**
 * 作者：黄鑫
 * 日期：2013-03-11
 * 描述：菜单组件
 */
define(["dojo/_base/declare",
	//"dojo/text!./resources/Menus.html",
	"dijit/_Templated",
	"dijit/_Widget",
	"dijit/form/ValidationTextBox",
	"dijit/form/Form"],function($declare,$_Templated,$_Widget){
	return $declare([$_Widget,$_Templated],{
		templateString: '<ul>'+
							'<li is="menuindex" class="nav_vline">'+
								'<a iblk="其它操作" href="javascript:void(0);" class="join_huawei">'+
									'<span>其它操作</span>'+
								'</a>'+
								'<div class="menuitempanel">'+
									'<div class="menucontentdiv menuright">'+
										'<div class="menufillet_e"></div>'+
										'<div class="trad clearfix">'+
											'<ul class="taxonomy" style="width: 100px;">'+
												'<li>'+
													'<a href="javascript:void(0);" class="topfrx">'+
														'<span style="color:#333;font-weight:bold;font-size:14px;">密码修改</span>'+
													'</a>'+
												'</li>'+
												'<!--li><a href="javascript:void(0);" class="topfrx" target="_blank">语言设置</a></li><li><a href="javascript:void(0);" class="topfrx" target="_blank">主题设置</a></li><li><a href="javascript:void(0);" class="topfrx" target="_blank">常用功能设置</a></li-->'+
											'</ul>'+
											'<div class="verticalLine"></div>'+
											'<ul class="m_box" style="width: 300px;">'+
												'<form dojoAttachPoint="_passForm" data-dojo-type="dijit.form.Form">'+
													'<p class="title">'+
														'<span class="m_box_span">原始密码：</span>'+
														'<input data-dojo-type="dijit.form.ValidationTextBox" intermediateChanges="false" type="password"  dojoAttachPoint="_oldPass" data-dojo-props=\'required:true,trim:true,regExpGen:function(){return "^[a-zA-Z0-9_]{6,16}$";}\' invalidMessage="6-16个字符，支持英文大小写、数字、下划线，区分大小写"/>'+
													'</p>'+
													'<p class="title">'+
														'<span class="m_box_span">新设密码：</span>'+
														'<input name="newpass" id="_passForm_newPass" data-dojo-type="dijit.form.ValidationTextBox" intermediateChanges="false" type="password" dojoAttachPoint="_newPass" data-dojo-props=\'required:true,trim:true,regExpGen:function(){return "^[a-zA-Z0-9_]{6,16}$";}\' invalidMessage="6-16个字符，支持英文大小写、数字、下划线，区分大小写"/>'+
													'</p>'+
													'<p class="title">'+
														'<span class="m_box_span">确认密码：</span>'+
														'<input name="valpass" data-dojo-type="dijit.form.ValidationTextBox" intermediateChanges="false" type="password" dojoAttachPoint="_newPas2" data-dojo-props=\'required:true,trim:true,regExpGen:function(){return "^[a-zA-Z0-9_]{6,16}$";}\' invalidMessage="两次输入的密码不符合规范或不一致" constraints="{\'other\': \'_passForm_newPass\'}" />'+
													'</p>'+
													'<p class="title" style="text-align: center; margin-top: 10px;">'+
														'<input name="" type="button" value="确认" dojoAttachEvent="onclick:_changePass" class="btn1" />'+
													'</p>'+
												'</form>'+
											'</ul>'+
										'</div>'+
										'<div class="shadow_b_layout"><div>'+
									'</div>'+
								'</div></div></div></li></ul>',
		widgetsInTemplate: true,
		postCreate: function() {
			this.inherited(arguments);
			//获取模块数据
			this._loadData();
		},
		_loadData: function(){
			//console.log("获取模块列表");
		},
		_changePass: function(){
			var __args = {
				oldPass: this._oldPass.value,
				newPass: this._newPass.value,
				newPas2: this._newPas2.value
			};
			if(this._passForm.validate()) {
				this.services.changePass(__args);
			}
		},
		_resetPass: function(){
			this._passForm.reset();
		}
	});
});