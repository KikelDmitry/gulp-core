import { config } from '../config.js';
import del from 'del';

export const clean = () => {
	return del(config.dest + '**', { force: true })
};