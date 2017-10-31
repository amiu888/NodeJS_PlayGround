var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');
var  babel = require('gulp-babel');
var sourceMaps = require('gulp-sourcemaps');
var gulpSequence = require('gulp-sequence');
var runSequence = require('run-sequence');
// var gulpCopy = require('gulp-copy');
// var otherGulpFunction = require('gulp-other-function');
// var sourceFiles = ['src/*', 'src/*.txt'];
// var destination = 'dist/';

var jsFile = ['*.js', 'src/**/*.js'];

gulp.task('style', function() {
    return gulp.src(jsFile)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', function() {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./public/css/*.css',
                              './public/js/*.js'], {read: false});
    var injectOptions = {
        ignorePath: '/public'
    };
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };
    return gulp.src('./src/views/*.jade') //using jade temple. if using htmnl, just change it *.html
        .pipe(wiredep(options))
        .pipe(inject(injectSrc,injectOptions))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('build', function() {
    return gulp.src('src/**/*.js')//get all js files under the src
        .pipe(sourceMaps.init()) //initialize source mappingdls
        .pipe(babel()) //transpile
        .pipe(sourceMaps.write('.')) //write source maps
        .pipe(gulp.dest('dist'));//pipe to the destination folder
});

gulp.task('serve',  function() {
    var options = {
        script: 'dist/index.js',
        deleyTime:1,
        env:{
            'PORT': 5000
        },
        watch: jsFile
    };
    return nodemon(options)
    .on('restart',function(ev) {
        console.log('Restarting....');
    });
});

gulp.task('dev', function(done) {
    runSequence('style', 'inject','build', 'serve', function() {
        console.log('Run something else');
        done();
    });
});