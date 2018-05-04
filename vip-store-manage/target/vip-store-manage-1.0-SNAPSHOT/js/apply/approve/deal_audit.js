$(function() {
	$("*[name='disEdit'] input").attr("disabled", true);
	$("*[name='disEdit'] textarea").attr("disabled", true);
	initProductData();
	initloanPeriodsData();
	initRefuseReasonData();
	initloanPeriodsData();
	initRefuseReason();
	var proType = "option:contains('"+$('#prodName').val()+ "')";
	$("select[name='proType']").find(proType).attr("selected",true);
    initloanPeriodsData(true);
    var proId = "option:contains('"+$('#loanPeriods').val()+ "')";
    $("select[name='proId']").find(proId).attr("selected",true);
    $("#creditMoney1").val($('#creditMoney').val());	
	var form = $("#form_submit");
	form.validate({
		onfocusout:false,
		rules : {
			// account
			loanPeriods : {
				required : true,
				loanPeriods : true
			},
			auditState : {
				required : true
			},
			applyMoney : {
				required : true
			},
			creditMoney : {
				required : true,
				isFloat:true,
				maxlength:10
			},
			externalRemark : {
				required : true,
				maxlength:300
			},
			mainCauseNo : {
				required : true,
				mainCauseNo : true
			},
			secondCauseNo : {
				required : true,
				secondCauseNo : true
			},
			auditState:{	
				required : true,
				approveResult:true
			},
			proType:{	
				required : true,
				productType:true
			},
			proId:{
				loanPeriods : true
			}
		},

		messages : { // custom messages for radio buttons and checkboxes
		}
	});
});
var returnURL = serverPath + "/audit/list/manageTodo.htm";
function secondaryInit(this_, id) {
	var select_ = $("#" + id);
	if ($(this_).val() == 0) {
		select_.find("option:gt(0)").remove();
		return;
	}
	$.ajax({
		url : serverPath + "/node/selectNodeList.htm",
		type : "post",
		data : {
			"parentCode" : $(this_).val()
		},
		dataType : "json",
		success : function(result) {
			if (result.code == 0) {
				select_.find("option:gt(0)").remove();
				for (var i = 0; i < result.data.length; i++) {
					select_.append("<option value='" + result.data[i].nodeCode
							+ "'>" + result.data[i].nodeName + "</option>");
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
function initRefuseReason() {
	var select_ = $("select[name='mainCauseNo']");
	$.ajax({
		url : serverPath + "/refuseReason/selectAll.htm",
		type : "post",
		data : {
		},
		dataType : "json",
		success : function(result) {
			if (result.code == 0) {
				select_.find("option:gt(0)").remove();
				for (var i = 0; i < result.data.length; i++) {
					select_.append("<option data='"+result.data[i].confinementTime+"' value='" + result.data[i].refuseCode
							+ "'>" + result.data[i].refuseDesc + "</option>");
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
function changeRefuseReason(this_){
	var value = $(this_).val();
	$("#reasonCode").html(value);
}
function reasonInit(this_) {
	if ($(this_).val() == 2262 ||$(this_).val() == 2372) {
		$("*[name='reason']").show();
		$("*[name='applyInfo']").hide();
	} else {
		$("*[name='reason']").hide();
		$("*[name='applyInfo']").show();
	}
	if ($(this_).val() == "0") {
		$("*[name='reason']").hide();
		$("*[name='applyInfo']").hide();
	}
}
function initProductData() {
	$.ajax({
		url : serverPath + "/product/showProductForAudit.htm",
		type : "post",
		async : false,
		data : {
			"applyLoanNo" : $('#applyLoanNo').val(),
			"Time" : new Date().getMilliseconds()
		},
		dataType : "json",
		success : function(result) {
			if (result.code == 0) {
				// 清空除第一条内容的外的其它数据
				var select_ = $("select[name='proType']");
				select_.find("option:gt(0)").remove();
				for (var i = 0; i < result.data.length; i++) {
					var isSelected = result.data[i].id == select_
							.attr('data-id') ? "selected='selected'" : "";
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

function initloanPeriodsData(change) {
	var parent = $("select[name='proType']");
	var id = parent.attr("data-id");
	var parentValue = parent.val();
	if (parentValue == 0 && !change) {
		parentValue = id;
	}
	if (parentValue == ""||null == parentValue || parentValue == 0) {
		var select_ = $("select[name='proId']");
		select_.find("option:gt(0)").remove();
		return;
	}
	$.ajax({
		url : serverPath + "/product/selectByProductType.htm",
		type : "post",
		async : false,
		data : {
			"proType" : parentValue,
			"Time" : new Date().getMilliseconds()
		},
		dataType : "json",
		success : function(result) {
			if (result.code == 0) {
				// 清空除第一条内容的外的其它数据
				var select_ = $("select[name='proId']");
				select_.find("option:gt(0)").remove();
				for (var i = 0; i < result.data.length; i++) {
					var isSelected = result.data[i].id == select_
							.attr('data-id') ? "selected='selected'" : "";
					select_.append("<option " + isSelected + " data='"
							+ result.data[i].periods + "' value='"
							+ result.data[i].id + "'>" + result.data[i].periods
							+ "期</option>");
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

function initRefuseReasonData() {
	$.ajax({
		url : serverPath + "/node/selectNodeList.htm",
		type : "post",
		data : {
			"parentCode" : "RollBackReason",
			"Time" : new Date().getMilliseconds()
		},
		dataType : "json",
		success : function(result) {
			if (result.code == 0) {
				// 清空除第一条内容的外的其它数据
				var select_ = $("#backReason");
				select_.find("option:gt(0)").remove();
				for (var i = 0; i < result.data.length; i++) {
					var isSelected = result.data[i].nodeCode == select_
							.attr('data-id') ? "selected='selected'" : "";
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
function rollBack(applyLoanNo) {
	var backReason = $("#backReason").val();
	if (backReason == 0) {
		BootstrapDialog.alert("请选择原因");
		return;
	}
	var remark = $("#interiorRemark").val();
	if("" == remark){
		BootstrapDialog.alert("请备注详细原因");
		return;
	}
	var value = $("#rollBack textarea").val();
	$.ajax({
		url : serverPath + "/dealApply/rollBack.htm",
		type : "post",
		data : {
			"backReasonId" : backReason,
			"applyLoanNo" : applyLoanNo,
			"backReasonDesc" : $("#backReason option:selected").text(),
			"interiorRemark" :$("#interiorRemark").val(),
			"Time" : new Date().getMilliseconds()
		},
		dataType : "json",
		success : function(result) {
			if (result.code == 0) {
				window.location.href = returnURL;
			} else {
				BootstrapDialog.alert(result.message);
			}
		},
		error : function() {
			BootstrapDialog.alert("操作失败");
		}
	});
}
function submit(applyLoanNo) {
	if (!$("#form_submit").valid()) {
		return;
	}
	var paramStr = $("#form_submit").serialize();
	var loanPeriods = $("*[name='proId'] option:selected").attr("data");
	var productName = $("*[name='proType'] option:selected").text().trim();
	var confinementTime = $("*[name='mainCauseNo'] option:selected").attr("data");
	if(!(typeof(loanPeriods) =="undefined")){
		paramStr += "&loanPeriods=" + loanPeriods;
	} 
	if(!(typeof(productName) =="undefined")){
		paramStr += "&productName=" + productName;
	}
	if(!(typeof(confinementTime) =="undefined")){
		paramStr += "&confinementTime="+confinementTime;
	}
	$.ajax({
		url : serverPath + "/dealApply/submitTaskInfo.htm",
		type : "post",
		data : paramStr,
		dataType : "json",
		success : function(result) {
			if (result.code == 0) {
				BootstrapDialog.alert("提交成功",function(){
					window.location.href = returnURL;
				});
			} else {
				BootstrapDialog.alert(result.message);
			}
		},
		error : function() {
			BootstrapDialog.alert("操作失败");
		}
	});
}