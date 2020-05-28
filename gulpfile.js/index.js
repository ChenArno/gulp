const { series, watch, src, parallel, dest } = require('gulp')
const { css } = require('./css')
const { js } = require('./js')
const { fileinclude } = require('./html')
const browserSync = require('browser-sync').create();
const gulpclean = require('gulp-clean')
const wiredep = require('wiredep').stream
const filter = require('gulp-filter')

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
const images = (cb) => {
	src(['src/images/*.+(png| jpg | jpeg | gif | svg)', 'src/images/*/*.+(png| jpg | jpeg | gif | svg)'])
		.pipe(dest('.tmp/images'))
		.pipe(browserSync.reload({
			stream: true
		})
		);
	cb()
}

function autowatch(cb) {
	watch('src/styles/*.less', css)
	watch('sec/scriptes/*.js', js)
	watch('src/pages/*.html', fileinclude)
	cb()
}
// 将bower插件导入到html
function html(cb) {
	src('src/styles/*.less')
		.pipe(filter(file => file.stat && file.stat.size))
		.pipe(wiredep({
			ignorePath: /^(\.\.\/)+/
		}))
		.pipe(dest('dist/styles'));

	src('src/*.html')
		.pipe(wiredep({  // 调用插件wiredep执行方法
			exclude: ['bootstrap-less'],
			ignorePath: /^(\.\.\/)*\.\./
		}))
		.pipe(dest('dist'))
	cb()
}

exports.html = series(html)

exports.serve = series(
	series(parallel(js, css, images), fileinclude, autowatch, serve)
)