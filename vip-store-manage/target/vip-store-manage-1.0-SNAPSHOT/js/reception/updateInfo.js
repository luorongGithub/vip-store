var FormSamples = function () {
		var bmurl = serverPath+"/employee/showBMEmpoyee.htm";
		var custmerurl = serverPath+"/employee/showCustomerEmpoyee.htm";
	    return {   
	        init: function () {
//	            $("#cusomerServiceId").select2({
//	                placeholder: "请选择",
//	                allowClear: true,
//	                minimumInputLength: 1,
//	                query: function (query) {
//	                	$.getJSON(bmurl, {"nameSpell" : query.term}, function(result) {
//		            		var data = {
//		                        results: result.data
//		                    };
//		            		query.callback(data);
//						});
//	                }
//	            });  
	            $("#bmId").select2({
	                placeholder: ChkUtil.select2Name,
	                allowClear: true,
	                minimumInputLength: 1,
	                query: function (query) {
	                	$.getJSON(bmurl, {"nameSpell" : query.term}, function(result) {
	                		var data = {
	                            results: result.data
	                        };
	                		query.callback(data);
	        			});
	                }
	            });  
	            
	        }
	    };

	}();
FormSamples.initReception = function () {
	$("#s2id_bmId .select2-choice span").html($("#bmName").val());
	$("#tab select[name='infoChannel']").val($("#tab select[name='infoChannel']").data("value"));
	if(!ChkUtil.isNull($("#prodType2").val())) {
		getProductNum($("#prodType2").val());
	}
	if(!ChkUtil.isNull($("#affordMonthRepay").val())) {
		var affordMonthRepay = $("#affordMonthRepay").val().split("-");
		$("#affordMonthRepay1").val(affordMonthRepay[0]);
		if(affordMonthRepay.length == 2) {
			$("#affordMonthRepay2").val(affordMonthRepay[1]);
		}
	}
//	if(!ChkUtil.isNull($("#expectLoanAmount").val())) {
//		var expectLoanAmount = $("#expectLoanAmount").val().split("-");
//		$("#expectLoanAmount1").val(expectLoanAmount[0]);
//		if(expectLoanAmount.length == 2) {
//			$("#expectLoanAmount2").val(expectLoanAmount[1]);
//		}
//	}
}
$(function() {
	getProdType("#prodType");
	FormSamples.init();
	getNode("#tab select[name='loanUse']","loanUse");
	FormSamples.initReception();
	$("form").validate({
		rules : {
			memberName : {
				required : true,
				maxlength : 6
			},
			idCard : {
				required : true
				,idCard : true
			},
			phone : {
				required : true
				,phone : true
			},
			bmId : {
				required : true
				,bmId : true
			},
			memberType : {
				required : true,
				memberType : true
			},
			infoChannel : {
				required : true,
				infoChannel : true
			},
			loanUse : {
				required : true,
				loanUse : true
			},
			prodType : {
				required : true
			},
			productId : {
				required : true
			},
			affordMonthRepay1 : {
				required : true
			},
			affordMonthRepay2 : {
				required : true
			},
			applyMoney : {
				required : true
			},
//			expectLoanAmount1 : {
//				required : true
//			},
//			expectLoanAmount2 : {
//				required : true
//			},
			state : {
				required : true
			}
		},
		submitHandler : function(form) { // 表单提交句柄,为一回调函数，带一个参数：form
			var url = serverPath+"/reception/validateCardToResult.htm";
			var data = {
				"idCard" : $("#idCard").val(),
			};
			if($("#state").val() == '2') {
				addInfo();
			} else if ($("#state").val() == '1') {
				$.getJSON(url, data, function(result) {
					if(result.code == '0') {
						addInfo();
					} 
					else {
						$("#submitType").val(1);
						$("#state").val("");
						BootstrapDialog.alert(result.message);
					}
				});
			}
		}
	});
});

function addInfo(saveOfsubmit) {
	$('.selectApp').removeAttr("disabled");
	if(typeof(saveOfsubmit) != "undefined"){
		$("#submitType").val(saveOfsubmit);
	}
	if(!ChkUtil.isNull($("#affordMonthRepay1").val()) 
			&& !ChkUtil.isNull($("#affordMonthRepay2").val())) {
		$("#affordMonthRepay").val($("#affordMonthRepay1").val()+"-"
				+$("#affordMonthRepay2").val());
	}
//	if(!ChkUtil.isNull($("#expectLoanAmount1").val()) 
//			&& !ChkUtil.isNull($("#expectLoanAmount2").val())) {
//		$("#expectLoanAmount").val($("#expectLoanAmount1").val()+"-"
//				+$("#expectLoanAmount2").val());
//	}
	if(ChkUtil.isNull($("#idCard").val())) {
		alert("请输入身份证!");
		return false;
	}
	if($("#s2id_bmId .select2-choice span").html() != ChkUtil.select2Name) {
		$("#bmName").val($("#s2id_bmId .select2-choice span").html());
	}
	if(!ChkUtil.isNull($("#productId").val())) {
		$("#loanPeriods").val($("#productId").find("option:selected").text());
	}
	var msg = "保存信息成功";
	if($("#submitType").val() == 2) {
		msg = "提交信息成功";
	}
	$('.form-actions .blue').attr('disabled',"true");
	$.post(serverPath+'/reception/updateInfo.htm', $('form').serialize(), function(res) {
		$('.form-actions .blue').removeAttr("disabled");
		if (res.code == '0') {
			BootstrapDialog.alert(msg, function(){
				window.location.href = serverPath + "/reception/list.htm";
            });
		} else {
			BootstrapDialog.alert(res.message);
		}
	}, "json");
	return false;
}
function save(event, e) {
	$('.selectApp').removeAttr("disabled");
	// 阻止冒泡
	ChkUtil.stopBubbleEvent(event);
	$("#submitType").val($(e).data("type"));
	if($("#s2id_bmId .select2-choice span").html() == "请选择") {
		alert("请根据员工姓名首字母选择业务经理!");
		return false;
	}
	$("#tab").submit();
}

/**
 * 
 * @param xmlId 目标节点
 * @param parentCode 父id
 */
function getNode(xmlId,parentCode) {
	var url = serverPath+"/reception/showProduct.htm";
	var data = {
		"parentCode" : parentCode,
		"Time" : new Date().getMilliseconds()
	};
	$.getJSON(url, data, function(result) {
		$(xmlId).empty();
		var resultData = result.data;
		$(xmlId).append("<option value=''>请选择</option>");
		for (var i = 0; i < resultData.length; i++) {
			if($(xmlId).data("value") == resultData[i].id) {
				$(xmlId).append(
						"<option selected value='" + resultData[i].id + "'>"
								+ resultData[i].nodeName + "</option>");
			} else {
			$(xmlId).append(
					"<option value='" + resultData[i].id + "'>"
							+ resultData[i].nodeName + "</option>");
			}
		}
	});
}

/**
 *
 * @param xmlId 目标节点
 */
function getProdType(xmlId) {
	var url = serverPath+"/product/showProductForReception.htm";
	var data = {
		"Time" : new Date().getMilliseconds()
	};
	$.getJSON(url, data, function(result) {
		$(xmlId).empty();
		var resultData = result.data;
		$(xmlId).append("<option value=''>请选择</option>");
		for (var i = 0; i < resultData.length; i++) {
			if($(xmlId).data("value") == resultData[i].id) {
				$(xmlId).append(
					"<option selected value='" + resultData[i].id + "'>"
					+ resultData[i].nodeName + "</option>");
			} else {
				$(xmlId).append(
					"<option value='" + resultData[i].id + "'>"
					+ resultData[i].nodeName + "</option>");
			}
		}
	});
}

function getProduct(e) {
	var prod = $(e).val();
	$("#productId").empty();
	if(ChkUtil.isNull(prod)) {
		$("#productId").append("<option value=''>请选择</option>");
		return false;
	}
	var url = serverPath+"/reception/showProductNum.htm";
	var data = {
		"productType" : prod,
		"Time" : new Date().getMilliseconds()
	};
	$.getJSON(url, data, function(result) {
		var resultData = result.data;
		$("#productId").append("<option value=''>请选择</option>");
		for (var i = 0; i < resultData.length; i++) {
			$("#productId").append(
					"<option value='" + resultData[i].id + "'>"
							+ resultData[i].periods + "</option>");
		}
	});
}

function getProductNum(prod) {
	var url = serverPath+"/reception/showProductNum.htm";
	var data = {
		"productType" : prod,
		"Time" : new Date().getMilliseconds()
	};
	$.getJSON(url, data, function(result) {
		var resultData = result.data;
//		$("#productId").append("<option value=''>请选择</option>");
		for (var i = 0; i < resultData.length; i++) {
			$("#productId").append(
					"<option value='" + resultData[i].id + "'>"
							+ resultData[i].periods + "</option>");
		}
		$("#productId").val($("#productId2").val());
	});
}
