'use strict';

import { config, globs } from '../config.js';
import { src, dest } from '../gulp.js';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import browserSync from 'browser-sync';

export const scss = {
	dev() {
		return src(globs.scss)
			.pipe(sourcemaps.init())
			.pipe(sass({
				outputStyle: 'expanded'
			}))
			.on('error', sass.logError)
			.pipe(postcss([
				autoprefixer(),
				csso()
			]))
			.pipe(sourcemaps.write('.'))
			.pipe(dest(config.dest + 'css'))
			.pipe(browserSync.stream())
			
		},
		prod() {
			return src(globs.scss)
				.pipe(sass({
					outputStyle: 'expanded'
				}))
				.on('error', sass.logError)
				.pipe(postcss([
					autoprefixer(),
					csso()
				]))
				.pipe(dest(config.dest + 'css'))			
	}
}