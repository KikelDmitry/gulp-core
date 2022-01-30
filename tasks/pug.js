import pkg from 'gulp';
const { src, pipe, dest } = pkg;
import gulpPug from 'gulp-pug';

const pug = () => {
	return src('./')
	.pipe(gulpPug({
		pretty: true,
		basedir: './'
	}))
	.pipe(dest('./dest/'))
	// .pipe(browserSync.stream())
};
export default pug;