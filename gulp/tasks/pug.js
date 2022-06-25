import { config, globs } from '../config.js';
import pkg from 'gulp';
const { src, pipe, dest } = pkg;
import gulpPug from 'gulp-pug';
import browserSync from 'browser-sync';

export default () => {
	return src(config.src)
		.pipe(gulpPug({
			pretty: true,
			basedir: './'
		}))
		.pipe(dest(config.dest))
	.pipe(browserSync.stream())
};
