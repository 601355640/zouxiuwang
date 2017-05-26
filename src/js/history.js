
require(['config'],function(){
	require(['jquery'],function($){
		var proHistory = JSON.parse(localStorage.getItem("proHistory"));

		var str = "";
		for(var i=0;i<proHistory.length;i++){
		    str+='<li>' +
		            '<a href="goodInfo.html?goodsID='+proHistory[i].goodsID+'"><img src="'+proHistory[i].goodsListImg+'"/>' +
		            '<div class="history_info"><p class="history_name">'+proHistory[i].goodsName+'</p>' +
		            '<p class="history_price">价格:<em>$'+proHistory[i].price+'</em></p></div></a>' +
		        '</li>'
		}
		$(".history_list").html(str);

	})
})
