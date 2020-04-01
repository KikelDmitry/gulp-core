'use strict';

//PCKGS
var gulp = require('gulp'),

    //COMMON
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    notify = require('gulp-notify'),
    del = require('del'),

    //HTML
    pug = require('gulp-pug'),

    //CSS
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),

    //JS
    minify = require('gulp-minify'),


    //IMG
    //bitmap
    imagemin = require('gulp-imagemin'),
    imageminPngQuant = require('imagemin-pngquant'),
    imageminZopfli = require('imagemin-zopfli'),

    //svg
    svgSprite = require('gulp-svg-sprite'),
    cheerio = require('gulp-cheerio'),
    svgmin = require('gulp-svgmin'),

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
});

//html
gulp.task('pug', function () {
    return gulp.src(`${src}pug/**/!(_)*.pug`)
        .pipe(pug({
            pretty: true, //deprecated ¯\_(ツ)_/¯
            basedir: './'
        }))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.stream())
});

//css
gulp.task('css', function() {
    return gulp.src(`${src}scss/**/*.scss`)
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
        .pipe(gulp.dest(`${dest}css`))
        .pipe(browserSync.stream())
});

//js
gulp.task('scripts', function() {
    return gulp.src(`${src}js/*.js`)
        .pipe(concat('bundle.js'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest(`${dest}js`))
        .pipe(browserSync.stream())    
});

//img
gulp.task('imagemin', function () {
    return gulp.src([`${src}img/**/*.{png,jpg,jpeg,svg,gif}`, `!${src}img/svg/sprite/**/*.svg`])
        .pipe(imagemin([
            //png
            imageminPngQuant({
                speed: 1,
                quality: [0.95, 1] //lossy settings
            }),
            imageminZopfli({
                more: true
                // iterations: 50 // very slow but more effective
            }),
            //jpg
            imagemin.mozjpeg({
                progressive: true,
                quality: 90
            }),
            //svg
            imagemin.svgo({
                plugins: [{
                    removeViewBox: false
                }]
            })
        ]))
        .pipe(gulp.dest(`${dest}img`))
});
gulp.task('svgsprite', function () {
    return gulp.src(`${src}img/svg/sprite/**/*.svg`) // svg files for sprite
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
        .pipe(gulp.dest(`${dest}img/svg`));
});

//fonts
gulp.task('fonts', function() {
    return gulp.src(`${src}fonts/*.*`)
        .pipe(gulp.dest(`${dest}fonts`))
})


//WATCH
gulp.task('watch', function() {
    //css
    gulp.watch(`${src}scss/**/*.scss`)
})

//MAINTAIN

gulp.task('clean', function() {
    return del(`${dest}**`, {force: true})
})

//DEV TASKS
gulp.task('dev', gulp.parallel('pug', 'css'));

gulp.task('build', gulp.series('clean', 'pug', 'css', 'scripts', 'svgsprite', 'imagemin', 'fonts'));