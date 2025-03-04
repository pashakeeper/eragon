const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const clean = require('gulp-clean');

// === Компиляция SCSS ===
function styles() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}

// === Перенос HTML ===
function html() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}


// === Перенос JS библиотек ===
function libsJs() {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/@fancyapps/ui/dist/fancybox/fancybox.umd.js',
        'node_modules/aos/dist/aos.js',
        'node_modules/slick-carousel/slick/slick.min.js'
    ])
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
}

// === Очистка `dist` ===
function cleanFiles() {
    return gulp.src('dist/*', { read: false, allowEmpty: true })
        .pipe(clean());
}

// === Перенос JavaScript файлов ===
function scripts() {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
}

// === Перенос Изображений ===
function images() {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
}

// === Перенос Шрифтов ===
function fonts() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.stream());
}



// === Запуск Live-сервера ===
function serve() {
    browserSync.init({
        server: { baseDir: 'dist/' },
        port: 3000,
        notify: false
    });

    gulp.watch('src/scss/**/*.scss', styles);
    gulp.watch('src/js/**/*.js', scripts);
    gulp.watch('src/**/*.html', html);
    gulp.watch('src/img/**/*', images);
    gulp.watch('src/fonts/**/*', fonts);
}

// === Основные задачи ===
gulp.task('build', gulp.series(
    cleanFiles,
    gulp.parallel(styles, scripts, html, images, fonts, libsJs)
));
gulp.task('libs', gulp.series(libsJs));
gulp.task('default', gulp.series('build', serve));
