"use strict";

import gulp from "gulp";
import { paths } from "../paths";
import pug from "gulp-pug";
import browsersync from "browser-sync";

gulp.task("pug", () => {
    return gulp.src(paths.pug.src)
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(paths.pug.dist))
        .pipe(browsersync.stream());
});
