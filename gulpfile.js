const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const concat = require('gulp-concat');
var clean = require('gulp-clean');

function htmlPipe() {
    return gulp.src(['src/*.html', 'src/**'])
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
}

function compileSass() {
    return gulp.src([
        'src/scss/**/*.scss',
    ])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}

function movecss() {
    return gulp.src(['src/scss/**/*.css'])
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}

function libsJs() {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/aos/dist/aos.js',
        'node_modules/swiper/swiper-bundle.min.js'
    ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('src/js'))
}

function libsCSS() {
    return gulp.src([
        'node_modules/aos/dist/aos.css',
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/swiper/swiper-bundle.min.css'
    ])
        .pipe(concat('libs.css'))
        .pipe(gulp.dest('src/scss'))
}

function cleanFiles() {
    return gulp.src([
        'dist/css/**/*',
        'dist/js/**/*',
        'dist/img/**/*',
        'src/scss/**/*.scss',
        'src/scss/**/*.css',
        '!src/scss/**/bootstrap.min.css',
        '!src/scss/style.scss',
        '!src/scss/media.scss',
    ])
        .pipe(clean({force: true}))


}

function javaScript() {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
}

function images() {
    return gulp.src('src/img/*')
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
}

function browserSyncInit(done) {
    browserSync.init({
        server: {
            baseDir: 'dist/',
        },
        port: 3000,
    }, done);
}

function fonts() {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.stream());
}

function dataJson() {
    return gulp.src('src/data/*')
        .pipe(gulp.dest('dist/data'))
        .pipe(browserSync.stream());
}

// function gulpWatch() {
//     return watch('gulpfile.js',gulp.parallel(cleanFiles,libsCSS, libsJs, images,watchFiles) ,browserSync.reload());
// }


function watchFiles() {
    gulp.watch('src/scss/*', gulp.parallel(compileSass, movecss));
    gulp.watch('src/js/*.js', javaScript);
    gulp.watch('src/*.html', htmlPipe);
    gulp.watch('src/img/**/*', images);
    gulp.watch('src/fonts/*', fonts);
    gulp.watch('src/data/*',dataJson);
}

// Добавлен gulpWatch в массив задач для watchFiles
gulp.task('default', gulp.parallel(browserSyncInit, watchFiles));
gulp.task('sass', compileSass);
gulp.task('move', gulp.parallel(fonts, images, htmlPipe));
gulp.task('libs', gulp.parallel(libsJs, libsCSS));
gulp.task('cleanfile', cleanFiles);
