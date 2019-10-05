var gulp = require("gulp");
var clean = require("gulp-clean");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require('gulp-sourcemaps');

const src = {
  sassPath: "assets/sass/**/*.scss",
  jsPath: "assets/js/**/*.js",
  distPath: "assets/dist",
  mapPath: ".",
}

// Compile SASS
gulp.task("sass", () => {
  return gulp
    .src(src.sassPath)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(sourcemaps.write(src.mapPath))
    .pipe(gulp.dest(src.distPath));
});

// Compile JS
gulp.task("js", () => {
  return gulp
    .src([
      "node_modules/jquery/dist/jquery.js",
      "node_modules/bootstrap/dist/js/bootstrap.js",
      src.jsPath,
    ])
    .pipe(sourcemaps.init())
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write(src.mapPath))
    .pipe(gulp.dest(src.distPath));
});

// Watch all files
gulp.task("watch", () => {
  gulp.watch(src.sassPath, ["sass"]);
  gulp.watch(src.jsPath, ["js"]);
});

// Clean output directory
gulp.task("clean", () => {
  return gulp.src(src.distPath + "/*", { read: false }).pipe(clean());
});

// Run dev task on "gulp"
gulp.task("default", ["sass", "js", "watch"]);
