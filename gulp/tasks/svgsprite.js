'use strict';

import { config, globs } from '../config.js';
import { src, dest } from '../gulp.js';
import gulpSvgSprite from 'gulp-svg-sprite';
import cheerio from 'gulp-cheerio';
import svgmin from 'gulp-svgmin';

export const svgsprite = () => {
	return src(globs.sprite)
		.pipe(
			svgmin({
				plugins: ['preset-default'],
			}),
		)
		.pipe(
			cheerio({
				run: function ($) {
					$('[fill]').removeAttr('fill');
					$('[stroke]').removeAttr('stroke');
					$('[style]').removeAttr('style');
				},
				parserOptions: { xmlMode: true },
			}),
		)
		.pipe(
			gulpSvgSprite({
				mode: {
					symbol: {
						sprite: '../sprite.svg', //sprite file name
					},
				},
			}),
		)
		.pipe(dest(config.dest + 'img'));
};
