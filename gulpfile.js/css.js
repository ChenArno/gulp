const { src, dest } = require('gulp');

const less = require('gulp-less');
// dest 创建一个用于将 Vinyl 对象写入到文件系统的流。
function css(cb) {
	src('src/styles/*.less', { sourcemaps: true })
		.pipe(less())
		.pipe(dest('dist/styles/css', { sourcemaps: true }))
	cb()
}

exports.css = css