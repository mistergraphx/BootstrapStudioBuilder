var gulp = require("gulp");

var imagemin = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');
gulp.task('images', function () {
    return gulp.src('./exports/assets/img/**/*.{jpg,jpeg,png,gif,svg}')
        .pipe(imagemin([
				imagemin.svgo({plugins: [{removeViewBox: true}]})
		], {
			verbose: true
		}))
        .pipe(imageResize({
          width : 1200,
          height : 1200,
          crop : false,
          upscale : false
        }))
        .pipe(gulp.dest('./build/assets/img/'));
});

gulp.task('scripts', function(){
	return gulp.src('./exports/**/*.js')
	.pipe(gulp.dest('./build'));
});

// https://www.npmjs.com/package/gulp-htmlmin
var htmlmin = require('gulp-htmlmin');
gulp.task('html', function(){
	return gulp.src('./exports/**/*.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('./build'));
});

// http://cssnext.io/postcss/#gulp-postcss
var postcss = require("gulp-postcss");
//var partialImport = require("postcss-partial-import");
var cssnext = require("postcss-cssnext");
// http://putaindecode.io/fr/articles/css/preprocesseurs/cssnext/
gulp.task('styles', function () {
    return gulp.src('./exports/**/*.css')
        .pipe(postcss([
			require("postcss-import")(),
			// https://github.com/postcss/postcss-url
			require("postcss-url")(),
			require("postcss-cssnext")({
				browsers: ["> 1%","last 2 versions"],
				features: {
					customProperties: {
						// true: les var() sont conservée pour les navigateur les supportant et calculé en fallback
						// 'computed' les var() sont calculées mais root est conservé
						preserve: "computed" 
					}
				}
			}),
		]))
        .pipe(gulp.dest('./build'));
});

// https://www.npmjs.com/package/browser-sync
var browserSync = require('browser-sync').create();
gulp.task('build', ['styles','images','scripts','html'], function(){
	
	browserSync.init({
        server: "./build"
    });
	gulp.watch('./exports/assets/img/**/*.{jpeg,jpg,png,svg}',['images']);
	gulp.watch('./exports/assets/**/*.{css,js}',['styles','scripts']);
	gulp.watch('./exports/**/*.html',['html']);
});

gulp.task('default', ['styles'], function(){

	gulp.watch('./exports/assets/**/*.css',['styles']);
});