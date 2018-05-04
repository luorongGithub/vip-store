$(function() {
	$('#addInfoNames').select2();

	$('#addDataDetailRelation').on('hide.bs.modal', function () {
		$('#addInfoNames').select2("close");
		  $("#error").html('');
		})
		
	$('#updateInfoNames').select2();
	
	$('#updateDataDetailRelation').on('hide.bs.modal', function () {
		  $('#updateInfoNames').select2("close");
		  $("#errorUpdate").html('');
		})
	$('#updateDataDetailRelation').on('shown.bs.modal', function () {
		  $("#errorUpdate").html('');
		})	
	$('#addDataDetailRelation').on('shown.bs.modal', function () {
		  $("#error").html('');
		})			
});

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

function add(){
	var data = new Array();
	$.ajax({
		url : serverPath + "/dataDetailRelation/queryDataDetails.htm",
		type : "post",
		data : {
			"Time" : new Date().getMilliseconds()
		},
		dataType : "json",
		success : function(result) {
			$("#addInfoNames").empty();
			var datas = result.data;
			for(var i=0;i<datas.length;i++){
				$("#addInfoNames").append("<option value='"+datas[i].code+"'>"+datas[i].name+"</option>");
			}
			$("#addInfoNames").val(data).trigger('change');
			$("#addInfoNames").change();//告诉select2代码已经更新，需要重载
		},
		error : function() {
			BootstrapDialog.alert("操作失败");
		}
	});	
}


function addDataDetailRelation(){
	$("#error").html('');
	var infoNames = "";
	var infoNamelist=$("#addInfoNames").select2("data");
	console.log(infoNamelist);
	for (var i = 0; i < infoNamelist.length; i++) {
		
		if(infoNames == ""){
			infoNames = infoNamelist[i].id;
		}else{
			infoNames = infoNames + "|" + infoNamelist[i].id;
		}
	}
	if($("#addPageName").val() == '' || $("#addPageCode").val() == '' || infoNames == ''){
		$("#error").html('<font color="red">请输入必选项</font>');
		$("#error").css("display", "block");
		return false;
	}
	$.ajax({
		url : serverPath + "/dataDetailRelation/addDataDetailRelation.htm",
		type : "post",
		data : {
			pageName:$("#addPageName").val(),
			pageCode:$("#addPageCode").val(),
			infoCode:infoNames,
			"Time" : new Date().getMilliseconds()
		},
		dataType : "json",
		success : function(result) {
			addDataDetailResult = result.data;
			if(addDataDetailResult == 0){
				window.location.href = window.location;
				return true;
			}
			if(addDataDetailResult == 1){
				$("#error").html('<font color="red">大资料项名称重复</font>');
				$("#error").css("display", "block");
				return false;
			}
			if(addDataDetailResult == 2){
				$("#error").html('<font color="red">大资料项编码重复</font>');
				$("#error").css("display", "block");
				return false;
			}
			if(addDataDetailResult == 3){
				$("#error").html('<font color="red">大资料项名称和编码重复</font>');
				$("#error").css("display", "block");
				return false;
			}
		},
		error : function() {
			BootstrapDialog.alert("操作失败");
		}
	});
}

function update(id){
	var pageNameId = "#" + id + 'pageName';
	var infoNameId = "#" + id + 'infoName';
	$("#updatePageName").val($(pageNameId).html());
	$("#id").val(id);
	//获取已选中的产品
	$.ajax({
		url : serverPath + "/dataDetailRelation/selectDataDetailByPageId.htm",
		async:false, 
		type : "post",
		data : {
			"id" : id,
			"Time" : new Date().getMilliseconds()
		},
		dataType : "json",
		success : function(result) {
			var data = new Array();
			var datas = result.data;
			$("#updateInfoNames").empty();
			for(var i=0;i<datas.length;i++){
				$("#updateInfoNames").append("<option value='"+datas[i].code+"'>"+datas[i].name+"</option>");
				data.push(datas[i].code);	
			}
			$("#updateInfoNames").val(data).trigger('change');
			$("#updateInfoNames").change();//告诉select2代码已经更新，需要重载
		},
		error : function() {
			BootstrapDialog.alert("操作失败");
		}
	});
	
	$.ajax({
		url : serverPath + "/dataDetailRelation/queryDataDetails.htm",
		async:false, 
		type : "post",
		data : {
			"parentCode" : "proType",
			"Time" : new Date().getMilliseconds()
		},
		dataType : "json",
		success : function(result) {
			var datas = result.data;
			for(var i=0;i<datas.length;i++){
				$("#updateInfoNames").append("<option value='"+datas[i].code+"'>"+datas[i].name+"</option>");
			}
			$("#updateInfoNames").change();//告诉select2代码已经更新，需要重载
		},
		error : function() {
			BootstrapDialog.alert("操作失败");
		}
	});	
	
}

function updateDataDetailRelation(){
	$("#errorUpdate").html('');
	var updateDataDetailReceptionResult = '';
	var infoCodes = "";
	var infoCodeslist=$("#updateInfoNames").select2("data");
	console.log(infoCodeslist);
	for (var i = 0; i < infoCodeslist.length; i++) {
		
		if(infoCodes == ""){
			infoCodes = infoCodeslist[i].id;
		}else{
			infoCodes = infoCodes + "|" + infoCodeslist[i].id;
		}
	}
	if($("#updatePageName").val() == ''){
		$("#errorUpdate").html('<font color="red">请输入必选项</font>');
		$("#errorUpdate").css("display", "block");
		return false;
	}
	$.ajax({
		url : serverPath + "/dataDetailRelation/updateDataDetailRelation.htm",
		type : "post",
		data : {
			"Time" : new Date().getMilliseconds(),
			"id" : $("#id").val(),
			"pageName" : $("#updatePageName").val(),
			"pageCode" : $("#updatePageCode").val(),
			"infoCode" : infoCodes
		},
		dataType : "json",
		success : function(result) {
			updateDataDetailReceptionResult = result.data;
			if(updateDataDetailReceptionResult != 0){
				$("#errorUpdate").html('<font color="red">大资料项名称重复</font>');
				$("#errorUpdate").css("display", "block");
				return false;
			}else{
				window.location.href = window.location;
			}
		},
		error : function() {
			BootstrapDialog.alert("操作失败");
		}
	});
}