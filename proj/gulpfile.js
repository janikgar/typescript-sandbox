var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var watchify = require("watchify");
// var tsify = require("tsify");
var fancylog = require("fancy-log");
var paths = {
    pages: ['src/*.html']
};

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
}))

function bundle() {
    return watchedBrowserify.bundle()
                            .pipe(source('bundle.js'))
                            .pipe(gulp.dest("dist"));
}

gulp.task("copy-html", () => {
    return gulp.src(paths.pages)
               .pipe(gulp.dest("dist"));
});

// gulp.task("default", bundle);

gulp.task("default", gulp.parallel("copy-html"), bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", fancylog);