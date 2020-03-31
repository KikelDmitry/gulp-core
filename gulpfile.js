'use strict';

//PCKGS
var gulp = require('gulp'),

    //COMMON
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    notify = require('gulp-notify'),

    //HTML
    pug = require('gulp-pug'),

    //CSS
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),

    //JS
    minify = require('gulp-minify'),


    //IMG
    //svg
    svgSprite = require('gulp-svg-sprite'),
    cheerio = require('gulp-cheerio'),
    svgMin = require('gulp-svgmin'),

    //GLOBS
    src = 'src/',
    dest = 'build/';

//TASKS
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: dest
        }
    })
})
//html
gulp.task('pug', function () {
    return gulp.src(src + 'pug/**/!(_)*.pug')
        .pipe(pug({
            pretty: true, //deprecated ¯\_(ツ)_/¯
            basedir: './'
        }))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.stream())
});
//css
gulp.task('css', function() {
    return gulp.src(src + 'scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        })).on('error', sass.logError)
        .pipe(csso())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest + 'css'))
        .pipe(browserSync.stream())
})
//js
gulp.tasks('scripts', function(done) {
    return gulp.src(src + 'js/*.js')
        .pipe(concat('bundle.js'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest(dest + 'js'))
        .pipe(browserSync.stream())    
    done();
})
//img
gulp.task('svgSprite', function () {
    return gulp.src(src + 'img/svg/sprite/**/*.svg') // svg files for sprite
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite.svg"  //sprite file name
                }
            },
        }
        ))
        .pipe(gulp.dest(dest + 'img/svg'));
});


//DEV TASKS
gulp.task('dev', gulp.parallel('pug', 'css'))