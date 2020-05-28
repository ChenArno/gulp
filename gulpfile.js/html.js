const gulpfileinclude = require('gulp-file-include');
const { src, dest } = require('gulp') // 匹配所有文件
const browserSync = require('browser-sync').create(); //静态服务器

function fileinclude(cb) {
	src(['src/pages/*.html', '!src/pages/temps/**.html'])
		.pipe(gulpfileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(dest('.tmp/'))
		.pipe(browserSync.reload({
			stream: true
		}))
	cb()
}

exports.fileinclude = fileinclude