/**
 * 作者：黄鑫
 * 日期：2013-04-12
 * 描述：ajax封装
 */
define(["./randomUrl"],function($randomUrl) {
	return function($xhrArgs){
		$xhrArgs.handleAs = "json";
		$xhrArgs.headers = { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" };
		$xhrArgs.url = $randomUrl($xhrArgs.url);

		if(!$xhrArgs.load){
			$xhrArgs.load = function($data){
				switch($data.status){
					case undefined:
					case "success":
						$xhrArgs.callback($data);
						break;
					case "timeout":
						top.location.href = $randomUrl("login.html?msg="+ $data.msg);
						break;
					case "failure":
						console.log($data);
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
				//top.location.href = $randomUrl("login.html?status="+ $ioArgs.xhr.status +"&statusText="+$ioArgs.xhr.statusText);
			};
		}

		//var xhrFunc = this.requestMethod.toLowerCase() == "post" ? dojo.xhrPost : dojo.xhrGet;

		dojo.xhrPost($xhrArgs);
	};
});