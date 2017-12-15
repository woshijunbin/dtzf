
/*用于封装增删改操作的一般方法*/

/**
 * 修正弹出层宽高
 * @param win
 * @returns
 */
function getWH(win){
    var h = win.innerHeight - 50 +"px",
        w = win.innerWidth - 50+"px";
    return {'h':h,'w':w};

}

/**
 * 点击新增、修改按钮
 * content_p:弹出层页面url
 * width_p、height_p、title_p：弹出层宽高、标题
 */
function common_add(content_p,width_p,height_p,title_p){
    var hAw = getWH(window);
    width_p = width_p <= hAw['w']?width_p:hAw['w'];
    height_p = height_p <= hAw['h']?height_p:hAw['h'];
    
	openParamAdd={
			type: 2,
			id:'xx',//只允许弹出一个
			area: [width_p, height_p],
			fixed: false, //不固定
			maxmin: true,
			title: title_p, 
			content:content_p,
			offset:'30px'
		}
		var index = layer.open(  openParamAdd	);//弹出层
}

/**
 * ajax提交保存
 * btn:表单提交按钮id：用于禁止重复点击
 * type_p:提交类型
 * url_p:提交url 
 * formId :form表单id
 * ms:添加成功提示时间
 * errJsons:json格式错误提示{"1":"错误！","0":"成功"}
 * 示例：common_saveAdd("add","POST","ghjsfwflAdd.do","form",jzForm);
 * @returns
 */
function common_saveAdd(btn,type_p,url_p,formId,ms,errJsons){
	$("#"+btn).prop("disabled",true);
	$.ajax({
		type:type_p,
		dataType:"html",
		url:url_p,
		data:$("#"+formId).serialize(),
		success:function(result){
			var imgIcon = result==='0'?6:5;
			layer.msg(errJsons[result],{icon:imgIcon,time:ms});
		},
		error:function(){
			layer.msg("糟糕！发生异常情况，刷新试试。", {icon: 5,time:ms});
		},
		complete:function(){
			
			window.setTimeout(function(){//延时-让layer.msg能够显示
				var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
				parent.layer.close(index);//关闭弹出
				parent.window.location.reload(true);
			},ms);
		}
	});		
}



//完成修改
/**
 * ajax提交修改保存。提交整个form表单
 * btn:确认修改按钮id
 * type_p:提交方式
 * url_p:提交路径  
 * formId:form表单id
 * ms:修改完成提示时间
 * errJsons:json格式错误提示{"1":"错误！","0":"成功"}
 * @returns
 */
function common_saveUpd(btn,type_p,url_p,formId,ms,errJsons){
	$("#"+btn).prop("disabled",true);
	$.ajax({
		type:type_p,
		dataType:"html",
		url:url_p,
		data:$("#"+formId).serialize(),
		success:function(result){
			var imgIcon = result==='0'?6:5;
			layer.msg(errJsons[result],{icon:imgIcon,time:ms});
		},
		error:function(){
			layer.msg('抱歉！发生未知异常。', {icon: 5}); 
		},
		complete:function(){
			window.setTimeout(function() {
				var index = parent.layer.getFrameIndex(window.name); //获取弹出层索引
				parent.layer.close(index);//关闭弹出
				parent.window.location.reload(true);//主页面刷新
			}, ms)
		}
	});		
}



/**
 *点击删除按钮。post方式、点击后禁点任何其他删除键(name='del')
 *type_p:get/post请求
 *url_p:ajax访问连接，
 *data_p:ajax传递参数
 *errJsons:json格式错误提示{"1":"错误！","0":"成功"}
 */
function common_del(type_p,url_p,data_p,ms,errJsons){
	$(":button[name='del']").prop("disabled",true);//阻止所有删除按钮点击
	function confirm () {
	    $.ajax({
	        type:type_p,
	        url:url_p,
	        dataType:"html",
	        data:data_p===null?'':data_p,
	        success:function(result){
	            
	            var imgIcon = result==='0'?6:5;
	            layer.msg(errJsons[result],{icon:imgIcon,time:ms,end:function(){window.location.reload(true);}});
	        },  
	        error:function(){
	            layer.msg("抱歉！发生未知异常。",{icon:5,time:ms});
	        }
	    });
	}
	
	layer.confirm('确认删除吗？', {
	    btn: ['是','否'] //按钮
	  }, confirm, function(){}
    );
}

// 去除字符串两段空格
function trim(str) {
    if (typeof str == 'number' || typeof str == 'string') {
        str += "";
    }else {
        str = "";
    }
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

