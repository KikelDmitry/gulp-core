'use strict';

import { config, globs } from '../config.js';
import { src, dest } from '../gulp.js';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import sassGlob from 'gulp-sass-glob';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import browserSync from 'browser-sync';

export const scss = {
	dev() {
		return src(globs.scss)
			.pipe(sassGlob())
			.pipe(sourcemaps.init())
			.pipe(
				sass({
					outputStyle: 'expanded',
				}),
			)
			.on('error', sass.logError)
			.pipe(postcss([autoprefixer()]))
			.pipe(sourcemaps.write('.'))
			.pipe(dest(config.dest + 'css'))
			.pipe(browserSync.stream());
	},
	prod() {
		return src(globs.scss)
			.pipe(sassGlob())
			.pipe(
				sass({
					outputStyle: 'expanded',
				}),
			)
			.pipe(postcss([autoprefixer(), csso()]))
			.pipe(dest(config.dest + 'css'));
	},
};
