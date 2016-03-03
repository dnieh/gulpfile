var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var scssPaths = [
    './scss/**/*.scss',
    './scss/bootstrap/*.scss',
    './scss/app.scss',
];

var reactPaths = [
    './react/**/*.jsx'
];

gulp.task('sass', function() {
    gulp.src(scssPaths)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('es6-react', function() {
    return browserify({
        entries: './react/app.jsx',
        extensions: ['.js', '.jsx'],
        debug: true
    })
        .transform(babelify, {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./js'));
});

gulp.task('watch', function() {
    gulp.watch(scssPaths, ['sass']);
    gulp.watch('./react/**/*.jsx', ['es6-react']);
});
