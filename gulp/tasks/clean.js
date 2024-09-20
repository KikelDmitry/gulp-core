import { config } from '../config.js';
import { deleteAsync } from 'del';

export const clean = () => {
	return deleteAsync(config.dest + '**', { force: true });
};
