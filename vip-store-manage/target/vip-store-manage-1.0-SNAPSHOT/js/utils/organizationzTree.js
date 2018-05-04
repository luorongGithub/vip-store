//
//	var treeObject={serverPath:serverPath, treePullDown:"#treePullDown", orgId:"#orgId", orgName:"#orgName", orgType:"#orgType", level:"#level"};
//	$(function() {
//		initTreePullDown(treeObject.treePullDown);
//	});

function initTreePullDown() {
	var settingLeft = {
		view : {
			dblClickExpand : false
		},
		data : {
			simpleData : {
				enable : true
			}
		},
		callback : {
			onClick : onClick
		}
	};
	showOrganization(settingLeft, treeObject.treePullDown);
}

// 同步步加载组织结构
function showOrganization(setting, obj) {
	var zNodes = new Array();
	var url = treeObject.serverPath + "/organization/selectEmployeeOrgs.htm";
	var data = {
		"Time" : new Date().getMilliseconds()
	};
	$.ajaxSettings.async = false;
	$.getJSON(url, data, function(result) {
		var resultData = result.data;
		for (var i = 0; i < resultData.length; i++) {
			// 自定义属性
			var treeNote = {
				"orgType" : resultData[i].orgType
			};
			// treeNote自带属性
			treeNote.id = resultData[i].id;
			treeNote.pId = resultData[i].parentId;
			treeNote.name = resultData[i].orgName;
			treeNote.level = resultData[i].orgLevel;
			treeNote.open = false;
			zNodes.push(treeNote);
		}
	});
	$.fn.zTree.init($(obj), setting, zNodes);
}

function showMenu(orgName) {
	var cityObj = $(orgName);
	var cityOffset = $(orgName).offset();
	$("#menuContent").css({
		left : cityOffset.left + "px",
		top : cityOffset.top + cityObj.outerHeight() + "px"
	}).slideDown("fast");
	$("body").bind("mousedown", onBodyDown);
}

function hideMenu() {
	$("#menuContent").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown);
}
function onBodyDown(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(
			event.target).parents("#menuContent").length > 0)) {
		hideMenu();
	}
}