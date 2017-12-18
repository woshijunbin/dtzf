var log = console.log.bind ? console.log.bind(console):console.log;
/** 数组是否包含obj值判断*/
Array.prototype.contains = function (obj) {  
    var i = this.length;  
    while (i--) {  
        if (this[i] === obj) {  
            return true;  
        }  
    }  
    return false;  
} 
/**去除字符串两个端空格*/
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

function MapController() {
    var c = {};
    
    c.init = function(mv, ms, hd) {
        mv.init();
        hd.resetLocation();
        mv.drawDistrict(ms.getCondition(), hd.getCityDm());
        ms.getHouse(ms.getData(), 1);  
    }
    
    return c;
}

function MapView(mapSearch) {
    var geo = new BMap.Geocoder(),
        hd = new HtmlDom(),
        ms = mapSearch;

    var v = {
        /**行政区地图缩放等级*/
        MAP_LEVELS_DISTRICT : {min:10, max:12, rang:[10,11,12],},
        /**街道地图缩放等级*/
        MAP_LEVELS_STREET : {min:13, max:15, rang:[13,14,15],},
        /**住宅小区地图缩放等级*/
        MAP_LEVELS_COMMUNITY : {min:16, max:17, rang:[16,17],},
        /**地址解析器*/
        myGeo : geo,
        /**缩放标识*/
        startZoom : false,
    };
    
    
    v.clearAll = function() {
        v.map.clearOverlays();
    }
    
    /**视野范围*/
    v.getView = function(){
        var bound = v.map.getBounds();
        return {
            'minLat':bound.Ke,
            'minLng':bound.Le,
            'maxLat':bound.Fe,
            'maxLng':bound.Ge,
        }  
    }
    
    v.init = function() {
        var t = this;
        t.map = new BMap.Map("container",{enableMapClick:false});
        t.map.centerAndZoom(hd.getCityMc(), v.MAP_LEVELS_DISTRICT.max);
    
        t.map.addEventListener("load", function() {
            var map = t.map;
            map.setMinZoom(t.MAP_LEVELS_DISTRICT.min); 
            map.setMaxZoom(t.MAP_LEVELS_COMMUNITY.max); 
            map.enableScrollWheelZoom(); 
            map.disableDoubleClickZoom(); 
            map.disableInertialDragging();
        });
        
        
        /**地图滚轮缩放开始*/
        t.map.addEventListener("zoomstart",function(e) {
            t.startZoom = true;
        });
        
        /**地图滚轮缩放结束*/
        t.map.addEventListener("zoomend",function(e) {
            if (t.startZoom) {
                v.clearAll();
                v.doEvents();
                t.startZoom = false;
            }
        });
        
        /**地图拖拽结束*/
        t.map.addEventListener("dragend",function(e) {
            t.clearAll();
            t.doEvents();
        });
    }
    
    v.drawDistrict = function(options, cityDm) {
        hd.resetDistrict();
        var map = v.map;
        loadingCustomOverlay( 
                $.extend({}, options, {'function':'draw/district', 'f.cs':cityDm,}), 
                function(d) {
                    v.myGeo.getPoint(d.city+d.district, function(point){
                        if (point) {
                            initSimpleOverlay({},{},d,{'onclick':function(e) {v.districtClick(d.city, cityDm, d.district, d.districtDm)}});
                            var myCompOverlay = new ComplexCustomOverlay(point, d.district, d.count + " 套");
                            map.addOverlay(myCompOverlay);
                        }
                    }); 
            });
    }
    
    v.drawStreet = function(options, districtDm) {
        hd.resetStreet();
        loadingCustomOverlay(
                $.extend({}, options, {'function':'draw/street', }), 
                function(d) {
                    v.myGeo.getPoint(d.district+d.street, function(point){
                        if (point) {
                            initSimpleOverlay({},{},d,{'onclick':function(e) {v.streetClick(d.district, districtDm, d.street, d.streetDm);}});
                            var myCompOverlay = new ComplexCustomOverlay(point, d.street, d.count + " 套");
                            v.map.addOverlay(myCompOverlay);
                        }
                    }); 
            });
    }
    
    v.drawCommunity = function(options, streetDm) {
        streetDm = streetDm ? streetDm : hd.getStreetDm();
        loadingCustomOverlay(
            $.extend({}, options, {'function':'draw/community', 'f.qy':streetDm, }), 
            function(d) {
                var point = new BMap.Point(d.lng, d.lat);
                if (point) {
                    initTagOverlay({}, { 
                        'onclick':function() {
                            ms.getHouse($.extend(options, ms.getSort(), {'f.lat':d.lat.substring(0, 9), 'f.lng':d.lng.substring(0, 10), }), 1);
                    }});
                    var myCompOverlay = new ComplexCustomOverlay(point, d.count + " 套", d.count + " 套 "+d.fwzl );
                    v.map.addOverlay(myCompOverlay);
                }
        }); 
    }
    
    /**
     * 自定义覆盖物(行政区)点击事件
     * @param city  城市名称
     * @param cityDm 城市代码
     * @param district 行政区名称
     * @param districtDm 行政区代码
     */
    v.districtClick = function(city, cityDm, district, districtDm) {
        hd.resetLocation();
        hd.setCity(city, cityDm);
        hd.setDistrict(district, districtDm);
        
        v.clearAll();
        
        v.map.centerAndZoom(city+district, v.MAP_LEVELS_STREET.min);
        v.drawStreet($.extend({'f.qx':districtDm,}, ms.getCondition()), districtDm);
        ms.getHouse(ms.getData(), 1);  
    }
    
    /**
     * 自定义覆盖物(街道)点击事件
     * @param district 行政区名称
     * @param districtDm 行政区代码
     * @param street 街道名称
     * @param streetDm 街道代码
     */
    v.streetClick = function(district, districtDm, street, streetDm) {
        hd.setDistrict(district, districtDm);
        hd.setStreet(street, streetDm);

        v.clearAll();
        
        v.map.centerAndZoom( district+street, v.MAP_LEVELS_COMMUNITY.max);
        v.drawCommunity(ms.getCondition(), streetDm);
        ms.getHouse(ms.getData(), 1); 
    }
    
    
    v.search = function() {
        v.clearAll();
        v.doEvents();
    }
    
    // 拖拽 ，缩放事件
    v.doEvents = function() {
        var map = v.map;
        
        if (v.isDistrict(map)) {
            // 清除非 住宅小区缩放等级时， 关键词条件
            ms.setKeywords('');
            v.drawDistrict($.extend({}, ms.getCondition(), v.getView()), hd.getCityDm());
        }
        
        if (v.isStreet(map)) {
            ms.setKeywords('');
            v.drawStreet($.extend({}, ms.getLocation(), ms.getCondition(), v.getView()), '');
        }
        
        if (v.isCommunity(map)) {
            v.drawCommunity($.extend({}, ms.getLocation(), ms.getCondition(), v.getView()), '');
        }
        ms.getHouse($.extend({}, ms.getData(), v.getView()),1); 
    }

    
    /**行政区缩放等级*/
    v.isDistrict = function(map) {
        return v.MAP_LEVELS_DISTRICT.rang.contains(map.getZoom());
    }
    /**街道缩放等级*/
    v.isStreet = function(map) {
        return v.MAP_LEVELS_STREET.rang.contains(map.getZoom());
    }
    /**住宅小区缩放等级*/ 
    v.isCommunity = function(map) {
        return v.MAP_LEVELS_COMMUNITY.rang.contains(map.getZoom());
    }
    
    return v;
}

function HtmlDom() {
    var o = {
            city : $("select[name='f.cs']"),
            district : $("input[name='f.qx']"),
            street : $("input[name='f.qy']"),
    };
    o.getCityMc = function() {return o.city.find("option:selected").text();}
    o.getCityDm = function() {return o.city.val();}
    o.getDistrictMc = function() {return o.district.val();}
    o.getDistrictDm = function() {return o.district.data('dm');}
    o.getStreetMc = function() {return o.street.val();}
    o.getStreetDm = function() {return o.street.data('dm');}
    o.getDd = $('.dd');
    
    o.resetLocation = function() {
        o.district.data('dm', '');
        o.district.val('');
        o.street.data('dm', '');
        o.street.val('');
    }
    
    o.resetCity = function() {
        o.city.val('');
        o.city.data('dm','');
    }
    
    o.resetDistrict = function() {
        o.district.data('dm', '');
        o.district.val('');
    }
    
    o.resetStreet = function() {
        o.street.data('dm', '');
        o.street.val('');
    }
    
    o.setCity = function(mc, dm) {
        o.city.val(mc);
        o.city.data('dm', dm);
    }
    o.setDistrict = function(mc, dm) {
        o.district.val(mc);
        o.district.data('dm', dm);
    }
    o.setStreet = function(mc, dm) {
        o.street.val(mc);
        o.street.data('dm', dm);
    }
    
    return o;
}

function MapSearch() {
    var s = {
            options:{},
    },
        hd = new HtmlDom(),
        form = $('#form'),
        // 搜索关键字
        keyWords = $("input[name='f.fwzl']"),
        // 用途
        yt = $("select[name='yt']"),
        // 房型【新房、二手房】
        fx = $("select[name='a']"),
        // 总价
        zj = $("select[name='b']"),
        // 户型【一户、二户、...】
        hx = $("select[name='c']"),
        // 面积
        mj = $("select[name='fwjzmj']"),
        // 面积排序
        sortMj = $(".mj"),
        // 价格排序
        sortPrice = $(".price"),
        // 纬度
        lat = $("input[name='f.lat']"),
        // 经度
        lng = $("input[name='f.lng']");
      
    /**ajax参数记录*/
    s.setOptions = function(data) {
        s.options = data;
    }
    
    s.getOptions = function() {
        return s.options;
    }
    
    /**经纬度*/
    s.getCoord = function() {
        return {
            'f.lat':lat.val(),
            'f.lng':lng.val(),
        }
    }
    s.setCoord = function(a,b) {
        lat.val(a);
        lng.val(b);
    }
    
    
    /**排序条件*/
    s.getSort = function() {
        return {
            'sortMj':sortMj.data('mj'),
            'sortPrice':sortPrice.data('price'),
        }
    }
        
    /**筛选条件*/ 
    s.getCondition = function() {
        return {
            'f.fwzl':keyWords.val().trim(),
            'yt' : yt.val(),
            'fx' : fx.val(),
            'zj' : zj.val(),
            'hx' : hx.val(),
            'fwjzmj' : mj.val(),
        }
    }
    
    /**位置信息*/ 
    s.getLocation = function() {
        return {
            'f.cs':hd.getCityDm(),
            'f.qx':hd.getDistrictDm(),
            'f.qy':hd.getStreetDm(), 
        }
    }
    
    s.getData = function() {
        return $.extend({}, s.getSort(), s.getCondition(), s.getLocation());
    }
    
    s.setViewData = function(data) {
        hd.getDd.empty();
        if(!data || !data.length){
            hd.getDd.append("<div class='dd_wrap'>很抱歉！目前未有符合条件的房源。<a href='javascript:location.reload();' style='color:#4081d6;'>重置条件</a></div>");   
        }else {
            for(var i = 0;i<data.length;i++) {
                var content = 
                   "<div class = 'houseItem'>                                                                                                   "+
                   "    <a href='#' target='_blank'>                                                                                            "+
                   "        <div class= 'houseItem-left'>                                                                                       "+
                   "            <img alt='房源图片' src='https://img.wkzf.com/86d7c27bf5934895a057dd6e5f2e974b.ML'>                             "+
                   "        </div>                                                                                                              "+
                   "        <div class='houseItem-right'>                                                                                       "+
                   "            <h2>                                                                                                            "+
                   "                <p class='totalPrice'>xxxx 万元</p>                                                                         "+
                   "                <p class='title' title="+data[i].fwzl+">"+data[i].fwzl+"</p>                              "+
                   "            </h2>                                                                                                           "+
                   "            <p class='houseTag'>                                                                                            "+
                   "                <span>"+data[i].fwjzmj+"㎡</span>                                                                                         "+
                   "                <span>x厅x卫x室</span>                                                                                      "+
                   "                <span>南北</span>                                                                                           "+
                   "            </p>                                                                                                            "+
                   "            <p class='description' title='"+data[i].tbsm+"'>"+data[i].tbsm+"</p>                                       "+
                   "        </div>                                                                                                              "+
                   "    </a>                                                                                                                    "+
                   "</div>";                                                                                                                    
                hd.getDd.append(content);
            }
            hd.getDd.append("<div id='fy' style='text-align:center;'></div>");
        }
    }
    
    s.getHouse = function(options, intPage) {
        s.setOptions(options);
        $.ajax({
            type : "GET",
            url : "map/show.do",
            dataType : "json",
            data : $.extend({}, options, {'function':'search/houses', 
                'sp.intPage' : intPage,
                }),     
            success: function(data){
                s.setViewData(data.info);
                laypage.render({
                    elem: 'fy',
                    groups:2,
                    count:data.totalPage * data.intPageSize || 0,
                    limit:data.intPageSize,
                    curr:data.curPage || 1,
                    jump:function(obj,first) {
                        if(!first){
                            s.getHouse(options, obj.curr);
                            s.toTop();
                        }           
                    }
                });
            }
        });
        s.toTop();
    }
    
    s.setKeywords = function(keyword) {
        keyWords.val(keyword);
    }
    
    s.resetSort = function() {
        sortMj.data('mj', '');
        sortPrice.data('price', '');
    }
    
    /**面板回顶部*/
    s.toTop = function() {
        hd.getDd.scrollTop(0);
    }
    
    return s;
}

/**
 * 关键字搜索
 * @param mapView
 * @param mapSearch
 * @param intPage
 * @returns
 */
function searchBykw(mapView, mapSearch, intPage) {
    var map = mapView.map;
    var keyword = $("input[name='f.fwzl']").val().trim();
    if (!keyword) {
        layer.msg('输入小区再搜索',{time:1500});
        return;
    }
    
    var options = $.extend({}, mapSearch.getSort(), mapSearch.getCondition());
    mapSearch.setOptions(options);
    $.ajax({
        type : "GET",
        url : "map/show.do",
        dataType : "json",
        data : $.extend({}, options, {'function':'search/houses', 'sp.intPage' : intPage, }), 
        success : function(data){
            mapView.clearAll();
            if (data.info && data.info.length) {
                // 左侧栏
                mapSearch.setViewData(data.info);
                // 画图
                map.centerAndZoom(new BMap.Point(data.info[0].lng, data.info[0].lat), mapView.MAP_LEVELS_COMMUNITY.min);
                var bs = map.getBounds();
                loadingCustomOverlay(
                    $.extend({},mapView.getView(), mapSearch.getCondition(), {'function':'draw/community', }), 
                    function(d) {
                        var point = new BMap.Point(d.lng, d.lat);
                        if (point) {
                            initTagOverlay({},{
                                'onclick':function() {
                                    mapSearch.getHouse(
                                            $.extend({'f.lat':d.lat, 'f.lng':d.lng, }, mapSearch.getSort(), mapView.getView(), mapSearch.getCondition()), 1);}},
                                function() {
                                    $(this).mouseenter();
                                }
                            );
                            var myCompOverlay = new ComplexCustomOverlay(point, d.count + " 套", d.count + " 套 "+d.fwzl );
                            map.addOverlay(myCompOverlay);
                        }
                    }
                ); 
            }else {
                mapSearch.setViewData();
                mapView.clearAll();
                layer.msg('对不起！没有找到房源。',{'time':2000});
            }
            laypage.render({
                elem: 'fy',
                groups:2,
                count:data.totalPage * data.intPageSize || 0,
                limit:data.intPageSize,
                curr:data.curPage || 1,
                jump:function(obj,first) {
                    if(!first){
                        searchBykw(mapView, mapSearch, obj.curr);
                        mapSearch.toTop();
                    }           
                }
            });
        }
    });
    mapSearch.toTop();
}

/**
 * 自定义覆盖物
 * @param point 覆盖物坐标
 * @param text  文本1
 * @param textem 文本2
 * @param ...  可添加多个文本。
 * @returns
 */
function ComplexCustomOverlay(point, count, text) {
    this._point = point;
    this._countText = count;
    this._text = text;
}
ComplexCustomOverlay.prototype = new BMap.Overlay();
ComplexCustomOverlay.prototype.draw = function() {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x - 30 + "px";
    this._div.style.top = pixel.y - 30 + "px";
}

/**
 * 圆形样式自定义覆盖物
 * @param divStyle div样式表
 * @param emStyle  em样式表
 * @param option   覆盖物需要使用的数据对象
 * @returns
 */
function initSimpleOverlay(divStyle,emStyle,option,event) {
    ComplexCustomOverlay.prototype.initialize = function(map) {
        this._map = map
        var div_default_style = {
                'position':'absolute',
                'background':'url(static/common/images/bg_region.png)',
                'color':'white',
                'height':'50px',
                'width':'90px',
                'textAlign':'center',
                'padding':'20px 0',
                'lineHeight':'24px',
                'fontSize':'16px',
                'cursor':'pointer',
            },
            em_default_Style = {
                'display':'block',
                'fontSize':'14px',
            },
            div = this._div = $("<div>"+this._countText+"</div>")[0],
            em = $("<em>"+this._text+"</em>")[0],
            span = this._span = $("<span></span>")[0];
        
        $.extend(div_default_style, divStyle);
        $.extend(em_default_Style, emStyle);
        for (key in div_default_style) {
            div.style[key] = div_default_style[key];
        }
        for (key in em_default_Style) {
            em.style[key] = em_default_Style[key];
        }
        div.id =  option.dm
        
        for (key in event) {
            div[key] = event[key];
        }
        div.onmouseenter = function(){
            this.style.zIndex = 999;
            this.style.background = 'url(static/common/images/bg_region_m.png)';
        }

        div.onmouseleave = function(){
            this.style.zIndex = 1;
            this.style.background = 'url(static/common/images/bg_region.png)';
        }
        

        span.appendChild(em)
        div.appendChild(span);
        map.getPanes().labelPane.appendChild(div)
        return div
    }
}

/**
 * 标签样式自定义覆盖物
 * @param divStyle
 * @param event
 * @returns
 */
function initTagOverlay(divStyle,event,method) {
    ComplexCustomOverlay.prototype.initialize = function(map){
        this._map = map;
        var div_default_style = {
                'position':'absolute',
                'backgroundColor':'#EE5D5B',
                'color':'white',
                'height':'18px',
                'whiteSpace':'nowrap',
                'padding':'2px',
                'lineHeight':'18px',
                'fontSize':'12px',
                'MozUserSelect':'none',
            },
            div = this._div= $("<div class='tag'></div>")[0],
            arrow = this._arrow = $("<div></div>")[0],
            countText = this._countTextFont = $("<font>"+this._countText+"</font>")[0];
            text = this._textSpan = $("<span style = 'display:none;'>"+this._text+"</span>")[0];
        $.extend(div_default_style, divStyle);
        for (key in div_default_style) {
            div.style[key] = div_default_style[key];
        }
        for (key in event) {
            div[key] = event[key];
        }
        
        var that = this;
        arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
        arrow.style.position = "absolute";
        arrow.style.width = "11px";
        arrow.style.height = "10px";
        arrow.style.top = "21px";
        arrow.style.left = "10px";
        arrow.style.overflow = "hidden";
        div.appendChild(countText);
        div.appendChild(text);
        div.appendChild(arrow);
        div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
        
        var flag = true;
        $(div).on('mouseenter', function(){
            overWithMouse(this);    
            flag = true;
        });

        /**
         * tag标签覆盖物高亮样式
         */
        function overWithMouse(elem) {
            elem.style.backgroundColor = "#FFA746";
            elem.style.zIndex = 999;
            elem.getElementsByTagName("font")[0].style.display = 'none';
            elem.getElementsByTagName("span")[0].style.display = 'inline-block';
            elem.children[2].style.backgroundPosition = "0px -10px";
            elem.style.cursor = "pointer";
        }


        /**
         * 这里关于事件的互相触发，应该有更好的方式实现。
         * 默认标签覆盖物显示样式。
         */
        function leaveWithMouse(elem) {
            elem.style.backgroundColor = "#EE5D5B";
            //elem.style.zIndex = BMap.Overlay.getZIndex(that._point.lat);
            elem.style.zIndex = 1;
            elem.getElementsByTagName("font")[0].style.display = 'inline-block';
            elem.getElementsByTagName("span")[0].style.display = 'none';
            elem.children[2].style.backgroundPosition = "0px 0px";
        }
        $(div).on('mouseleave', function() {
            if (flag) {
                leaveWithMouse(this);
            } 
        });
        $(div).on('click', function() {
            $(".tag").each(function(index,elem) {
                elem.style.backgroundColor = "#EE5D5B";
                elem.style.zIndex = 1;
                elem.getElementsByTagName("font")[0].style.display = 'inline-block';
                elem.getElementsByTagName("span")[0].style.display = 'none';
                elem.children[2].style.backgroundPosition = "0px 0px";
            });
            this.style.backgroundColor = "#FFA746";
            this.style.zIndex = 999;
            this.getElementsByTagName("font")[0].style.display = 'none';
            this.getElementsByTagName("span")[0].style.display = 'inline-block';
            arrow.style.backgroundPosition = "0px -10px";
            this.style.cursor = "pointer";
            flag = false;
        })
        
        method ? method.call(div):'';
        map.getPanes().labelPane.appendChild(div);
        
        return div;
      }
}

/**
 * 覆盖物渲染通用处理程序
 * @param option ajax参数
 * @param callback 迭代返回数据时执行的函数
 * @returns
 */
function loadingCustomOverlay(option,callback) {
    $.ajax({
        type: "get",
        url: 'map/show.do',
        data: option,
        dataType:"json",
        success: function (data) {
            var index = layer.load(1, {
                shade: [0.3,'#000'],
                time:10000,// 无论如何10秒后自动关闭加载提示效果
              });
            setTimeout(function() {
                if (data && data.length != 0) {
                    for (var i = 0; i < data.length; i++) {
                    	(function(i) {
                    		callback(data[i]);
                    	})(i);
                    }
                }
                // 覆盖物完全画完再关闭加载提示
                layer.close(index);
                if (!data || data.length == 0){
                	layer.msg('当前可视区域暂无房源！请尝试移动到其他区域',{'time':2000});
                }
            },400);
        }
    }); 
}

function main() {
    var mc = new MapController();
    var hd = new HtmlDom();
    var ms = new MapSearch();
    var mv = new MapView(ms);
    
    // 初始化地图 [焦点：指定城市范围, 缩放等级：MAP_LEVELS_DISTRICT.max]
    mc.init(mv, ms, hd);
    
    // 地址搜索按钮
    $('#keywordSearch').click(function() {
        searchBykw(mv, ms, 1);
    });
    
    // 筛选条件
    layui_form.on('select(sel)', function(data){
        mv.search();
    });
    
    // 城市选择
    layui_form.on('select(init)', function(data){
        mc.init(mv, ms, hd);
    }); 
    
    // 根据面积排序
    $(".mj").toggle(
            function() {
                // 高到低
                var that = $(this);
                $('.sortDefault').css('color','#999');
                that.data('mj',0);
                that.html('面积<i>↑</i>');
                that.css('color','#2794EB');
                ms.getHouse($.extend({}, ms.getOptions(), ms.getSort()), 1);
            },
            function(){
                // 低到高
                var that = $(this);
                $('.sortDefault').css('color','#999');
                that.css('color','#2794EB');
                that.data('mj',1);
                that.html('面积<i>↓</i>');
                ms.getHouse($.extend({}, ms.getOptions(), ms.getSort()), 1);
            }
    );
    // 根据价格排序
    $(".price").toggle(
            function() {
                // 高到低
                var that = $(this);
                $('.sortDefault').css('color','#999');
                that.data('price',0);
                that.html('价格<i>↑</i>');
                that.css('color','#2794EB');
                ms.getHouse($.extend({}, ms.getOptions(), ms.getSort()), 1);
            },
            function(){
                // 低到高
                var that = $(this);
                $('.sortDefault').css('color','#999');
                that.css('color','#2794EB');
                that.data('price',1);
                that.html('价格<i>↓</i>');
                ms.getHouse($.extend({}, ms.getOptions(), ms.getSort()), 1);
            }
    );

    // 默认排序
    $(".sortDefault").click(function() {
        $('.sortDefault').css('color','#2794EB');
        $('.mj').css('color','#999').html('面积');
        $('.price').css('color','#999').html('价格');
        ms.resetSort();
        ms.getHouse($.extend({}, ms.getOptions(), ms.getSort()), 1);
    });
}

/**入口*/
layui.use(['form','laypage'], function(){
    layui_form = layui.form,
    laypage = layui.laypage,
    layer = layui.layer;
    
    // 侧边栏显示隐藏
    window.dis_close.onclick = sideSwitch;
    // 侧边栏高度
    window.onload = window.onresize = setHeight;

    function sideSwitch() {
        $('.map-left').toggleClass("left_hid");
        $('#dis_close').toggleClass("dis_open");
        $("em").toggleClass("open");
    }
    
    function setHeight() {
        var he = $("#container").height() - 225;
        $(".dd").css("maxHeight",he);
    } 
    
    main();
});
