var gulp = require('gulp');
//编译css
var css = require('gulp-sass-china'),
	notify = require('gulp-notify'),
    plumber = require('gulp-plumber');
gulp.task('cssMin',function(){
	gulp.src('src/scss/*.{sass,scss}')
	.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
	}))
	.pipe( css ( {outputStyle:'expanded'} ))
	.pipe( gulp.dest('src/css') );
})
// 监听css
gulp.task('scss',function(){
	gulp.watch('src/scss/*.{scss,sass}',['cssMin']);
})
//开启服务
var connect = require('gulp-connect');
gulp.task('server',function(){
	connect.server({
		root:'src',
		livereload: true
	})
})
//自动刷新  （服务+监听）
gulp.task('watch',function(){
	gulp.watch(['src/*.html','src/css/*.css','src/js/*'],function(){
		gulp.src('src/*.html').pipe( connect.reload() )
	})
});
gulp.task('server-watch',['server','watch','scss']);





