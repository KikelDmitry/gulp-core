'use strict';

//PCKGS
const { src, dest, parallel, series, watch } = require('gulp');

//common
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

//html
const gulpPug = require('gulp-pug');

// css
const gulpSass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');

//js;
const minify = require('gulp-minify');

//bitmap
const gulpImagemin = require('gulp-imagemin');
const imageminPngQuant = require('imagemin-pngquant');
const imageminZopfli = require('imagemin-zopfli');

//svg
const gulpSvgSprite = require('gulp-svg-sprite');
const cheerio = require('gulp-cheerio');
const svgmin = require('gulp-svgmin');


//CONFIG

const config = {
	src: './src/',
	dest: './build/',
};

//server
const server = () => {
	browserSync.init({
		server: {
			baseDir: config.dest
		}
	})
};

//TASKS
const pug = () => {
	return src(config.src + 'pug/*.pug')
		.pipe(gulpPug({
			pretty: true, //deprecated ¯\_(ツ)_/¯
			basedir: './'
		}))
		.pipe(dest(config.dest))
		.pipe(browserSync.stream())
};

const sass = () => {
	return src(config.src + 'scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(gulpSass({
			outputStyle: 'compressed'
		})).on('error', gulpSass.logError)
		.pipe(csso())
		.pipe(postcss([
			autoprefixer()
		]))
		.pipe(sourcemaps.write('.'))
		.pipe(dest(config.dest + 'css'))
		.pipe(browserSync.stream())
};

const scripts = () => {
	return src(config.src + 'js/*.js')
		.pipe(concat('bundle.js'))
		.pipe(minify({
			ext: {
				min: '.min.js'
			}
		}))
		.pipe(dest(config.dest + 'js'))
		.pipe(browserSync.stream())
};

const imagemin = () => {
	return src([
		config.src + 'img/**/*.{png,jpg,jpeg,svg,gif}',
		'!' + config.src + 'img/svg/sprite/**/*.svg'
	])
		.pipe(gulpImagemin([
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
			gulpImagemin.mozjpeg({
				progressive: true,
				quality: 90
			}),
			//svg
			gulpImagemin.svgo({
				plugins: [{
					removeViewBox: false
				}]
			})
		]))
		.pipe(dest(config.dest + 'img'))
};

const svgsprite = () => {
	return src(config.src + 'img/svg/sprite/**/*.svg') // svg files for sprite
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
		.pipe(gulpSvgSprite({
			mode: {
				symbol: {
					sprite: '../sprite.svg'  //sprite file name
				}
			},
		}
		))
		.pipe(dest(config.dest + 'img/svg'));
};

const fonts = () => {
	return src(config.src + 'fonts/*.*')
		.pipe(dest(config.dest + 'fonts'))
};

const watcher = () => {
	watch(config.src + 'pug/**/*.pug', pug)
	watch(config.src + 'scss/**/*.scss', sass)
	watch(config.src + 'js/**/*.js', scripts)
};


const clean = () => {
	return del(config.dest + '**', { force: true })
};

exports.svgsprite = svgsprite;
exports.clean = clean;

//development task
exports.dev = parallel(
	pug,
	sass,
	scripts,
	server,
	watcher
);

//production task
exports.build = series(
	clean,
	parallel(
		pug,
		sass,
		scripts,
		svgsprite,
		imagemin,
		fonts
	)
);