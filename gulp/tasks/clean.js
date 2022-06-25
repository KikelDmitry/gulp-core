import { config } from '../config.js';
import del from 'del';

export default () => {
	return del(config.dest + '**', { force: true })
};