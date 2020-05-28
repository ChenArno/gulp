const { src, dest } = require('gulp')
const babel = require('gulp-babel'); //编译成es5
const browserSync = require('browser-sync').create(); //静态服务器

const js = (cb) => {
	src('src/scripts/*.js')
		.pipe(babel({
			"presets": ['env']
		}))
		.pipe(dest('.tmp'))
		.pipe(browserSync.reload({
			stream: true
		})
		)
	cb()
}


exports.js = js