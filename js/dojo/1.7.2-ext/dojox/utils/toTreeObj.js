/**
 * 作者：黄鑫
 * 日期：2013-03-11
 * 描述：Json数据转Tree格式
 */
define(function() {
	var __data2TreeObject = function($data,$parentId,$params,$treeObj){
		var __treeArr = [];
		for( var __i_3=0,__item_3;__item_3=$data.items[__i_3];__i_3++) {
			if(__item_3[$params.fidentifier] == $parentId) {
				__treeArr.push(__item_3);
				__data2TreeObject($data,__item_3[$params.identifier],$params,__item_3);
			}
		}
		if(__treeArr.length > 0) {
			$treeObj["children"] = __treeArr;
		}else{
			if($treeObj["children"] == null) delete $treeObj.children;
		}
	};
	return function($data,$rootId,$params){
		var __treeObj = {};
		__treeObj[$params.identifier] = $rootId;
		__treeObj[$params.label] = "郑州新开普电子股份有限公司";
		__data2TreeObject($data,$rootId,$params,__treeObj);
		return __treeObj;
	};
});