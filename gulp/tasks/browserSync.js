'use strict';

import { config } from '../config.js';
import browserSync from 'browser-sync';

export const bs = () => {
	browserSync.init({
		server: {
			baseDir: config.dest,
			directory: true,
		},
		notify: false,
	})
};