/**
 * 作者: 黄鑫
 * 日期: 2013-05-06
 * 作用: CheckboxTree
 */
define(["dojo/_base/declare",
        "cbtree/Tree" ], function($declare, $Tree) {
	return $declare("capec.CheckboxTree", $Tree, {
		_onKeyPress: function($evt){
			if($evt.charCode != 32 && $evt.keyCode != 0) this.inherited(arguments);
		}
	});
});