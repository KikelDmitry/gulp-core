'use strict';

import { config, globs } from '../config.js';
import { src, dest } from '../gulp.js';
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';

export const images = async () => {
	return src(globs.images)
		.pipe(imagemin([
			gifsicle({ interlaced: true }),
			mozjpeg({ quality: 75, progressive: true }),
			optipng({ optimizationLevel: 5 }),
			svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			}),
			imageminPngquant({
				strip: true,
			}),
		], {
			verbose: true
		}))
		.pipe(dest(config.dest + 'img'))
};