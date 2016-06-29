'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var minify = require('gulp-minify');
var browserify = require('gulp-browserify');
var server = require('gulp-server-livereload');


//Specify Dependencies
gulp.task('default', ['html', 'css', 'js', 'webserver', 'vendor']);

//html
gulp.task('html', function(){
  gulp.src('./index.html')
   .pipe(gulp.dest('./public'));
});

//scss to css
gulp.task('css', function(){
  gulp.src('./sass/styles.scss')
   .pipe(sass())
   .pipe(gulp.dest('./public/css'));
});

//js
gulp.task('js', function(){
  gulp.src('./js/app.js')
   .pipe(babel({
     presets:['es2015']
   }))
   .pipe(browserify())
   .pipe(gulp.dest('./public/js'));
});


//webserver
gulp.task('webserver', () => {
  gulp.src('./public')
   .pipe(server({
     livereload: true,
     directoryListing: true,
     open: true
   }))
});



//sending node_modules packages you need to public
gulp.task('vendor', function(){
  //underscore
  gulp.src('./node_modules/underscore/underscore-min.js')
    .pipe(gulp.dest('./public/js'));
  //jquery
  gulp.src('./node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('./public/js'));
  //backbone
  gulp.src('./node_modules/backbone/backbone-min.js')
    .pipe(gulp.dest('./public/js'));
})


/////watch to run auto updates
gulp.task('watch', function(){
  gulp.watch('./index.html', ['html'])
  gulp.watch('./sass/*.scss', ['css'])
  gulp.watch('./js/*.js', ['js', 'vendor'])
  gulp.watch('./js/*/*.js', ['js', 'vendor']); //grabbing all js files in deeper folders
})
