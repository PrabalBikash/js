/**
 * 作者：黄鑫
 * 日期：2013-04-26
 * 描述：异步树
 */
define(["dojo/_base/declare",
	"./EnhancedTree",
	"./utils/ajax",
	"dojo/_base/lang"], function($declare,$Tree,$ajax,$lang){
	return $declare("capec.AsyncTree", $Tree, {
		postCreate: function(){
			this.inherited(arguments);
		},
		_newItems: function($node, $data){
			for(var __i_3=0,__item_3; __item_3=$data.items[__i_3]; __i_3++){
				this.model.store.newItem(__item_3, { parent: $node.node.item, attribute: "children" });
			}
			this.model.store.save();
		},
		_newItems2: function($node, $data){
			for(var __i_3=0,__item_3; __item_3=$data.items[__i_3]; __i_3++){
				this.model.store.newItem(__item_3, { parent: $node, attribute: "children" });
			}
			this.model.store.save();
		},
		_onExpandoClick: function($item){
			console.log(this.dataUrl);
			if($item.node.item.children && $item.node.item.children.length == 0){
				var __param = {
					sync : true,
					content: {},
					url: this.dataUrl,
					//url : "../../testData/org_p"+ $item.node.item[this.identifier][0] +".json",
					callback: $lang.hitch(this, "_newItems", arguments[0])
				};
				__param.content[this.fidentifier] = $item.node.item[this.identifier][0];
				$ajax(__param);
			}
			this.inherited(arguments);
		},
		_onExpandoClick2: function($item){
			console.log(this.dataUrl);
			if($item.children && $item.children.length == 0){
				var __param = {
					sync : true,
					content: {},
					url: this.dataUrl,
					//url : "../../testData/org_p"+ $item.node.item[this.identifier][0] +".json",
					callback: $lang.hitch(this, "_newItems2", arguments[0])
				};
				__param.content[this.fidentifier] = $item[this.identifier][0];
				$ajax(__param);
			}
			this.inherited(arguments);
		}
	});
});