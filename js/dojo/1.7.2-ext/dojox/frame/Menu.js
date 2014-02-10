/**
 * 作者：黄鑫
 * 日期：2013-03-11
 * 描述：菜单组件
 */
define(["dojo/_base/declare",
	//"dojo/text!./resources/Menus.html",
	"dijit/_Templated",
	"dijit/_Widget",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"./Link",
	"./HLink",
	"./PreImg",
	"../utils/ajax"],function($declare,$_Templated,$_Widget,$lang,$domConstruct,$Link,$HLink,$PreImg,$ajax){
	return $declare("capec.frame.Menu",[$_Widget,$_Templated],{
		templateString: '<li is="menuindex" class="nav_vline"><a iblk="${menuName}" href="javascript:void(0);" class="trad"><span>${menuName}</span> </a><div class="menuitempanel"><div class="menucontentdiv"><div class="menufillet_e"></div><div class="trad clearfix" dojoAttachPoint="_menuItems"><div class="shadow_b_layout"><div></div></div></div></div></li>',
		widgetsInTemplate: false,
		postCreate: function() {
			this.inherited(arguments);
			//获取模块数据
		},
		_setDataAttr: function($value){
			var __item = $value;
			var __mode = __item.resource_load_mode;

			if(__mode == 1){
				var __ul = $domConstruct.create("ul", { "class": "taxonomy" }, this._menuItems);

				for(var __i_3=0,__item_3; __item_3=__item.children[__i_3]; __i_3++){
					var __link_4 = new $Link({
						url: "javascript:void(0)",
						name: __item_3.modulename,
						cursor: __item_3.href == "" ? "default" : "auto"
					});

					__link_4.on("click", $lang.hitch(this.parent._tabs, "openNewTab", {
						id: __item_3.id,
						label: __item_3.modulename,
						href: __item_3.href,
						openmode: __item_3.openmode,
						src: __item_3.src
					}));

					__link_4.placeAt(__ul);
				}
			}else{
				if(__item.children){
					for(var __i_3=0,__item_3; __item_3=__item.children[__i_3]; __i_3++){
						var __ul_4 = $domConstruct.create("ul", { "class": "list" }, this._menuItems);
						var __hlink_4 = new $HLink({
							url: "javascript:void(0)",
							name: __item_3.modulename,
							cursor: __item_3.href == "" ? "default" : "auto"
						});

						__hlink_4.on("click", $lang.hitch(this.parent._tabs, "openNewTab", {
							id: __item_3.id,
							label: __item_3.modulename,
							href: __item_3.href,
							openmode: __item_3.openmode,
							src: __item_3.src
						}));
						__hlink_4.placeAt(__ul_4);

						if(__item_3.children){
							for(var __i_5=0,__item_5; __item_5=__item_3.children[__i_5]; __i_5++){
								var __link_6 = new $Link({
									url: "javascript:void(0)",
									name: __item_5.modulename
								});

								__link_6.on("click", $lang.hitch(this.parent._tabs, "openNewTab", {
									id: __item_5.id,
									label: __item_5.modulename,
									href: __item_5.href,
									openmode: __item_5.openmode,
									src: __item_5.src
								}));

								__link_6.placeAt(__ul_4);
							}
						}
					}
				}
			}

			$domConstruct.create("div", { "class": "verticalLine" }, this._menuItems);

			var __preImg = new $PreImg({
				menuName: __item.modulename,
				img: __item.large_icon_code
			});
			__preImg.placeAt(this._menuItems);
		}
	});
});