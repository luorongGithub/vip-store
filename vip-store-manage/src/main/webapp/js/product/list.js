$(function(){
	initProductData();
});
function deleteInfo(id) {
	BootstrapDialog.confirm("确定要删除吗？", function(isOk) {
		if (isOk) {
			$.ajax({
				url : serverPath + "/product/deleteInfo.htm",
				type : "post",
				data : {
					"id" : id,
					"Time" : new Date().getMilliseconds()
				},
				dataType : "json",
				success : function(result) {
					if (result.code == 0) {
						BootstrapDialog.alert("删除成功", function() {
							window.location.href = serverPath
									+ "/product/queryPageList.htm"
						});
					} else {
						BootstrapDialog.alert(result.message, function() {
							window.location.href = serverPath
									+ "/product/queryPageList.htm"
						});
					}
				},
				error : function() {
					BootstrapDialog.alert("操作失败");
				}
			});
		}
	});
}
function initProductData() {
	$.ajax({
		url : serverPath + "/node/selectNodeList.htm",
		type : "post",
		data : {
			"parentCode" : "proType",
			"Time" : new Date().getMilliseconds()
		},
		dataType : "json",
		success : function(result) {
			if (result.code == 0) {
				// 清空除第一条内容的外的其它数据
				var select_ = $("select[name='productType']");
				select_.find("option:gt(0)").remove();
				for (var i = 0; i < result.data.length; i++) {
					var isSelected = result.data[i].id == select_
							.attr('data-value') ? "selected='selected'" : "";
					select_.append("<option " + isSelected + " value='"
							+ result.data[i].id + "'>"
							+ result.data[i].nodeName + "</option>");
				}
			} else {
				BootstrapDialog.alert(result.message);
			}
		},
		error : function() {
			BootstrapDialog.alert("操作失败");
		}
	});
}