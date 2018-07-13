var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env'),
    supertest = require('supertest');

gulp.task('default', function () {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT:8000
        },
        ignore: ['./node_modules/**']
    })
        .on('restart', function () {
            console.log('Restarting');
        });
});

gulp.task('test', function () {
    env({vars: {ENV:'Test'}});
    return gulp.src('./Tests/*.js', {read: false})
        .pipe(gulpMocha({reporter: 'spec'}));
    // done(); // gulp version 4 and above - we need to terminate the async call
});



