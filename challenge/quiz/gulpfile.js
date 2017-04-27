var gulp = require("gulp");
var pug = require("gulp-pug");
var ts = require("gulp-typescript");
var less = require("gulp-less");

gulp.task("default", ["views", "ts", "less"]);

gulp.task("views", () => {
    return gulp.src("src/views/*.pug")
        .pipe(pug({
            // Your options in here. 
        })).pipe(gulp.dest("public/html"))
});

gulp.task("ts", () => {
    return gulp.src("src/scripts/**/*.ts")
        .pipe(ts({
            module: "amd",
            target: "es6",
            removeComments: true,
            preserveConstEnums: true,
            sourceMap: true,
            allowJs: true
        }))
        .pipe(gulp.dest("./public/build/"));
})

gulp.task("less", () => {
    return gulp.src("src/less/**/*.less")
        .pipe(less({

        }))
        .pipe(gulp.dest("./public/css"));
});