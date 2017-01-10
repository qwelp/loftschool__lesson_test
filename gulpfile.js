"use strict";

var gulp = require('gulp'),
	/*concatCss = require('gulp-concat-css'),*/ // Соединяет файлы в один
	rename = require('gulp-rename'), // Переименовывет
	/*notify = require('gulp-notify'),*/  // Уведомление*
	cleanCSS = require('gulp-clean-css'), // Минифицирует css
	autoprefixer = require('gulp-autoprefixer'), // Добавляет префиксы для разных браузеров
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'), // Сервер
	sass = require('gulp-sass'),
	jade = require('gulp-jade'),
    wiredep = require('wiredep').stream;

// server connect
gulp.task('connect', function() {
	connect.server({
		root: 'app',
		livereload: true
	});
});

//css
gulp.task('scss', function () {
	return gulp.src('scss/style.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(rename("common.css"))
		.pipe(gulp.dest('app/css'))
		.pipe(connect.reload());
});

//html
gulp.task('jade', function() {
	gulp.src('jade/index.jade')
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('app/'))
		.pipe(connect.reload());
});

gulp.task('bower', function () {
    gulp.src('app/index.html')
        .pipe(wiredep({
            directory : "app/bower_components"
        }))
        .pipe(gulp.dest('app'));
});

// watch
gulp.task('watch', function () {
	gulp.watch('scss/*.scss', ['scss']);
	gulp.watch('jade/*.jade', ['jade']);
});

// default
gulp.task('default', ['connect', 'jade', 'scss', 'watch']);