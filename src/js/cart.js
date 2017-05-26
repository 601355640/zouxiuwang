require(['config'],function(){
	require(['jquery','iscroll'],function($,IScroll){

		var cart = {
			proNum : $('.pro-num span'),
			totalMoney : $('.total-money em'),
			proList : $('.pro-list'),
			userID:JSON.parse(localStorage.getItem("users")) || [],
			init:function(){
				var _this = this;
				$.getJSON('http://datainfo.duapp.com/shopdata/getCar.php?callback=?',{userID:this.userID},function(data){
					//console.log(data);
					_this.proNum.html(data.length);
					var str = '';
					for(var i =0;i<data.length;i++){
						str += `<li class="goods" data-id="${data[i].goodsID}">
						<dl>	
							<dt>
								<img src="${data[i].goodsListImg}">
							</dt>
							<dd>	
								<p class="p-name">${data[i].goodsName}</p>
								<div class="p-type">${data[i].className}</div>
								<div class="p-price">单价 : <span>¥<em class="goods-price">${data[i].price}</em></span></div>
								<div class="p-number">
									<p>数量 :</p> 
									<div class="p-contro">
										<div class="btn dec-btn">-</div>
										<div class="text-num">
											<input class="txt" readOnly type="text" value="${data[i].number}">
										</div>
										<div class="btn add-btn">+</div>
									</div>
								</div>
							</dd>
							<div class="delete"></div>
						</dl>
						</li>`;
					}
					_this.proList.html(str);
					_this.handleNum();
				});
				this.increase();
				this.decrease();
				this.deletePro();

				
			},
			//更新商品数量；
			addGoodsNumber:function(goodsID,num){
				$.get(
					'http://datainfo.duapp.com/shopdata/updatecar.php?callback=?',
					{
						userID:this.userID,
						goodsID:goodsID,
						number: num
					},
					function(data){
						//console.log(data);
					}
				)
			},
			//数量增加
			increase: function(){
				var _this = this;
				this.proList.on('click','.add-btn',function(){
					var num = parseInt(  $(this).prev().find('.txt').val() );
					//console.log(num);
					num++;
					$(this).prev().find('.txt').val(num);
					_this.handleMoney($(this),num)
					_this.handleNum();
				});
			},
			//数量减少
			decrease: function(){
				var _this = this;
				this.proList.on('click','.dec-btn',function(){
					var num = parseInt( $(this).next().find('.txt').val() );
					if(num <= 1) return;
					num--;
					$(this).next().find('.txt').val(num);
					_this.handleMoney($(this),num)
					_this.handleNum();
				});
			},
			
			//处理总数
			handleMoney: function(obj,num){
				var id = obj.parents('.goods').data('id');
				//console.log(obj.parents('.goods'));
				this.addGoodsNumber(id,num);
			},
			//处理总价
			handleNum : function(){
				var totalMoney = 0;
				//遍历的商品
				$('.goods').each(function(){
					var id = $(this).data('id');
					var m = $(this).find('.goods-price').html()*$(this).find('.txt').val();
					totalMoney += parseFloat( m );

				});

				$('.t-m').html( totalMoney.toFixed(2) );
			},
			//删除；
			deletePro:function(){
				var _this = this;
				this.proList.on('click','.delete',function(){
					if(confirm('确定删除宝贝吗？') ){
						$(this).parents('.goods').remove();
						//从数据库删除
						var id = $(this).parents('.goods').data('id');
						_this.addGoodsNumber(id,0);
						var n = parseInt( _this.proNum.html() );
						n--;
						_this.proNum.html(n);
						_this.handleNum();
					}
				});
			}
		};
		cart.init();

		
	})
})