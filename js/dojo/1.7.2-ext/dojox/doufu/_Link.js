define(["dojo",
	"dojox",
	"require",
	"dojo/_base/declare",
	"dojo/text!./resources/_Link.html",
	"dijit/layout/ContentPane",
	"dojo/_base/lang",
	"dijit/_Templated",
	"dijit/_Widget",
	"dojo/dom-style",
	"dojo/_base/window"],function($dojo,$dojox,$require,$declare,$template,$ContentPane,$lang,$_Templated,$_Widget,$domStyle,$window){


	return $declare("fore.doufu._Link",[$_Widget,$_Templated],{

		constructor: function(a,b,c,d){
			console.log("_Link");
			this.inherited(arguments);


		},

		postCreate: function(){
			console.log(this.linkNode);
		},

		templateString: $template,

		setStructure: function($inStructure){
			var __vs = (this.structure = $inStructure);
			console.log("===================================");
			console.log(__vs);
			console.log(this.index);
			console.log("===================================");

			this.updateStructure();
		},

		updateStructure: function(){
			console.log("更新数据");

			var __win = $window.doc;


			var __li = __win.createElement("li");
			__li.innerHTML = "aaa";
			this.linkNode.appendChild(__li);

			var __li2 = __win.createElement("li");
			__li2.innerHTML = "aaabb";
			this.linkNode.appendChild(__li2);
			console.log("_Link");
		}
	});

});