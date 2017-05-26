/*
	配置文件
*/
require.config({
	paths: {
		'jquery':'lib/jquery-1.11.3',
		'jquery.cookie': 'public/jquery.cookie',
		'layer': 'public/layer/layer',
		'swiper':'public/swiper/swiper.min',
		'iscroll':'lib/iscroll'

	},
	shim: {
		'layer': ['jquery'],
		'swiper':['jquery']
	}
})