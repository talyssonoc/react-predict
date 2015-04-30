var path = require('path');

var gulp = require('gulp');

var clean   = require('gulp-clean');
var concat  = require('gulp-concat');
var jest    = require('gulp-jest');
var jshint  = require('gulp-jshint');
var jsx     = require('gulp-react');
var minify  = require('gulp-minify-css');
var rename  = require('gulp-rename');
var sass    = require('gulp-sass');
var uglify  = require('gulp-uglify');
var umd     = require('gulp-umd');

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

gulp.task('build-js', function() {
  return gulp.src('src/react-autocomplete.jsx')
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
          },
          {
            name: 'classNames',
            amd: 'classnames',
            cjs: 'classnames',
            global: 'classNames',
            param: 'classNames'
          },
          {
            name: 'react-onclickoutside',
            amd: 'react-onclickoutside',
            cjs: 'react-onclickoutside',
            global: 'OnClickOutside',
            param: 'OnClickOutside'
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

gulp.task('build-css', function() {
  return gulp.src('src/*.scss')
    .pipe(sass())
    .pipe(concat('react-autocomplete.css'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('react-autocomplete.min.css'))
    .pipe(minify())
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean', 'build-js', 'build-css']);

gulp.task('watch', function() {
  gulp.watch('src/**.jsx', ['build-js']);
  gulp.watch('src/**.scss', ['build-css']);
});

gulp.task('test', ['build-js'], function () {
    return gulp.src('test').pipe(jest({
        scriptPreprocessor: 'support/preprocessor.js',
        unmockedModulePathPatterns: [
            'node_modules/react'
        ],
        testDirectoryName: 'test',
        testPathIgnorePatterns: [
            'node_modules',
            'test/support'
        ],
        moduleFileExtensions: [
            'js'
        ]
    }));
});
