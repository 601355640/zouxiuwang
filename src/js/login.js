require(['config'],function(){
	require(['jquery'],function($,z){
		var ts = $('.tishi');
		var txt = $('.txt input');
		var psw = $('.psw input');
		var xs = $('.s-xs');
		var rem = $('.s-rem');
		var login = $('.login-btn input');
		xs.on('click',function(){

			xs.toggleClass('checked');
		});
		rem.on('click',function(){

			rem.toggleClass('checked');
		});
		$('.content input').focus(function(){
			ts.html('');
		})
		login.click(function(){
			if(txt.val() === ''){
				ts.html('账户名不能为空！！')
				return;
			}
			if(psw.val() === ''){
				ts.html('密码不能为空！！')
				return;
			}
			$.ajax({
					type: 'post',
					url: 'http://datainfo.duapp.com/shopdata/userinfo.php',
					data: {
						status:'login',
						userID: txt.val(),
						password: psw.val()
					},
					success: function(result){
						//console.log(result);
						if(result == 0) {
							ts.html('用户名不存在！！');
							return;
						}
						if(result == 2) {
							ts.html('用户名密码不符！！')
							return;
						}
						if(result ) {
							var userID =txt.val();	
							console.log(userID);
							//console.log(proData);
							localStorage.removeItem('users');
							localStorage.setItem('users',JSON.stringify(userID));			
							//跳转到用户页面				
							location.href = 'user.html';
						}
						
					}
			});

		});
		

	})
})