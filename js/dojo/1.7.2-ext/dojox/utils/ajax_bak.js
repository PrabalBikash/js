/**
 * 作者：黄鑫
 * 日期：2013-04-12
 * 描述：ajax封装
 */
define(["./randomUrl",
	"../dialog/AlertDialog"],function($randomUrl,$AlertDialog) {
	var __dlg = $AlertDialog({
		title: "错误",
		msg: "什么什么不能选中!",
		img: "../../images/alert.png"
	});
	return function($xhrArgs){
		$xhrArgs.handleAs = "json";
		$xhrArgs.headers = { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" };
		$xhrArgs.url = $randomUrl($xhrArgs.url);

		if(!$xhrArgs.load){
			$xhrArgs.load = function($data){
				switch($data.code){
					case "":
					case "102":
					case "200":
					case undefined:
						$xhrArgs.callback($data);
						break;
					case "timeout":
						top.location.href = $randomUrl("login.html?msg="+ $data.msg);
						break;
					case "500":
						console.log($data.msg);
			 			__dlg.show({msg: $data.msg});
						break;
					default:
						console.log($data);
						break;
				}
			};
		}

		if(!$xhrArgs.error){
			$xhrArgs.error = function($error, $ioArgs){
				console.log(arguments);
	 			__dlg.show({msg: "页面运行异常，请重试！"});
//				top.location.href = $randomUrl("/baseweb/login.html?status="+ $ioArgs.xhr.status +"&statusText="+$ioArgs.xhr.statusText);
			};
		}

		//var xhrFunc = this.requestMethod.toLowerCase() == "post" ? dojo.xhrPost : dojo.xhrGet;

		dojo.xhrPost($xhrArgs);
	};
});