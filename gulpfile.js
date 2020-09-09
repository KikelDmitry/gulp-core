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
const csso = require('postcss-csso');

//js
const minify = require('gulp-minify');

//bitmap
const imagemin = require('gulp-imagemin');

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

const scss = () => {
	return src(config.src + 'scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(gulpSass({
			outputStyle: 'expanded'
		}))
		.on('error', gulpSass.logError)
		.pipe(postcss([
			autoprefixer(),
			csso()
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

const images = () => {
	return src([
		config.src + 'img/**/*.{png,jpg,jpeg,svg,gif}',
		'!' + config.src + 'img/sprite/**/*.svg'
	])
		.pipe(imagemin({
			plugins: [
				imagemin.gifsicle({ interlaced: true }),
				imagemin.mozjpeg({ quality: 75, progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({
					plugins: [
						{ removeViewBox: true },
						{ cleanupIDs: false }
					]
				})

			],
			verbose: true
		}))
		.pipe(dest(config.dest + 'img'))
};
exports.images = images;


const svgsprite = () => {
	return src(config.src + 'img/sprite/**/*.svg') // svg files for sprite
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
		.pipe(dest(config.dest + 'img'));
};
exports.svgsprite = svgsprite;

const fonts = () => {
	return src(config.src + 'fonts/*.*')
		.pipe(dest(config.dest + 'fonts'))
};

const watcher = () => {
	watch(config.src + 'pug/**/*.pug', pug)
	watch(config.src + 'scss/**/*.scss', scss)
	watch(config.src + 'js/**/*.js', scripts)
};


const clean = () => {
	return del(config.dest + '**', { force: true })
};
exports.clean = clean;

//development task
exports.dev = series(
	parallel(
		pug,
		scss,
		scripts,
		svgsprite,
		fonts,
	),
	parallel(
		server,
		watcher
	)
);

//production task
exports.build = series(
	clean,
	parallel(
		pug,
		scss,
		scripts,
		svgsprite,
		images,
		fonts
	)
);