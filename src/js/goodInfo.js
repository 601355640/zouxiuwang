require(['config'],function(){
    require(['jquery','swiper'],function(){

        var url = window.location.href;
        var params = url.split("?")[1]
        //console.log(params);
        var goodsID = params.split("=")[1];
        var userID = JSON.parse(localStorage.getItem('users')) || [];   
        console.log(userID);    
                
        var detail = function () {
            var $wrapper = $(".swiper-wrapper");
            /*创建siwper*/
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                slidesPerView: 3,
                loop:true
                
               
            });

            return {
                init:function () {

                    this.getData()
                },
                getData:function () {
                    $.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{goodsID:goodsID},function (data) {
                        var str = "";
                        console.log(data)
                        $(".info_name").html(data[0].goodsName);
                        $(".yuanjia").html("￥"+data[0].price);
                         $(".buyNumber>span").html(data[0].buynumber);
                         console.log(JSON.parse(data[0].imgsUrl)[1])
                        
                          for(var i=0;i<JSON.parse(data[0].imgsUrl).length;i++){
                                str+='<div class="swiper-slide" data-id="'+data[0].goodsID+'"><img src="'+JSON.parse(data[0].imgsUrl)[i]+'"/></div>'
                        }
                        $(".swiper-wrapper").html(str)

                        swiper.update();  // 更新Swiper
                        swiper.reLoop(); // 重新对需要循环的slide个数进行计算

                    })
                }

            }
        }();

        detail.init();      
                  
        //加载数据
        //  var url = window.location.href;
        //  var params = url.split("?")[1]
        //  console.log(params);
        //  var goodsID = params.split("=")[1];
        //
        //  $.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{goodsID:goodsID},function (data) {
        //        aData = data;
        //      var str = "";
        //      console.log(data)
        //      $(".info_name").html(data[0].goodsName);
        //      $(".yuanjia").html("￥"+data[0].price);
        //       $(".buyNumber>span").html(data[0].buynumber);
        //       console.log(JSON.parse(data[0].imgsUrl)[1])
        //      
        //        for(var i=0;i<JSON.parse(data[0].imgsUrl).length;i++){
        //              str+='<div class="swiper-slide" data-id="'+data[0].goodsID+'"><img src="'+JSON.parse(data[0].imgsUrl)[i]+'"/></div>'
        //      }
        //      $(".swiper-wrapper").html(str)
        //       
        //       
        //  })


        //返回
          $(document).on("click",".header_btn",function () {
                window.location.href="list.html"
            })
          
          //查看更多
          $(document).on("click",".checkGoods_txt",function () {
             var id = $(".swiper-slide").attr("data-id");
                window.location.href="goodDetails.html?goodsID="+id
            })
          


        //加入购物车
         $(document).on("click",".addGoods",function () {
             $.get("http://datainfo.duapp.com/shopdata/updatecar.php?callback=?",
             {
                userID:userID,
                goodsID:goodsID,
                number:1
             },
                function (result) {
                    console.log(result);
                    if(result=="1"){
                        alert("成功加入购物车")
                    }
                })
            })
    })
}) 


