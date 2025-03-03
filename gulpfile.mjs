import { src, dest, watch, series, parallel } from 'gulp';
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass';
import htmlmin from 'gulp-htmlmin';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';

// Инициализация компилятора SCSS
const sass = gulpSass(dartSass);

// Компиляция SCSS
export function styles() {
    return src('src/scss/**/*.scss') // Следит за всеми SCSS
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
}


// Обработка шрифтов
export function fonts() {
    return src([
        'src/fonts/**/*.{woff,woff2,ttf,eot,otf}',
        'src/fonts/**/*.css',
    ])
        .pipe(dest('dist/fonts'))
        .on('end', () => console.log('Шрифты скопированы в dist/fonts'))
        .pipe(browserSync.stream());
}

export function libs() {
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/@fancyapps/ui/dist/fancybox/fancybox.umd.js',
        'node_modules/aos/dist/aos.js' 
    ])
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}
// Минификация HTML
export function html() {
    return src('src/**/*.html') // Следит за всеми HTML-файлами
        .pipe(htmlmin({ collapseWhitespace: false }))
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}


export function images() {
    return src('src/img/**/*')
        .pipe(dest('dist/img'))
        .pipe(browserSync.stream()); 
}




// Оптимизация JS
export function scripts() {
    return src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream());
}

// Live Server + Watching
export function serve() {
    browserSync.init({
        server: { baseDir: 'dist' },
        notify: false,
        open: true,
    });

    watch('src/scss/**/*.scss', styles);
    watch('src/js/**/*.js', scripts);
    watch('src/**/*.html', html);
    watch('src/img/**/*', images);
    watch('src/fonts/**/*.{woff,woff2,ttf,eot,otf,css}', fonts);
}

export default series(
    parallel(styles, images, scripts, html, fonts, libs),
    serve
);

