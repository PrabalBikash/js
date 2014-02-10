/*require(["dojo/ready",
	"dojo/_base/array",
	"dojo/dom-construct",
	"dojo/query",
	"dojo/cookie",
	"dojo/_base/connect"], function($ready,$array,$domconstruct,$query,$cookie,$connect) {
	$connect.subscribe("/fore/Theme/", function($theme){
		$cookie("theme", $theme, { expires: fo.base.expires });
		fo.base.theme = $theme;
		$ready(1, function() {
			$query('link[href*="theme"]').orphan();
			var __csss = [ require.toUrl("dijit/themes/"+ $theme +"/"+ $theme +".css") ];
			var __head = $query("head")[0];
			$array.forEach(__csss, function($css) {
				if (document.createStyleSheet) {
					document.createStyleSheet($css);
				} else {
					$domconstruct.place('<link rel="stylesheet" type="text/css" href="'+ $css +'"/>', __head);
				}
			});
		});
	});
});*/
/**
 * 作者：黄鑫
 * 日期：2013-05-17
 * 描述：换肤功能
 */
require(["require",
 	"dojo/_base/array",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/query",
	"dojo/ready",
	"dojo/_base/window"], function($require, array, domClass, domConstruct, query, $ready, win){
	$ready(1, function(){
		var __defTheme = "capec";
		var __themes = ["", __defTheme, "night", ""];

		var __theme = top.location.search.match(/theme=([\w\-]+)/) ? RegExp.$1 : __defTheme;

		if(__themes.join(",").indexOf(","+ __theme +",") == "-1"){
			__theme = __defTheme;
		}

		if(__theme != __defTheme){
			var __body = win.body();
			domClass.replace(__body, __theme, __defTheme);

			query('link[href$="/require.css"]').orphan();

			var __links = query('link[href*="/'+ __defTheme +'"]');
			__links.orphan();

			var __head = query("head")[0];

			array.forEach(__links, function($item){
				var __css = $item.href.replaceAll("/"+ __defTheme, "/"+ __theme);
				if(document.createStyleSheet){
					document.createStyleSheet(__css);
				}else{
					domConstruct.place('<link rel="stylesheet" type="text/css" href="'+__css+'"/>',__head);
				}
			});
			var __require = $require.toUrl("dijit/themes/require.css");
			if(document.createStyleSheet){
				document.createStyleSheet(__require);
			}else{
				domConstruct.place('<link rel="stylesheet" type="text/css" href="'+ __require +'"/>',__head);
			}
		}
	});
});