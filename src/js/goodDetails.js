require(['config'],function(){
    require(['jquery'],function($){

        var url = window.location.href;
        var params = url.split("?")[1]//params:参数  (goodsID=43)
        console.log(params);
        var goodsID = params.split("=")[1];

        $.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{goodsID:goodsID},function (data) {
            var str = "";
            console.log(data)
            var src=JSON.parse(data[0].goodsBenUrl)[0]
            $(".goodDetails_img>img").attr("src",src)
            
            
             for(var i=0;i<data.length;i++){
                    str+='<p>商品名称：<span class="goodsName">'+data[i].goodsName+'</span></p>'+
                        '<p>商品类型：<span class="className">'+data[i].className+'</span></p>'+
                        '<p>商品信息：<span class="detail">'+data[i].detail+'</span></p>'
            $(".goodDetails_info").html(str)
            } 
             
        })

        $(document).on("click",".header_btn",function () {
                window.location.href="goodInfo.html?goodsID="+goodsID 
            })



    })
})


 