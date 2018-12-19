var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var spawn = require('child_process').spawn;
var node, env = process.env;

// --------------------- Build CSS --------------------- //
gulp.task('build-sass', function () {
	gulp.src(path.join(__dirname, '/scss/*.scss'))
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(path.join(__dirname, '/scss/temp')))			//build them here first
		.pipe(concat('main.css'))										//concat them all
		//.pipe(gulp.dest(path.join(__dirname, '/public/css')))
		.pipe(cleanCSS())												//minify
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest(path.join(__dirname, '/public/css')));			//dump it here
});

// -------------------- Run Marbles -------------------- //
gulp.task('server', function (a, b) {
	if (node) node.kill();
	node = spawn('node', ['app.js'], { env: env, stdio: 'inherit' });	//command, file, options
});

// -------------- Watch for File Changes --------------- //
gulp.task('watch-sass', ['build-sass'], function () {
	gulp.watch(path.join(__dirname, '/scss/*.scss'), ['build-sass']);
});
gulp.task('watch-server', function () {
	gulp.watch(path.join(__dirname, '/routes/**/*.js'), ['server']);
	gulp.watch([path.join(__dirname, '/utils/fc_wrangler/*.js')], ['server']);
	gulp.watch([path.join(__dirname, '/utils/*.js')], ['server']);
	gulp.watch(path.join(__dirname, '/app.js'), ['server']);
});


// ---------------- Runnable Gulp Tasks ---------------- //
gulp.task('marbles_local', ['env_local', 'watch-sass', 'watch-server', 'server']);	//run with command `gulp marbles_local` for a local network

// Local Fabric via Docker Compose
gulp.task('env_local', function () {
	env['creds_filename'] = 'marbles_local.json';
});
