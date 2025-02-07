import gulp from 'gulp';
import log from 'fancy-log';
import del from 'del';
import imagemin, {gifsicle, mozjpeg, optipng, svgo} from 'gulp-imagemin';
import imageResize from 'gulp-image-resize';

global._SRC_PATH = 'exports/';
global._BUID_PATH = 'build/';
global._IMAGES_FORMATS = 'jpg,jpeg,svg,gif';


// Config
let config = {
  mode: 'development'
};

// node env mode production/development
process.env.NODE_ENV = process.env.NODE_ENV || config.mode || 'production';
log.info('Starting task in mode : ' + process.env.NODE_ENV );

/**
 * clean
 */
function clean(){
  return del([
      _BUID_PATH + '**/*.*'
  ]);
}
/**
 * images
 */
function images(cb){
  return gulp.src('./exports/assets/img/**/*.{' + _IMAGES_FORMATS + '}')
        .pipe(imagemin([
          gifsicle({interlaced: true}),
          mozjpeg({quality: 75, progressive: true}),
          optipng({optimizationLevel: 5}),
          svgo({
            plugins: [
              {
                name: 'removeViewBox',
                active: true
              },
              {
                name: 'cleanupIDs',
                active: false
              }
            ]
          })
        ]))
        .pipe(gulp.dest(_BUID_PATH));

  cb();
}
/**
 * scripts
 *
 */
function scripts(cb){
  return gulp.src('./exports/**/*.js')
          .pipe(gulp.dest(_BUID_PATH));
}
/**
 * html
 *
 * https://www.npmjs.com/package/gulp-htmlmin
 */

import htmlmin from 'gulp-htmlmin';

function html(cb) {
  return gulp.src('./exports/**/*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest(_BUID_PATH));
  cb();
}
/**
 * styles
 *
 * http://cssnext.io/postcss/#gulp-postcss
 *
 */
import postcss from 'gulp-postcss';
//var partialImport = require("postcss-partial-import");
import cssnext from 'postcss-cssnext';
// http://putaindecode.io/fr/articles/css/preprocesseurs/cssnext/
function styles(cb) {
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
      .pipe(gulp.dest(_BUID_PATH));
  cb();
}


// https://www.npmjs.com/package/browser-sync
// var browserSync = require('browser-sync').create();
// gulp.task('build', ['styles','images','scripts','html'], function(){
//
// 	browserSync.init({
//         server: "./build"
//     });
// 	gulp.watch('./exports/assets/img/**/*.{jpeg,jpg,png,svg}',['images']);
// 	gulp.watch('./exports/assets/**/*.{css,js}',['styles','scripts']);
// 	gulp.watch('./exports/**/*.html',['html']);
// });
//
// gulp.task('default', ['styles'], function(){
//
// 	gulp.watch('./exports/assets/**/*.css',['styles']);
// });
const build = gulp.series(clean, gulp.parallel(images,scripts,styles,html));

exports.scripts = scripts;
exports.html = html;
exports.styles = styles;
exports.images = images;
exports.build = build;
exports.default = build;
