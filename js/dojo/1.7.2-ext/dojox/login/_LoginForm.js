/**
 * 作者：黄鑫
 * 日期：2013-03-11
 * 描述：登陆表单组件抽象类
 */
define(["dojo/_base/declare",
	"dojo/_base/lang",
	"../utils/randomUrl",
	"../utils/ajax",
	"dojo/i18n!./nls/_LoginForm"],function($declare,$lang,$randomUrl,$ajax,$i18n){
	return $declare(null,{
		_labelUsername: $i18n._labelUsername,
		_labelPassword: $i18n._labelPassword,
		_labelVerifyCode: $i18n._labelVerifyCode,
		_buttonValLogin: $i18n._buttonValLogin,
		_buttonValReset: $i18n._buttonValReset,
		_imgAltVerifyCode: $i18n._imgAltVerifyCode,
		_imgTipVerifyCode: $i18n._imgTipVerifyCode,
		//登陆验证
		_onSubmit: function(){
			this._setButtonLoginDisable(true);
			if(this._verifyForm()) this._loginValidate();
		},
		_setButtonLoginDisable: function($bool){
			this._buttonLogin.disabled = $bool;
		},
		_verifyForm: function(){
			if($lang.trim(this._inputUsername.value) == ""){
				this.setMessage($i18n._verifyUsername);
				this._inputUsername.focus();
				this._setButtonLoginDisable(false);
				return false;
			}
			if($lang.trim(this._inputPassword.value) == ""){
				this.setMessage($i18n._verifyPassword);
				this._inputPassword.focus();
				this._setButtonLoginDisable(false);
				return false;
			}
			if($lang.trim(this._inputVerifyCode.value) == ""){
				this.setMessage($i18n._verifyVerifyCode);
				this._inputVerifyCode.focus();
				this._setButtonLoginDisable(false);
				return false;
			}
			this.setMessage("");
			return true;
		},
		//重置表单
		_onReset: function(){
			this._setButtonLoginDisable(false);
			this._inputUsername.value = "";
			this._inputPassword.value = "";
			this._inputVerifyCode.value = "";
			this.setMessage("");
		},
		//刷新图片验证码
		_refreshVerifyCode: function(){
			this._imgVerifyCode.src = $randomUrl(this.verifyUrl);
		},
		//设置提示信息
		setMessage: function($message){
			this._message.innerHTML = $message;
		},
		_getValues: function(){
			var __form = {};
			__form.username = this._inputUsername.value;
			__form.password = this._inputPassword.value;
			__form.verifyCode = this._inputVerifyCode.value;
			return __form;
		},
		//登陆验证
		_loginValidate: function(){
			$ajax({
				async: true,
				content: this._getValues(),
				url : this.loginUrl,
				callback : $lang.hitch(this, "_onDataLoaded")
			});
		},
		_onDataLoaded: function($data){
			switch($data.status){
			//重复登陆
			case "success":
				this.setMessage("");
				console.log("登陆成功，跳转页面："+ this.nextUrl);
				location.href = $randomUrl(this.nextUrl) +"&locale="+ $data.myinfo.locale +"&theme="+ $data.myinfo.theme;
				break;
			default:
				this._refreshVerifyCode($data.status);
				this.setMessage($data.msg);
				this._setButtonLoginDisable(false);
				this._cleanTextData();
				break;
			}
		},
		_onError: function(){
			this.setMessage($i18n._loginErr);
			this._setButtonLoginDisable(false);
		},
		_onkeydown: function($event){
			if($event.keyCode == 13){
				this._onSubmit();
			}
		},
		_cleanTextData: function($status){
			if($status == "fail"){
				this._inputUsername.value = "";
				this._inputPassword.value = "";
			}else{
				this._inputVerifyCode.value = "";
			}
		}
	});
});