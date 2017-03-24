var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');


//Write a gulpfile.js, with one task called bundle, 
//which takes in src/App.js as its source, transforms it 
//using presets-react, bundles it, and writes out bundle.js 
//in the static directory.


gulp.task('bundle', function(){
	return browserify('src/App.js')
	.transform('babelify', {presets: 'react'})
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(gulp.dest('static/'));
});

gulp.task ('watch', function(){

	var b = browserify({
		entries: ['src/App.js'],
		cache: {}, packageCache: {},
		plugin: [watchify]
	});

	b.on ('update', makeBundle);

	function makeBundle(){
		b.transform('babelify', {presets: 'react'})
		.bundle()
		.on('error', function(err){
			console.error(err.message);
			console.error(err.codeFrame);
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('static/'));
	console.log("Bundle updated, success");
	}

	makeBundle();

	return b;
});

gulp.task('default', ['watch']);