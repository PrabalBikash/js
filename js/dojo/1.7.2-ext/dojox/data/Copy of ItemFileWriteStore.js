define(["dojo/data/ItemFileWriteStore",
	"dojo/_base/declare",
	"dojo/_base/connect",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/i18n!./nls/ItemFileWriteStore"], function($ItemFileWriteStore,$declare,$connect,$lang,$array,$i18n){
	return $declare("fore.data.ItemFileWriteStore",$ItemFileWriteStore,{
		_cmdInfo: null,
		constructor: function($params){
			this._cmdInfo = $params.cmdInfo;
			this.inherited(arguments);
		},
		newItem: function($keywordArgs,$parentInfo){
			$connect.publish("/fore/ajax/",{
				url: "../Api.ashx?command="+ this._cmdInfo[0],
				params: $keywordArgs,
				cbe: function(){ return true; },
				cba: $lang.hitch(this, "_newItem_", arguments)
			});
		},
		_newItem_: function($data){
			if(arguments[1] == null || arguments[1].opt != null) {
				$connect.publish("/fo/show/alertDlg/",{
					title: $i18n.title,
					msg: arguments[1].msg,
					img: require.toUrl("fore/dialog/resources/images/error_32.png")
				});
				this.onNewItemError();
				return;
			}
			dojo.mixin($data[0],arguments[1].items[0]);
			this.inherited($data);
			this.save();
			this.onNewItem($data[0]);
			return true;
		},
		onNewItemError: function(){},
		onNewItem: function(/* newItem */ $newItem){},
		deleteItems: function($keywordArgs){
			$connect.publish("/fore/ajax/",{
				url: "../Api.ashx?command="+ this._cmdInfo[2],
				params: { ids: $keywordArgs.join(",") },
				cbe: function(){ return true; },
				cba: $lang.hitch(this, "_deleteItems_", arguments)
			});
		},
		_deleteItem_: function($id){
			this.fetchItemByIdentity({
				identity: $id,
				onItem: $lang.hitch(this,"deleteItem")
			});
		},
		_deleteItems_: function($data){
			if(arguments[1] == null || arguments[1].opt != null){
				$connect.publish("/fo/show/alertDlg/",{
					title: $i18n.title,
					msg: arguments[1].msg,
					img: require.toUrl("fore/dialog/resources/images/error_32.png")
				});
				return;
			}
			var __ids = $data[0];
			$array.forEach(__ids, $lang.hitch(this,"_deleteItem_"));
			this.save();
			this.onDeletes(__ids);
			return true;
		},
		onDeletes: function(/* id */ $deletedIds){},
		setAllValue: function($newValues){
			$connect.publish("/fore/ajax/",{
				url: "../Api.ashx?command="+ this._cmdInfo[1],
				params: $newValues,
				cbe: function(){ return true; },
				cba: $lang.hitch(this, "_setAllValue_", arguments)
			});
		},
		_setAllValue: function(){
			var __item = arguments[1];
			var __newValue = arguments[0][1].items[0];
			var __identity = this._features["dojo.data.api.Identity"];
			for(var __prop_3 in __newValue){
				if(__prop_3 != __identity) this.setValue(__item, __prop_3, __newValue[__prop_3]);
			}
			this.save();
			this.onSetAllValue(__newValue);
		},
		_setAllValue_: function($data){
			if(arguments[1] == null || arguments[1].opt != null){
				$connect.publish("/fo/show/alertDlg/",{
					title: $i18n.title,
					msg: arguments[1].msg,
					img: require.toUrl("fore/dialog/resources/images/error_32.png")
				});
				this.onSetAllValueError();
				return;
			}
			var __identity = this._features["dojo.data.api.Identity"];
			this.fetchItemByIdentity({
				identity: $data[0][__identity],
				onItem: $lang.hitch(this,"_setAllValue", arguments)
			});
			return true;
		},
		onSetAllValue: function(/* newValue */ $newValue){},
		onSetAllValueError: function(){}
	});
});