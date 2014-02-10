define(["dojo/_base/declare",
	"dojo/_base/sniff",
	"dojo/dom-class"],function($declare,$has,$domClass){

	return $declare("fore.doufu._LinkManager",null,{
		constructor: function($inDoufu){
			this.doufu = $inDoufu;
		},

		defaultWidth: 200,
		links: [],

		addLink: function($inLink){
			this.links.push($inLink);
		},

		destroyLinks: function(){
			for(var __i_3=0,__l_3; __l_3=this.links[__i_3]; __i_3++){
				__l_3.destroy();
			}
			this.links = [];
		}
	});
});