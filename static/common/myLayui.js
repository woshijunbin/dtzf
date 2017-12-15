/**
 * 分页需提供:
    var totalPage = '${totalPage}';// 总页数
    var curPage = '${deptForm.sp.intPage}';// 当前页
    var intPageSize = '${deptForm.sp.intPageSize}';// 每页记录数
    var totalCount  = totalPage * intPageSize || 0; // 总记录数
	
 *	fy:分页div的id
 *	search：form表单id
 * 
 */
console.log( document.getElementById("fy") && status)
if (document.getElementById("fy") && status) {
	laypage.render({
	        elem: 'fy',
	        count:totalCount,
	        limit:intPageSize,
	        curr:curPage || 1,
	        jump:function(obj,first) {
	            if(!first){
	                $("#pageNo").val(obj.curr);
	                $("#search").submit();
	            }           
	        }
    });
}



