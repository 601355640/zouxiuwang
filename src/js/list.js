


 require(['config'],function(){
    require(['jquery','swiper','iscroll'],function($,swiper,IScroll){

            //console.log(1);
            /*创建滚动条*/
            var myScroll = new IScroll(".scroll-wrapper");


          //获取分类信息
          
          $.get("http://datainfo.duapp.com/shopdata/getclass.php?callback=?",function (lei) {
                //onsole.log(lei);
                var lei = JSON.parse(lei);
                var str = "";
                
               // console.log(lei[1].icon);
                
                for(var i=0;i<lei.length;i++){
                       
                        if(i==0){
                             str+='<div class="fenlei_item swiper-slide "data-classId="'+lei[i].classID+'" ><p class="triangle-up"></p>'+lei[i].className+'</div>'
                        }else{
                             str+='<div class="fenlei_item swiper-slide "data-classId="'+lei[i].classID+'" ><p></p>'+lei[i].className+'</div>'
                //console.log(lei[i].icon);
                        }
                }
                    $(".fenlei_list").html(str)
                        

            });
          
                    var swiper = new Swiper('.swiper-container', {
                            pagination: '.swiper-pagination',
                            slidesPerView: 'auto',
                            centeredSlides: true,
                            paginationClickable: true,
                            spaceBetween: 30
                     });


        //获取商品信息
        var classID=1;

        // $(".fenlei_list:first-child").children("p").addClass("triangle-up")
        //      alert($(".fenlei_list:first-child"))
        var aData = [];
        $.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{classID:classID},function (data) {
                //console.log(data);
                aData = data;
                var str = "";
                for(var i=0;i<data.length;i++){
                        str+='<li class="content_item" data-id="'+data[i].goodsID+'">'+
                                '<img src="'+data[i].goodsListImg+'"/>'+
                                '<p class="item_name">'+data[i].goodsName+'</p>'+
                                '<p>'+
                                  '<span class="yuanjia">￥'+data[i].price+'</span>'+
                                   '<span class="xianjia"><s>￥999</s></span>'+
                                '</p>'+
                            '</li>'
                }
                $(".content_list").html(str)
                 myScroll.refresh()
            });

          
           $(document).on("click",".fenlei_item",function () {
                goodsID=$(this).attr("data-classId");
                console.log(goodsID);
                    $.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{classID:goodsID},function (data) {
                    console.log(data);
                    aData = data;
                    var str = "";
                    for(var i=0;i<data.length;i++){
                            str+='<li class="content_item" data-id="'+data[i].goodsID+'">'+
                                    '<img src="'+data[i].goodsListImg+'"/>'+
                                    '<p class="item_name">'+data[i].goodsName+'</p>'+
                                    '<p>'+
                                      '<span class="yuanjia">￥'+data[i].price+'</span>'+
                                       '<span class="xianjia"><s>￥999</s></span>'+
                                    '</p>'+
                                '</li>'
                    }
                    $(".content_list").html(str)
                     myScroll.refresh()
                    });

                    $(this).children("p").addClass("triangle-up").parent().siblings().children("p").removeClass("triangle-up")
           })

          
        //历史记录
          $(document).on("click",".content_item",function () {
                var id = $(this).attr("data-id");
                
                var proData = {}
                for(var i=0;i<aData.length;i++){
                    if(aData[i].goodsID==id) {
                        proData = aData[i];
                        break
                    }
                }
                //console.log(proData);
                var proHistory = JSON.parse(localStorage.getItem("proHistory")||'[]'); 
                for(var i=0;i<proHistory.length;i++){
                   if(proHistory[i].goodsID==id){
                       proHistory.splice(i,1) 
                   }
                }
                proHistory.unshift(proData);
               // console.log(proHistory);
                localStorage.setItem("proHistory",JSON.stringify(proHistory));
                window.location.href="goodInfo.html?goodsID="+id
            })
    })
 })
 
 
 