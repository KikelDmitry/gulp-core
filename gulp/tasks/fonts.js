import { config, globs } from '../config.js';
import { src, dest } from '../gulp.js';

export const fonts = () => {
	return src(globs.fonts)
		.pipe(dest(config.dest + 'fonts'))
};