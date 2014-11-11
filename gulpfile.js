var gulp = require('gulp')
  , gutil = require('gulp-util')
  , source = require('vinyl-source-stream')
  , browserify = require('browserify')
  , reactify = require('reactify')
  , es6ify = require('es6ify')
;

gulp.task('default', function() {
  var bundler = browserify('./src/index.jsx', { debug: true, extensions: [".jsx"] });
  bundler.transform(reactify, {es6: true});
  bundler.transform(es6ify.configure(/^(?!.*node_modules)+.+\.js(x?)$/));
  bundler.external('react');

  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('react-tags-input.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('test', function() {
  var bundler = browserify('./test/test.jsx', { debug: true, extensions: [".jsx"] });
  bundler.transform(reactify, {es6: true});
  bundler.transform(es6ify.configure(/^(?!.*node_modules)+.+\.js(x?)$/));

  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('react-tags-input.js'))
    .pipe(gulp.dest('dist'));
});