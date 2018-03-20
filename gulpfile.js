const gulp    = require('gulp');
const pug     = require('gulp-pug');
const stylus  = require('gulp-stylus');
const watch   = require('gulp-watch');
const newer   = require('gulp-newer');
const notify  = require('gulp-notify');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const path    = require('path');
const fs      = require('fs');

const public   = './public';
const frontend = './frontend';
const dir = {
	stylus : './frontend/css/index.styl',
	css    : path.join(public, 'css'),
	tpl    : './frontend/tpl/*.pug',
	allTpl : './frontend/tpl/**/*',
	img    : './frontend/images/*.*',
	distImg: path.join(public, 'images'),
};

gulp.task('images', () => {
	return gulp.src(dir.img, {since: gulp.lastRun('images')})
		.pipe(newer(dir.distImg))
		.pipe(gulp.dest(dir.distImg));
});

gulp.task('stylus', () => {
	return gulp.src(dir.stylus)
		.pipe(stylus())
		.pipe(plumber())
		.on('error', notify.onError((error) => {
			return {
				title: 'Styles',
				message: error.message
			};
		}))
		.pipe(gulp.dest(dir.css));
});

gulp.task('templates', () => {
	return gulp.src([dir.tpl])
		.pipe(pug({
			pretty: true
		}))
		.pipe(plumber())
		.on('error', notify.onError((error) => {
			return {
				title: 'Pug template',
				message: error.message
			};
		}))
		.pipe(gulp.dest(public));
});

gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: 'public',
			port   : 5000
		}
	});

	browserSync.watch('./public/**/*.*').on('change', browserSync.reload);
});

gulp.task('watch',() => {
	gulp.watch(dir.tpl, gulp.series('templates'));
	gulp.watch(dir.tpl, gulp.series('stylus'));
});

gulp.task('default', gulp.series(gulp.parallel('templates', 'stylus', 'images'), gulp.parallel('watch')));