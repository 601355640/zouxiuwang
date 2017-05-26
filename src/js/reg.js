require(['config'],function(){
	require(['jquery','layer'],function(){
		layer.config({
			 path: 'js/public/layer/'
		});

		var regBtn = $('.reg-btn');
		var txt = $('.txt input');
		var psw = $('.psw-first input');
		var psw1 = $('.psw-sure input');
		var ts = $('.tishi');
		$('.content input').focus(function(){
			ts.html('');
		})

		var  regStatus = {
			uname: false,
			psw: false,
		};
		// 验证用户名是否合法
		txt.blur(function(){
			var uname = txt.val();
			var reg1 = /^1[34578]\d{9}$/;
			var reg2 = /^[234567890a-zA-Z]+[a-zA-Z\d]{3,19}$/;
			regStatus.uname = true;
			if(uname.length<4 || uname.length>20){
				ts.html('账号长度在4至20个字符之间');
				regStatus.uname = false;
				return;
			}
			if(!reg1.test(uname) && !reg2.test(uname)){
				ts.html('账号名只能为手机号/第一位非数字1的字母数字组合');
				regStatus.uname = false;
				return;
			}

		});
		//验证密码是否合法
		psw.blur(function(){
			var pswd = psw.val();
			var reg = /^[a-zA-Z\d]{6,12}$/;
			regStatus.psw = true;
			if(!reg.test(pswd)){
				ts.html('密码由英文字母、数字组成,长度6-12位');
				regStatus.psw = false;
				return;
			}
		});
		//验证两次密码输入是否一致
		psw1.blur(function(){
			var pswd1 = psw1.val();
			regStatus.psw = true;
			if(pswd1 !== psw.val()){
				ts.html('两次密码输入不一致');
				regStatus.psw = false;
				return;
			}
		});
		//点击注册
		regBtn.click(function(){
			for(var i in regStatus){
				//如果找到某个输入不合法，做出相应的提示并返回
				if(!regStatus[i]){
					ts.html('部分数据不合法');
					return;
				}
			};
			$.ajax({
				type:'post',
				url:'http://datainfo.duapp.com/shopdata/userinfo.php',
				data:{
				 	status:'register',
					userID: txt.val(),
					password:psw.val()
				},
				success:function(result){
					console.log(result);
					if(result == 0){
						ts.html('用户名已存在');
					}
					if(result == 1){
						layer.confirm('注册成功，是否跳转到登录页面？', {
						  btn: ['确定'] //按钮
						}, function(){
						  location.href = 'login.html';//跳转
						});
						
					}
				}
			});
		})
		

	})
})