const { series, watch, src } = require('gulp')
const { css } = require('./css')
const { fileinclude } = require('./html')
const browserSync = require('browser-sync').create();
const gulpclean = require('gulp-clean')

function clean(cb) {
	src(['.tmp', 'dist'], { allowEmpty: true })
		.pipe(gulpclean())
	cb()
}

function serve(cb) {
	browserSync.init({
		notify: false,
		port: 9000,
		browser: ["chrome"],
		open: "local",
		server: {
			baseDir: ['.tmp'], // 在 .tmp 目录下启动本地服务器环境，自动启动默认浏览器  
			routes: {
				'/bower_components': 'bower_components'
			}
		}
	});
	cb()
}

function autowatch(cb) {
	watch('src/styles/*.less', css)
	watch('src/pages/*.html', fileinclude)
	cb()
}

exports.serve = series(
	clean,
	series(serve, autowatch)
)