import { config, globs } from '../config.js';
import { src, dest } from '../gulp.js';
import imagemin from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';

export const images = () => {
	return src(globs.images)
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ quality: 75, progressive: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
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