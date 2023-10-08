'use strict';

import { config, globs } from '../config.js';
import { src, dest } from '../gulp.js';
import gulpPug from 'gulp-pug';
import browserSync from 'browser-sync';

export const pug = () => {
	return src(globs.pug)
		.pipe(gulpPug({
			pretty: true,
			basedir: './',
			locals: {
				// globalPugVariables
			}
		}))
		.pipe(dest(config.dest))
		.pipe(browserSync.stream())
};
