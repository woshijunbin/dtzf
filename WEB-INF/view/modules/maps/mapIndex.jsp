<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>地图找房</title>
    <%@include file="/WEB-INF/view/include/head.jsp" %>
    <meta name="renderer" content="webkit"><!-- 360采用急速模式 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" type="text/css" href="${ctx}/static/common/fyfb.css">
    <script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=evvQ1QHZGXraeG4yi6eXNPjFHLZGXwVT"></script>
    <script type="text/javascript" src="http://api.map.baidu.com/library/GeoUtils/1.2/src/GeoUtils_min.js"></script>
</head>
<body>
<!-- wrap start -->
<div class="wrap" >
    <!-- left start -->
    <div class="map-left shawdow ">
        <!-- dis_box start -->
        <div class="dis_box"  >
            <!-- dis_search start -->
            <form action="" id="form" style="border-bottom: 1px solid #e8e8e8;">
                <input type="hidden" id="pageNo"   name="sp.intPage">
                <input type='hidden' name='function' value='ms'>
                <input type='hidden' name='f.lat' value=''>
                <input type='hidden' name='f.lng' value=''>
                <input type='hidden' readonly="readonly" name='f.qx' value=''>
                <input type='hidden' readonly="readonly" name='f.qy' value=''>
                <div class="dis_search layui-form"  >
                    <!-- s_input start -->
                    <div class="s_input">
                        <select name="a" lay-filter="sel">
                            <option value="">房型</option>
                            <option value="0">新房</option>
                            <option value="1">二手房</option>
                        </select>
                        <input class="tt" type="text" name="f.fwzl" placeholder="住宅小区">
                        <a id = 'keywordSearch' href="javascript:;"><i class="layui-icon" style="font-size: 20px;">&#xe615;</i>  </a>
                    </div>
                    <!-- s_input end -->
                    <!-- s_condition start -->
                   <div class="ssy s_condition">
                        <select name="yt" lay-filter="sel">
                            <option value="">用途</option>
                            <option value="0">住宅</option>
                            <option value="1">店铺</option>
                        </select>
                        <select  name="b" lay-filter="sel">
                            <option value="">总价</option>
                            <option value="0">100万以下</option>
                            <option value="1">100-150万</option>
                            <option value="2">...</option>
                        </select>
                        <select name="c" lay-filter="sel">
                            <option value="">户型</option>
                        </select>
                        <select  name="fwjzmj" lay-filter="sel">
                            <option value="">面积</option>
                            <option value="1">100㎡以下</option>
                            <option value="2">100-150㎡</option>
                            <option value="3">...</option>
                        </select>
                    </div>
                    <!-- s_condition end -->
                    <div class="address-selector">
                        <select name="" lay-filter="">
                            <option value="">省份</option>
                            <option value="1" selected="selected">广东省</option>
                        </select>
                        <select  name="f.cs" lay-filter="init">
                            <option value="440500" selected="selected">汕头市</option>
                            <option value="445100" >潮州市</option>
                        </select>
                        <!-- s_sort start -->
                        <ul class="s_sort">
                            <li class="mj">面积</li>
                            <li class="price">价格</li>
                            <li class="sortDefault" style="color: #2794EB;">默认</li>
                        </ul>
                        <!-- s_sort end -->
                    </div>
                </div>
            </form>
            <!-- dis_search end -->
            <!-- 房源展示栏 start -->
            <div class="dis_display">
            	<div class="dd"></div>
            </div>
            <!-- 房源展示栏 end -->
        </div>
        <!-- dis_box end -->
    </div>
    <!-- left end -->
    <!-- dis_close start -->
    <div id="dis_close" class="shawdow"><em></em></div>
    <!-- dis_close end -->
    <!-- right start -->
    <div class="right"><div id="container"></div></div>
    <!-- right end -->
   
</div> 
<!-- wrap end -->

<script type="text/javascript" src="${ctx}/static/common/fyfb.js"></script>
</body>
</html>

