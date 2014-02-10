/**
 * 作者：黄鑫
 * 日期：2013-04-01
 * 描述：增强树
 */
define(["dojo/_base/declare",
	"capec/Tree"], function($declare,$Tree){
	return $declare("capec.EnhancedTree", $Tree, {
		_oldSelectedItem: null,
		postCreate: function(){
			this.inherited(arguments);
			this._oldSelectedItem = this.model.root;
		},
		onClick: function($item){
			this.inherited(arguments);
			if(this._oldSelectedItem != $item){
				this._oldSelectedItem = $item;
				this.onSelected($item);
			}
		},
		onSelected: function($item){},
		refresh: function($model) {
		    this.dndController.selectNone();
		    this._itemNodesMap = {};
		    this.rootNode.state = "UNCHECKED";
		    this.model.root.children = null;
		    this.rootNode.destroyRecursive();
		    this.model.constructor($model);
		    this.postMixInProperties();
		    this._load();
		}
	});
});