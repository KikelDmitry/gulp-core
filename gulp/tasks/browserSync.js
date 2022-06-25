import { config } from '../config.js';
import pkg from 'gulp';
const { src, pipe, dest } = pkg;
import browserSync from 'browser-sync';

export default () => {
	browserSync.init({
		server: {
			baseDir: config.dest,
			directory: true,
		},
		notify: false,
	})
};