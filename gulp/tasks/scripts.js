'use strict';

import { config, globs } from '../config.js';
import { src, dest } from '../gulp.js';
import concat from 'gulp-concat';
import minify from 'gulp-minify';
import browserSync from 'browser-sync';

export const scripts = () => {
	return src(globs.js)
		.pipe(concat('bundle.js'))
		.pipe(
			minify({
				ext: {
					min: '.min.js',
				},
			}),
		)
		.pipe(dest(config.dest + 'js'))
		.pipe(browserSync.stream());
};
