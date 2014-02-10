define(["dojo",
	"dojox",
	"require",
	"dojo/_base/declare",
	"dojo/text!./resources/Doufu.html",
	"dijit/layout/ContentPane",
	"dojo/_base/lang",
	"dijit/_Templated",
	"dijit/_Widget",
	"dojo/dom-style",
	"./_Doufu",
	"dojo/_base/array",
	"dojo/i18n!./nls/_Doufu"],function($dojo,$dojox,$require,$declare,$template,$ContentPane,$lang,$_Templated,$_Widget,$domStyle,$_Doufu,$array,$i18n){


	var Doufu = $declare("fore.doufu.Doufu",[$_Widget,$_Templated],{
		templateString: $template,
		showTitle: true,
		baseClass: "foreDoufu",
		title: "No Name",
		bio: "No Content",
		baseBackgroundColor: "#fff",
		mouseBackgroundColor: "#def",

		query: null,
		queryOptions: null,
		store: null,
		_store_connects:null,
		items: null,

		_hide: function(){
			this.domNode.style.display = "none";
		},
		_show: function(){
			this.domNode.style.display = "";
		},

		isHidden: function(){
			return this.domNode.style.display == "none";
		},
		show: function(){
			if(this.isHidden()) this._show();
		},
		hide: function(){
			if(!this.isHidden()) this._hide();
		},



		postCreate: function(){
			console.log("postCreate");
			var __domNode = this.domNode;
			this.inherited(arguments);
			$domStyle.set(__domNode,"backgroundColor",this.baseBackgroundColor);
			this.connect(__domNode, "onmouseenter", function(e) {
				this._changeBackground(this.mouseBackgroundColor);
			});
			this.connect(__domNode, "onmouseleave", function(e) {
				this._changeBackground(this.baseBackgroundColor);
			});
		},
		_changeBackground: function(toCol){
			console.log(toCol);
		},
		buildRendering: function(){
			console.log("buildRendering");
			this.inherited(arguments);
		},
		destroy: function(){
			console.log("destroy");
			this.inherited(arguments);
		},
		constructor: function(a,b,c,d){
			this.more = $i18n.more;
			console.log("constructor");
			this.inherited(arguments);
		},
		startup: function(a,b,c,d){
			console.log("startup");
			this.inherited(arguments);
		},
		setStore: function($store, $query, $queryOptions){
			console.log("setStore");
			this._setQuery($query, $queryOptions);
			this._setStore($store);
			this._refresh(true);
		},

		_setStore: function($store){
			if(this.store && this._store_connects){
				$array.forEach(this._store_connects, this.disconnect, this);
				console.log(333);
			}
			this.store = $store;


			if(this.store){
				var f = this.store.getFeatures();
				var h = [];

				this._canEdit = !!f["dojo.data.api.Write"] && !!f["dojo.data.api.Identity"];
				this._hasIdentity = !!f["dojo.data.api.Identity"];

				if(!!f["dojo.data.api.Notification"] && !this.items){
					h.push(this.connect(this.store, "onSet", "_onSet"));
					h.push(this.connect(this.store, "onNew", "_onNew"));
					h.push(this.connect(this.store, "onDelete", "_onDelete"));
				}
				if(this._canEdit){
					h.push(this.connect(this.store, "revert", "_onRevert"));
				}

				this._store_connects = h;
			}
		},

		setQuery: function($query, $queryOptions){
			this._setQuery($query, $queryOptions);
			this._refresh(true);
		},

		_setQuery: function($query, $queryOptions){
			this.query = $query;
			this.queryOptions = $queryOptions || this.queryOptions;
		},

		_refresh: function($isRender){
			this._clearData();
			this._fetch(0, $isRender);
		},

		_clearData: function(){
			console.log("_clearData");
		},

		_fetch: function($start, $isRender){
			if(this.store){
				console.log($start +" "+ $isRender);

				if(this.items){
					console.log(11);
				}else{
					this.store.fetch({
						queryOptions: this.queryOptions,
						isRender: $isRender,
						onBegin: $lang.hitch(this, "_onFetchBegin"),
						onComplete: $lang.hitch(this, "_onFetchComplete"),
						onError: $lang.hitch(this, "_onFetchError")
					});
				}
			}
		},

		_onFetchBegin: function(size, req){
			//console.log("_onFetchBegin");
			//console.log(arguments);
		},

		_onFetchComplete: function(items, req){
			console.log("_onFetchComplete");
			console.log(arguments);
			console.log(this.domNode);
			console.log("-------------");
			console.log(this.viewsNode);
			console.log("-------------");
		},
		_onFetchError: function(err, req){
			//console.log("_onFetchError");
			//console.log(arguments);

			console.log("-------------");
			console.log(this.viewsNode);
			console.log("-------------");
		},

		_onSet: function(item, attribute, oldValue, newValue){

		},

		_onNew: function(item, parentInfo){
			console.log(item);
		},

		_onDelete: function(item){

		},

		_onRevert: function(){
			this._refresh();
		}

	});

	return Doufu;

});