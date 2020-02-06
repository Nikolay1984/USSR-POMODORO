var gulp = require("gulp");
var autoprefixer = require("gulp-autoprefixer");
var uncss = require('gulp-uncss-sp');
var csso = require('gulp-csso');
var csscomb = require('gulp-csscomb');
var csslint = require('gulp-csslint');
var useref = require('gulp-useref');
var htmlhint = require("gulp-htmlhint");
var htmlmin = require('gulp-htmlmin');
var babel = require('gulp-babel');
var jscs = require('gulp-jscs');
var uglify = require('gulp-uglify-es').default;

gulp.task('workjs:dev', async function()  {
         gulp.src('dist/js/**/*.js')
        .pipe(jscs({fix: true}))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('workcss:dev',async function() {
     gulp.src('dist/css/**/*.css')
     .pipe(csscomb())
     .pipe(gulp.dest('dist/css/'))
      .pipe(csslint())
      .pipe(csslint.formatter());
});

gulp.task('workhtml:dev',async function() {
        gulp.src('dist/**/*.html')
        .pipe(htmlhint())
        .pipe(htmlhint.reporter());
});

gulp.task('workjs',async function() {
    gulp.src('dist/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify(/* options */))
        .pipe(gulp.dest('app/js'))

});

gulp.task('workhtml',async function() {
    gulp.src('dist/**/*.html')
        .pipe(useref())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('app'));

});

gulp.task('workcss',async function() {
        gulp.src('dist/css/**/*.css')
        .pipe(uncss({
            html: ['dist/index.html']
        }))
        .pipe(autoprefixer())
        .pipe(csso({
            debug: true
        }))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('comb', gulp.parallel('workhtml:dev', 'workcss:dev','workjs:dev'));

gulp.task('watch', async function() {
    gulp.watch('dist/**/*.html',gulp.series('workhtml'));
    gulp.watch('dist/css/**/*.css',gulp.series('workcss'));
    gulp.watch('dist/js/**/*.js',gulp.series('workjs'))
});

// gulp.task("build",gulp.series('uncss', 'autoprefixer'));

