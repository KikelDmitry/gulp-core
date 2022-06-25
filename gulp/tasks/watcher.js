import { config, globs } from '../config.js';
import { watch } from '../gulp.js';
import { pug } from './pug.js';
import { scss } from './scss.js';
import { scripts } from './scripts.js';
import { images } from './images.js';
import { svgsprite } from './svgsprite.js';
import { fonts } from './fonts.js';

export const watcher = () => {
	watch(config.src + 'pug/**/*.pug', pug)
	watch(config.src + 'scss/**/*.scss', scss)
	watch(globs.js, scripts)
	watch(globs.images, images)
	watch(globs.sprite, svgsprite)
	watch(globs.fonts, fonts)
};