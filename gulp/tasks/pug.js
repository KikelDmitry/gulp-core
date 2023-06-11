'use strict';

import { config, globs } from '../config.js';
import { src, dest } from '../gulp.js';
import gulpPug from 'gulp-pug';
import browserSync from 'browser-sync';
import { buildTree } from './dirTree.js';

export const pug = () => {
	return src(globs.pug)
		.pipe(gulpPug({
			pretty: true,
			basedir: './',
			locals: {
				srcTree: buildTree,
			}
		}))
		.pipe(dest(config.dest))
		.pipe(browserSync.stream())
};
