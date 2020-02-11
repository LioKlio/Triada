"use strict";

import gulp from "gulp";
import { paths } from "../paths";

import plumber from "gulp-plumber";
import babel from "gulp-babel";
import rename from "gulp-rename";
import uglify from "gulp-uglify";
import debug from "gulp-debug";
import browsersync from "browser-sync";


gulp.task("scripts", () => {
    return gulp.src(paths.scripts.src)
        .pipe(plumber()) // отслеживание ошибок
        .pipe(gulp.dest(paths.scripts.dist))
        .pipe(babel())
        .pipe(rename({ suffix: ".babel" }))
        .pipe(gulp.dest(paths.scripts.dist))
        .pipe(rename({ suffix: ".min" }))
        .pipe(uglify()) // минимизируем js
        .pipe(gulp.dest(paths.scripts.dist))
        .pipe(debug({
            "title": "JS files"
        }))
        .on("end", browsersync.reload);
});
