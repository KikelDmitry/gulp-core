'use strict';

import { config, globs } from '../config.js';
import { src, dest } from '../gulp.js';
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';
import gulpSharp from 'gulp-sharp-responsive';

export const images = () => {
	return src(globs.images, { encoding: false })
		.pipe(imagemin([
			gifsicle({ interlaced: true }),
			mozjpeg({ quality: 75, progressive: true }),
			optipng({ optimizationLevel: 5 }),
			svgo({
				plugins: [
					{
						name: 'removeViewBox',
						active: true,
					},
					{
						name: 'cleanupIDs',
						active: true,
					},
				]
			}),
			imageminPngquant({
				strip: true,
			}),
		], {
			verbose: true
		}))
		.pipe(gulpSharp(
			{
				includeOriginalFile: true,
				formats: [
					{
						format: 'webp',

					},
					{
						format: 'avif',
					}
				]
			}
		))
		.pipe(dest(config.dest + 'img'))
};