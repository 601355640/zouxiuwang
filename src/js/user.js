require(['config'],function(){
	require(['jquery'],function(){

		var userName = $('.username span');
		var pic = $('.u-photo img');
		var items = $('.footer ul li');
		var userID = JSON.parse(localStorage.getItem('users') ) || [];
		//console.log(userID);
		$.getJSON('http://datainfo.duapp.com/shopdata/getuser.php?callback=?',{userID:userID},function(data){
			console.log(data);
			userName.html(data[0].userID);
			pic.attr('src',data[0].userimg_url);
		});

	})
})