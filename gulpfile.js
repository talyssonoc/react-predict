var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var umd = require('gulp-umd');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var jsx = require('gulp-react');
var path = require('path');

gulp.task('clean', function () {
  return gulp.src('dist', { read: false })
    .pipe(clean());
});

gulp.task('lint', function() {
  return gulp.src('src/react-autocomplete.jsx')
    .pipe(jsx())
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose: true }));
});

gulp.task('build', ['clean'], function() {
  return gulp.src([
      'src/react-autocomplete.jsx'
    ])
    .pipe(jsx())
    .pipe(concat('react-autocomplete.js'))
    .pipe(umd({
      exports: function(file) {
        return 'AutoComplete';
      },

      namespace: function() {
        return 'AutoComplete';
      },

      dependencies: function() {
        return [
          {
            name: 'react',
            amd: 'react',
            cjs: 'react',
            global: 'React',
            param: 'React'
          },
          {
            name: 'jst9',
            amd: 'jst9',
            cjs: 'jst9',
            global: 'jsT9',
            param: 'jsT9'
          }
        ];
      },

      template: path.join(__dirname, '/src/umdTemplate.js')
    }))
    .pipe(gulp.dest('dist'))
    .pipe(rename('react-autocomplete.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});
