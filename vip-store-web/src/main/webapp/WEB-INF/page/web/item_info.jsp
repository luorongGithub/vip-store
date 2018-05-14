<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" class="loading">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="viewport"
	content="width=device-width, initial-scale=0.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
	<meta content="yes" name="apple-mobile-web-app-capable"/>
		<meta content="black" name="apple-mobile-web-app-status-bar-style"/>
			<meta content="telephone=no" name="format-detection"/>
				<script>
					var logined = 0
				</script>
				<title>九九网络</title>
<!-- 引入 Bootstrap -->
<link href="<c:url value='/css/bootstrap.min.css'/>" rel="stylesheet"/>
<link href="<c:url value='/css/bootstrap-grid.min.css'/>" rel="stylesheet"/>
<link href="<c:url value='/css/pro_css.css'/>" rel="stylesheet"/>
<style type="text/css">
.pro_info label{
	font-size: 14px;
	font-family:serif;
	float: left;
	margin:0px 10px 0 10px;
}
.price{
	color: red;
	font-size: 20px;
}
.pro_info{
    height: 35px;
    padding: 8px 0px 5px 0px;
}
hr{
	margin:10px 0px 10px 0px;
}
.desciption{
	margin-left: 10px;
	margin-right: 10px;
}
html,body{height:100%;}
.wrap{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;width:100%;height:100%;}
.header,.footer{background-color: #549ced;height:40px;line-height:40px;text-align:center;}
.main{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;width:100%;}
</style>
</head>
<body>
<div class="wrap">
    <div class="header"><a href="pageList.do" class="menu_back"></a></div>
    <div class="main">
    	<form action="comfirmInfo.do" id="formAction">
    	<input type="hidden" name="id" value="${product.id}"/>
			<div style="text-align: center;">
				<div style="text-align: center;margin-top: 20px;">
					<img
						src="${product.imageUrl}" width="150" height="150"></img>
				</div>
				<h5  style="text-align: center;margin:10px 10px 10px 10px;">${product.itemName}</h5>
				
				<hr />
				<div class='pro_info'>
					<label>单价： <span class='price'>￥${product.sellingPrice}</span></label>
					<label style="float: right;">批发价:<span  class='price'>￥${product.sellingPrice}</span></label>
				</div>
				<hr />
				<div class='pro_info'>
					<label>库存： ${product.realStock+product.cacheStock} 条</label>
					<label style="float: right;">销量：${product.salesVolume} /月</label>
				</div>
				<hr />
					<label style="margin-top: 8px;float: left;margin-left: 10px;">手机号:</label><input class="form-control" placeholder="请输入手机号" name = "mobile" style="width: 150px;margin-left: 10px;float: left;"/>
					<label style="margin-top: 8px;float: left;margin-left: 10px;">数量:</label><input class="form-control" name="num" style="width: 60px;margin-left: 10px;float: left;" value="1"/>
					<button class="btn btn-danger" style="width:40%;margin-top: 20px;" onclick="comfirm();">购买</button>
					
				<div class='pro_info' style="background-color: #549ced;margin-top: 20px;">
					<label style="color: #FFF;font-size: 18px;">商品描述：</label>
				</div>
			</div>
		</form>
		<div class="desciption">
			${product.description}
		</div>
    </div>
    <div class="footer" style="background-color: #549ced;">@九九技术支持</div>
</div>
<!-- jQuery (Bootstrap 的 JavaScript 插件需要引入 jQuery) -->
	<script src="<c:url value='/js/jquery-1.9.1.min.js'/>"></script>
	<!-- 包括所有已编译的插件 -->
	<script src="<c:url value='/js/bootstrap.min.js'/>"></script>
	
	<script type="text/javascript">
		function comfirm(){
			$("#formAction").submit();
		}
	</script>
</body>
</html>