/*!
 * VerybsIE v0.0.1 (http://www.foreworld.net)
 * Copyright 2013 Foreworld.Net, Inc.
 * Licensed under http://www.apache.org/licenses/LICENSE-2.0
 */

if (typeof "undefined" === jQuery) { throw new Error("VerybsIE requires jQuery") }

;(function($,undefined){ "use strict"
	console.log("Hello, VerybsIE!");

	function breadcrumbFix(){
		var i,j;
		var breadcrumb = $(".breadcrumb");
		var children = breadcrumb.children();

		for (i=1,j=children.length;i<j;i++){
			$(children[i]).prepend("<span class='verybsie-breadcrumb'>/</span>");
		}
	}

	function verybsie(){
		breadcrumbFix();
	}

	$().ready(function () {
		verybsie();
	});
})(jQuery);
