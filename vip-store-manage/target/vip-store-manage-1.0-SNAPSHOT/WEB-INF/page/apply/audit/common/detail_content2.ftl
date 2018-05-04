<script src="${cdnPath}/js/apply/detail/detail_back.js?v=${VERSION_NO}"></script>
<div class="row-fluid">
	<div class="portlet box">
		<div class="portlet-body form">
			<div>
						<h4 style="text-align:center">
							<strong>申请信息</strong>
						</h4>
			</div>
			<hr>
			<!-- edit form -->
			<form id="tab" action="#" method="POST"
				class="form-horizontal">
				<div class="row-fluid">
					<div class="control-group span4 ">
						<label class="control-label">贷款类别<span class="required">*</span></label>
						<div class="controls">
							<input type="text" name="" value="信用贷款" class="m-wrap span9" />
						</div>
					</div>
					<div class="control-group span4 ">
						<label class="control-label">门店</label>
						<div class="controls">
							<input type="text" name="storeId" value="${reception.storeName!}" class="m-wrap span9" />
						</div>
					</div>
					<div class="control-group span4 ">
						<label class="control-label">大区</label>
						<div class="controls">
							<input type="text" name="areaId" value="${reception.areaName!}" class="m-wrap span9" />
						</div>
					</div>
				</div>
				<div class="row-fluid">
					<div class="control-group span4 ">
						<label class="control-label">产品类型<span class="required">*</span></label>
						<div class="controls">
							<input type="text" name="prodType" id="prodType" value="${reception.productId!}"
							data-value="${reception.productId!}" class="m-wrap span9" />
						</div>
					</div>
					<div class="control-group span4 ">
						<label class="control-label">贷款期数</label>
						<div class="controls">
							<input type="text" name="loanPeriods" value="${reception.loanPeriods!}" class="m-wrap span9" />
						</div>
					</div>
					<div class="control-group span4 ">
						<label class="control-label">申请金额</label>
						<div class="controls">
							<input type="text" name="applyMoney" value="${reception.applyMoney!}" class="m-wrap span9" />
						</div>
					</div>
				</div>
				<div class="row-fluid">
					<div class="control-group span4 ">
						<label class="control-label">申请单编号<span class="required">*</span></label>
						<div class="controls">
							<input type="text" name="applyLoanNo" id="applyLoanNo" value="${reception.applyLoanNo!}" class="m-wrap span9" />
						</div>
					</div>
					<div class="control-group span4 ">
						<label class="control-label">借款用途</label>
						<div class="controls">
							<input type="text" name="loanUse" value="${reception.loanUse!}" 
							id="loanUse" data-value="${reception.loanUse!}" class="m-wrap span9" />
						</div>
					</div>
					<div class="control-group span4 ">
						<label class="control-label">申请时间</label>
						<div class="controls">
							<input type="text" name="createTime" value="${(reception.createTime?string("yyyy-MM-dd"))!}" class="m-wrap span9" />
						</div>
					</div>
				</div>
				
				<div class="row-fluid">
					<div class="control-group">
						<label class="control-label">贷款详细用途</label>
						<div class="controls">
							<textarea class="span9 m-wrap" rows="3" name="loanPurpose" maxlength="300">${reception.loanPurpose!}</textarea>
							 &nbsp;&nbsp;<input type="button" class="btn yellow" onclick="javascript:queryFileFormAudit();" value="查看附件" />
						</div>
					</div>
				</div>
				<div class="row-fluid">
					<div class="control-group ">
						<label class="control-label">接待意见描述</label>
						<div class="controls">
							<textarea class="span9 m-wrap" rows="3" name="description" maxlength="300">${reception.description!}</textarea>
                            &nbsp;&nbsp;<a href="#applyDetailList" id="hostoy_btn" class="btn btn-info btn-lg" data-toggle="modal" style="display: none;">历史案件</a>
						</div>
					</div>
				</div>
				<script>
									var applyLoanNo = "${userinfo.applyLoanNo!}";
									<#list constant as constantItem>
										var ${constantItem} = ${constantItem.getCode()};
									</#list>

									function showCitys2(inputId,contextPath){
										 $(inputId+"Addr").jcity({
									       urlOrData: contextPath + "/js/citydata.json",
									       animate: { showClass: 'animated flipInX', hideClass: 'animated flipOutX' },  // 需要第一步引用的animate.min.css文件，也可以自己定义动画 
									       onChoice: function (data) {
									    	   $(inputId+"Provcode").val(data.provinceCode);
									    	   $(inputId+"Citycode").val(data.cityCode);
									    	   $(inputId+"Towncode").val(data.areaCode);
									       }
									   });
									}
						$(function(){
										showCitys2("#census","${serverPath}");
										showCitys2("#live","${serverPath}");
							$("select[name='sex']").val(${(userinfo.sex)!});
							$("select[name='eduCode']").val(${(userinfo.eduCode)!});
							$("select[name='mailAddress']").val(${(userinfo.mailAddress)!});
							$("select[name='liveProperty']").val(${(userinfo.liveProperty)!});
							$("select[name='qualifiType']").val(${(userinfo.qualifiType)!});
							$("select[name='maritalStatus']").val(${(userinfo.maritalStatus)!});
							$("select[name='haveChild']").val(${(userinfo.haveChild)!});
										$("#tab_userinfo").validate({
											rules : {
												memberName : {
													required : true,
													maxlength : 10
												},
												idCarNo : {
													required : true
													,idCard : true
												},
												phone : {
													required : true
													,phone : true
												},
												nameSpell : {
													required : true
												},
												sex : {
													required : true
												},
												eduCode : {
													required : true
												},
												idCarNo : {
													required : true
												},
												nation : {
													required : true
												},
												phone : {
													required : true
												},
												liveAddress : {
													required : true
												},
												liveAddr : {
													required : true
													,changeCity : true
												},
												censusAddr : {
													required : true
													,changeCity : true
												},
												censusAddress : {
													required : true
												},
												mailAddress : {
													required : true
												},
												liveProperty : {
													required : true
												},
												qualifiType : {
													required : true
												},
												maritalStatus : {
													required : true
												},
												haveChild : {
													required : true
												},
												haveLoan : {
													required : true,
													min:0,
													max:100000000,
												},
												liveYears : {
													required : true,
													min:0.1,
													max:100,
													maxlength:3
												}
											},
											submitHandler : function(form) { // 表单提交句柄,为一回调函数，带一个参数：form
												saveUserInfo(); //提交表单
											}
						});
									});
									function userinfo_updateInfo(e) {
										var userinfo_form = $("#tab_userinfo");
										if (!userinfo_form.valid()) {
											return true;
										}
										$.post(serverPath+'/apply/member/updateInfoBack.htm', userinfo_form.serialize(), function(res) {
											if (res.code == '0') {
												BootstrapDialog.alert("操作成功", function() {
													setTimeout(function() {
														editClose(e);
													}, 0);
												});
											} else {
												BootstrapDialog.alert(res.message);
											}
										}, "json");
										return false;
									}
					</script>
				</form>
				<hr>
				<div>
					<h4 style="text-align:center" data-ftl="tab_userinfo">
						<strong>客户信息</strong>
									<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
									<a href="javascript:void(0)" id="ceshi" class="glyphicons no-js pencil"><i></i></a>
									<a href="javascript:void(0)" data-savetype="KHXX" class="glyphicons no-js inbox"><i></i></a>
									<a href="javascript:void(0)" class="glyphicons no-js unshare"><i></i></a>
					</h4>
				</div>
				<hr>
				<!-- 客户信息 form begin -->
				<form id="tab_userinfo" action="#" method="POST"
					class="form-horizontal">
					<input type="hidden" name="applyLoanNo" value="${(userinfo.applyLoanNo)!''}" />
					<input type="hidden" id='userinfo_ftl' name="userinfo_ftl" value="0" />
					<div class="row-fluid">
						<div class="control-group span4 ">
							<label class="control-label">客户姓名<span class="required">*</span></label>
							<div class="controls">
								<input type="text" name="memberName" value="${(userinfo.memberName)!''}" readonly class="m-wrap span9" maxlength="20"/>
							</div>
						</div>
						<div class="control-group span4 ">
							<label class="control-label">姓名拼音<span class="required">*</span></label>
							<div class="controls">
								<input type="text" name="nameSpell" value="${(userinfo.nameSpell)!''}" readonly class="m-wrap span9" maxlength="20"/>
							</div>
						</div>
						<div class="control-group span4 ">
							<label class="control-label">身份证号<span class="required">*</span></label>
							<div class="controls">
								<input type="text" name="idCarNo" value="${(userinfo.idCarNo)!''}" readonly id="idCarNo" class="m-wrap span9" maxlength="18"/>
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="control-group span4 ">
							<label class="control-label">性别<span class="required">*</span></label>
							<div class="controls">
								<select name="sex" class="m-wrap span9">
									<option value="0">男</option>
									<option value="1">女</option>
								</select>
							</div>
						</div>
						<div class="control-group span4 ">
							<label class="control-label">学历<span class="required">*</span></label>
							<div class="controls">
								<select name="eduCode" class="m-wrap span9">
									<option value="1">初中及以下</option>
									<option value="2">高中</option>
									<option value="3">中技</option>
									<option value="4">中专</option>
									<option value="5">大专</option>
									<option value="6">本科</option>
									<option value="7">硕士</option>
									<option value="8">博士</option>
								</select>
							</div>
						</div>
						<div class="control-group span4 ">
							<label class="control-label">民族<span class="required">*</span></label>
							<div class="controls">
								<input type="text" name="nation" 
								id="nation" value="${(userinfo.nation)!}" class="m-wrap span9" maxlength="20"/>
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="control-group span4 ">
							<label class="control-label">手机号码<span class="required">*</span></label>
							<div class="controls">
								<input type="text" name="phone" value="${(userinfo.phone)!''}" class="m-wrap span9" maxlength="20"/>
							</div>
						</div>
						<div class="control-group span4 ">
							<label class="control-label">QQ/微信</label>
							<div class="controls">
								<input type="text" name="SNSAccount" 
								id="SNSAccount" value="${(userinfo.SNSAccount)!}" class="m-wrap span9" maxlength="50"/>
							</div>
						</div>
						<div class="control-group span4 ">
							<label class="control-label">电子邮箱</label>
							<div class="controls">
								<input type="text" name="email" 
								id="email" value="${(userinfo.email)!}" class="m-wrap span9" maxlength="30"/>
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="control-group span4 ">
							<label class="control-label">户籍地址<span class="required">*</span></label>
							<div class="controls">
								<input type="text" name="censusAddr" id="censusAddr" value="${(userinfo.censusAddr)!}" readonly 
								class="m-wrap span9" maxlength="200"/>
								<input type="hidden" name="censusProvcode" id="censusProvcode" 
								class="m-wrap large" value="${(userinfo.censusProvcode)!}" />
								<input type="hidden" name="censusCitycode" id="censusCitycode" 
								class="m-wrap large" value="${(userinfo.censusCitycode)!}" />
								<input type="hidden" name="censusTowncode" id="censusTowncode" 
								class="m-wrap large" value="${(userinfo.censusTowncode)!}" />
							</div>
						</div>
						<div class="control-group span4 ">
							<label class="control-label">详细户籍地址<span class="required">*</span></label>
							<div class="controls">
								<input type="text" name="censusAddress" 
								value="${(userinfo.censusAddress)!}" class="m-wrap span9" maxlength="200"/>
							</div>
						</div>
						<div class="control-group span4 ">
							<label class="control-label">邮寄地址<span class="required">*</span></label>
							<div class="controls">
								<select name="mailAddress" id="mailAddress" class="m-wrap span9">
									<option value="1">现地址</option>
									<option value="2">公司地址</option>
									<option value="3">户籍地址</option>
								</select>
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="control-group span4 ">
							<label class="control-label">现住址<span class="required">*</span></label>
							<div class="controls">
								<input type="text" name="liveAddr" id="liveAddr" value="${(userinfo.liveAddr)!}" readonly class="m-wrap span9" maxlength="200"/>
								<input type="hidden" name="liveProvcode" id="liveProvcode" class="m-wrap span9" 
								value="${(userinfo.liveProvcode)!}"/>
								<input type="hidden" name="liveCitycode" id="liveCitycode" class="m-wrap span9" 
								value="${(userinfo.liveCitycode)!}" />
								<input type="hidden" name="liveTowncode" id="liveTowncode" class="m-wrap span9" 
								value="${(userinfo.liveTowncode)!}" />
							</div>
						</div>
						
						<div class="control-group span4 ">
							<label class="control-label">详细现住址<span class="required">*</span></label>
							<div class="controls">
								<input type="text" name="liveAddress" 
								value="${(userinfo.liveAddress)!}" class="m-wrap span9" maxlength="200"/>
							</div>
						</div>
						<div class="control-group span4 ">
							<label class="control-label">现住址居住时间<span class="required">*</span></label>
							<div class="controls">
								<input type="text" name="liveYears" value="${(userinfo.liveYears)!}" class="m-wrap span9" maxlength="200"/>
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="control-group span4 ">
							<label class="control-label">居住属性<span class="required">*</span></label>
							<div class="controls">
								<select name="liveProperty" class="m-wrap span9">
									<option value="1">无按揭自置</option>
									<option value="2">有按揭自置</option>
									<option value="3">亲属产权</option>
									<option value="4">单位宿舍</option>
									<option value="5">租房居住</option>
									<option value="6">自建住房</option>
								</select>
							</div>
						</div>
						<div class="control-group span4 ">
							<label class="control-label">资质分类<span class="required">*</span></label>
							<div class="controls">
								<select name="qualifiType" class="m-wrap span9">
									<option value="1">A类客户</option>
									<option value="2">B类客户</option>
									<option value="3">C类客户</option>
									<option value="4">D类客户</option>
								</select>
							</div>
						</div>
						<div class="control-group span4 ">
							<label class="control-label">婚姻状况<span class="required">*</span></label>
							<div class="controls">
								<select name="maritalStatus" class="m-wrap span9">
									<option value="1">未婚</option>
									<option value="2">已婚</option>
									<option value="3">离异</option>
									<option value="4">丧偶</option>
									<option value="5">再婚</option>
									<option value="6">复婚</option>
								</select>
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="control-group span4 ">
							<label class="control-label">有无子女<span class="required">*</span></label>
							<div class="controls">
								<select name="haveChild" class="m-wrap span9">
									<option value="1">有</option>
									<option value="0">无</option>
								</select>
							</div>
						</div>
						<div class="control-group span4 ">
							<label class="control-label">其他借款<span class="required">*</span></label>
							<div class="controls">
								<input type="text" name="haveLoan"  value="${(userinfo.haveLoan)!}" class="m-wrap span9" maxlength="200"/>
							</div>
						</div>
						
					</div>
					<input type="hidden" name="type" id="submitType" value="1" />
				</form>
				<!-- 客户信息 form end -->
				
				<!-- 个人信息 form start-->
				<hr>
				<div>
					
					<h4 style="text-align:center"  data-ftl="tab_contacts_input">
						<strong>联系人信息</strong>
									<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
									<a href="javascript:void(0)" class="glyphicons no-js pencil"><i></i></a>
									<a href="javascript:void(0)" data-savetype="LXR" class="glyphicons no-js inbox"><i></i></a>
									<a href="javascript:void(0)" class="glyphicons no-js unshare"><i></i></a>
					</h4>
				</div>
				<hr>
				<script src="${cdnPath}/js/apply/contactsInput.js?v=${VERSION_NO}"></script>
				<div style="width:100%;" id="tab_contacts_input">
				
				</div>
				<#-- <#include "/apply/contacts_input.ftl" >个人信息 form end-->
				
				<!-- 个人资产 form start-->
				<hr>
				<div>
					
					<h4 style="text-align:center" data-ftl="tab_personassets">
						<strong>个人资产信息</strong>
									<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
									<a href="javascript:void(0)" class="glyphicons no-js pencil"><i></i></a>
									<a href="javascript:void(0)" data-savetype="GRZC" class="glyphicons no-js inbox"><i></i></a>
									<a href="javascript:void(0)" class="glyphicons no-js unshare"><i></i></a>
					</h4>
				</div>
				<hr>
				<script src="${cdnPath}/js/apply/personassets.js?v=${VERSION_NO}"></script>
				<div id="tab_personassets">
					
				</div>
				<#-- <#include "/apply/detail/personassets.ftl" >个人资产 form end-->
				
				<!-- 工作信息 form start-->
				<hr>
				<div>
					
					<h4 style="text-align:center"  data-ftl="tab_job_info_input">
						<strong>工作信息</strong>
									<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
									<a href="javascript:void(0)" class="glyphicons no-js pencil"><i></i></a>
									<a href="javascript:void(0)" data-savetype="GZXX" class="glyphicons no-js inbox"><i></i></a>
									<a href="javascript:void(0)" class="glyphicons no-js unshare"><i></i></a>
					</h4>
				</div>
				<hr>
				<script src="${cdnPath}/js/apply/jobinfoInput.js?v=${VERSION_NO}"></script>
				<div style="width:100%;" id="tab_job_info_input">
					
				</div>
				<#-- <#include "/apply/detail/job_info_input.ftl" >工作信息 form end-->
				</div>
		</div>
</div>				