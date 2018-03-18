const gulp   = require('gulp');
const pug    = require('gulp-pug');
const stylus = require('gulp-stylus');
const path   = require('path');

const public = './public';
const dir = {
	stylus: './frontend/css/index.styl',
	css   : path.join(public, 'css'),
	tpl   : './frontend/tpl/*.pug'
};

gulp.task('stylus', () => {
	return gulp.src(dir.stylus)
		.pipe(stylus())
		.pipe(gulp.dest(dir.css));
});

gulp.task('templates', () => {
	return gulp.src(dir.tpl)
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(public));
});

gulp.task('default',gulp.parallel('templates', 'stylus'));