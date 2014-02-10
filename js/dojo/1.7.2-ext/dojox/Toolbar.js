/**
 * 作者: 黄鑫
 * 日期: 2013-5-15
 * 作用: 对原生工具栏功能增强
 */
define(["dojo/_base/declare",
    	"dijit/form/Button",
        "dijit/Toolbar" ], function($declare, $Button, $Toolbar) {
	return $declare("capec.Toolbar", $Toolbar, {
		startup: function(){
			this.inherited(arguments);
			this.addChild(new $Button({ iconClass: "dijitEditorIcon dijitEditorIconSpace", disabled: true }));
		}
	});
});