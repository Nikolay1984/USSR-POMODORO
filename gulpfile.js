var gulp = require("gulp");
var autoprefixer = require("gulp-autoprefixer");
var uncss = require('gulp-uncss-sp');
var csso = require('gulp-csso');
var csscomb = require('gulp-csscomb');
 
gulp.task('workcss:dev',async function() {
  return gulp.src('dist/css/*.css')
    .pipe(csscomb())
    .pipe(gulp.dest('dist/css/'));
}); 


gulp.task('workcss',async function() {
        gulp.src('dist/css/*.css')
        .pipe(uncss({
            html: ['dist/index.html']
        }))
        .pipe(autoprefixer())
        .pipe(csso({
            debug: true
        }))
        .pipe(gulp.dest('app/css'));
});



//gulp.task("build",gulp.series('uncss', 'autoprefixer'));
//
//gulp.task('watch', async function() {
//
//});