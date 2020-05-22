const gulpfileinclude = require('gulp-file-include');
const { src, dest } = require('gulp') // 匹配所有文件

function fileinclude(cb) {
	console.log('fileinclude')
	src(['src/pages/*.html', '!src/pages/temps/**.html'])
		.pipe(gulpfileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(dest('.tmp'))

	cb()
}

exports.fileinclude = fileinclude