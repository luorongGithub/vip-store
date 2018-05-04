$(function(){ 

}); 

function setCheckbox() {  
    $(':checkbox[name=dataRoles]').each(function(){  
        $(this).click(function(){  
            if($(this).attr('checked')){  
                $(':checkbox[name=dataRoles]').removeAttr('checked');  
                $(this).attr('checked','checked');  
            }  
        });  
    });  
};  

function setAuditCheckbox() {  
    $(':checkbox[name=auditDataRoles]').each(function(){  
        $(this).click(function(){  
            if($(this).attr('checked')){  
                $(':checkbox[name=auditDataRoles]').removeAttr('checked');  
                $(this).attr('checked','checked');  
            }  
        });  
    });  
};
function checkInput(patrn, obj) {
	obj.value = obj.value.replace(/(^\s*)|(\s*$)/g, "");// 删除二边空格
	var objExp = new RegExp(patrn);
	if (!objExp.test(obj.value)) {
		BootstrapDialog.alert("输入格式错误,请重新输入", function() {
			setTimeout(function() {
				obj.focus();
			}, 0);
		});
	}
	return true;
}

function selectMaxPositionId() {
	var options = {
		url : serverPath + '/position/selectMaxPositionId.htm',
		type : 'post',
		dataType : 'json',
		data : {
			"Time" : new Date().getMilliseconds()
		},
		success : function(result) {
			var data = result.data;
			var param = "";
			if (data < 9) {
				param = "GW00" + (data + 1);
			} else if (data < 99) {
				param = "GW0" + (data + 1);
			} else {
				param = "GW" + (data + 1);
			}
			$('#addPositionCode').val(param);
		}
	};
	$.ajax(options);
	showMenuRole();
	showDataRole();
}

function showMenuRole(){
	$(".menuRoleLabel").remove();
	var data = {
			url : serverPath + '/role/selectRolesByType.htm',
			type : 'post',
			dataType : 'json',
			data : {
				"roleType" : 0,
				"Time" : new Date().getMilliseconds()
			},
			success : function(result) {
				var data = result.data;
				for (var i = 0; i < data.length; i++) {
					$(".menuRole").append("<label class='menuRoleLabel'><input type='checkbox' value='" + data[i].id + "' name='menuRoles'>" + data[i].roleName + "</label>");
				}
			}
		};
		$.ajax(data);
}

function showDataRole(){
	$(".dataRoleLabel").remove();
	var data = {
			url : serverPath + '/role/selectRolesByType.htm',
			type : 'post',
			dataType : 'json',
			data : {
				"roleType" : 1,
				"Time" : new Date().getMilliseconds()
			},
			success : function(result) {
				var data = result.data;
				for (var i = 0; i < data.length; i++) {
					$(".dataRole").append("<label class='dataRoleLabel'><input type='checkbox' class='dataRoles' value='" + data[i].id + "' name='dataRoles'>" + data[i].roleName + "</label>");
				}
				setCheckbox();
			}
		};
		$.ajax(data);
}

function showAuditMenuRole(positionId){
	$(".auditMenuRoleLabel").remove();
	var data = {
			url : serverPath + '/role/selectRolesByTypeAndPositionId.htm',
			type : 'post',
			dataType : 'json',
			data : {
				"roleType" : 0,
				"positionId" : positionId,
				"Time" : new Date().getMilliseconds()
			},
			success : function(result) {
				var data = result.data;
				var roles = data.roles;
				for (var i = 0; i < roles.length; i++) {
					$(".auditMenuRole").append("<label class='auditMenuRoleLabel'><input type='checkbox' class='"+ roles[i].id +"' value='" + roles[i].id + "' name='auditMenuRoles'>" + roles[i].roleName + "</label>");
				}
				//设置默认选中
				var menuRoleIds = data.menuRoleIds;
				for(var i = 0; i < menuRoleIds.length; i++){
					var id = '.'+menuRoleIds[i];
					$(id).attr("checked",'true');
				}
			}
		};
		$.ajax(data);
}

function showAuditDataRole(positionId){
	$(".auditDataRoleLabel").remove();
	var data = {
			url : serverPath + '/role/selectRolesByTypeAndPositionId.htm',
			type : 'post',
			dataType : 'json',
			data : {
				"roleType" : 1,
				"positionId" : positionId,
				"Time" : new Date().getMilliseconds()
			},
			success : function(result) {
				var data = result.data;
				var roles = data.roles;
				for (var i = 0; i < roles.length; i++) {
					$(".auditDataRole").append("<label class='auditDataRoleLabel'><input type='checkbox' class='auditDataRoles " + roles[i].id + "' value='" + roles[i].id + "' name='auditDataRoles'>" + roles[i].roleName + "</label>");
				}
				setAuditCheckbox();
				//设置默认选中
				var dataRoleIds = data.dataRoleIds;
				for(var i = 0; i < dataRoleIds.length; i++){
					var id = '.'+dataRoleIds[i];
					$(id).attr("checked",'true');
				}
			}
		};
		$.ajax(data);
}

function addPosition() {
	// 岗位名称不可为空
	var positionName = $('#addPositionName').val()
			.replace(/(^\s*)|(\s*$)/g, "");// 删除二边空格
	if (positionName == "") {
		BootstrapDialog.alert("岗位名不可为空");
		return false;
	}
	
	var dataRoleIds = [];
	$("input[name='dataRoles']:checked").each(function(index,dom){
		var value = $(dom).val();
		dataRoleIds.push(value);
	});
	
	var menuRoleIds = [];
	$("input[name='menuRoles']:checked").each(function(index,dom){
		var value = $(dom).val();
		menuRoleIds.push(value);
	});	
	var data = {
			"positionCode" : $("#addPositionCode").val(),
			"positionName" : $("#addPositionName").val(),
			"isManage" : $("#addIsManage").val(),
			"dataRoleIds" : dataRoleIds,
			"menuRoleIds" : menuRoleIds
		};
	// 岗位名称进行校验，不可与数据库中重复
	var options = {
		url : serverPath + '/position/addPosition.htm',
		type : 'post',
		dataType : 'json',
		contentType : "application/json",
		data : JSON.stringify(data),
		success : function(result) {
			var data = result.data;
			if (data > 0) {
				BootstrapDialog.alert("岗位名已存在");
				return false;
			}
			$('#addPosition').modal('hide');
			BootstrapDialog.alert('新增岗位成功', function(result) {
				window.location.reload();
			});
		}
	};
	$.ajax(options);
}

function returnBack() {
	window.location.href = window.location;
}

function updatePosition() {
	// 岗位名称不可为空
	var positionName = $('#updatePositionName').val().replace(/(^\s*)|(\s*$)/g,
			"");// 删除二边空格
	if (positionName == "") {
		BootstrapDialog.alert("岗位名不可为空");
		return false;
	}
	var dataRoleIds = [];
	$("input[name='auditDataRoles']:checked").each(function(index,dom){
		var value = $(dom).val();
		dataRoleIds.push(value);
	});
	
	var menuRoleIds = [];
	$("input[name='auditMenuRoles']:checked").each(function(index,dom){
		var value = $(dom).val();
		menuRoleIds.push(value);
	});	
	
	var data = {
			"positionCode" : $("#updatePositionCode").val(),
			"positionName" : $("#updatePositionName").val(),
			"isManage" : $("#updateIsManage").val(),
			"id" : $("#updatePositionId").val(),
			"dataRoleIds" : dataRoleIds,
			"menuRoleIds" : menuRoleIds
		};
	
	// 岗位名称进行校验，不可与数据库中重复
	var options = {
		url : serverPath + '/position/updatePosition.htm',
		type : 'post',
		dataType : 'json',
		contentType : "application/json",
		data : JSON.stringify(data),
		success : function(result) {
			var data = result.data;
			if (data > 0) {
				BootstrapDialog.alert("岗位名已存在");
				return false;
			}
			$('#updatePosition').modal('hide');
			BootstrapDialog.alert('修改岗位成功', function(result) {
				window.location.reload();
			});
		}
	};
	$.ajax(options);
}

function update(id) {
	$("#updatePositionId").val(id);
	var selectId = "#" + id + " td";
	$("#updatePositionName").val($(selectId).eq(0).text());
	$("#updatePositionCode").val($(selectId).eq(1).text());
	if($(selectId).eq(2).text() == "是"){
		$("#updateIsManage").val(1);
	}else{
		$("#updateIsManage").val(0);
	}
	showAuditMenuRole(id);
	showAuditDataRole(id);
}

function del(id) {
	var options = {
		url : serverPath + '/position/check.htm',
		type : 'post',
		dataType : 'json',
		data : {
			"id" : id
		},
		success : function(result) {
			var data = result.data;
			if (data == 1) {
				BootstrapDialog.alert("岗位已绑定组织，请先解除绑定再删除");
				return false;
			}
			if (data == 2) {
				BootstrapDialog.alert("岗位已绑定角色，请先解除绑定再删除");
				return false;
			}
			if (data == 0) {
				BootstrapDialog.confirm('确定删除？',function(result) {
					if (result) {
						var options = {
							url : serverPath+ '/position/delPosition.htm',
							type : 'post',
							dataType : 'json',
							data : {
								"id" : id
							},
							success : function(result) {
								BootstrapDialog.alert('删除成功', function(result) {
									window.location.reload();
								});
							}
						};
						$.ajax(options);
					}
				});
			}
		}
	};
	$.ajax(options);
}
