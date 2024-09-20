'use strict';

import { parallel, series } from './gulp/gulp.js';
import { bs } from './gulp/tasks/browserSync.js';
import { clean } from './gulp/tasks/clean.js';
import { watcher } from './gulp/tasks/watcher.js';
import { pug } from './gulp/tasks/pug.js';
import { scss } from './gulp/tasks/scss.js';
import { scripts } from './gulp/tasks/scripts.js';
import { svgsprite } from './gulp/tasks/svgsprite.js';
import { images } from './gulp/tasks/images.js';
import { fonts } from './gulp/tasks/fonts.js';

// prettier-ignore
const build = series(
	clean,
	parallel(
		series(
			scss.prod,
			pug,
		),
		scripts,
		svgsprite,
		images,
		fonts
	),
);

// prettier-ignore
const dev = series(
	clean,
	parallel(
		series(
			scss.dev,
			pug,
		),
		scripts,
		svgsprite,
		images,
		fonts
	),
	parallel(
		bs,
		watcher
	)
);

export { build, dev };
