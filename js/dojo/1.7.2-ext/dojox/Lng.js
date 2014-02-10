require(["dojo/cookie",
	"dojo/_base/connect"], function($cookie,$connect) {
	$connect.subscribe("/fore/Lng/", function($lng){
		$cookie("locale", $lng, { expires: fo.base.expires });
		location.search = fo.utils.href("?locale="+ $lng);
	});
});
