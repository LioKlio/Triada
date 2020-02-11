"use strict";

import gulp from "gulp";
import { paths } from "../paths";
import browsersync from "browser-sync";

gulp.task("serve", () => {
    browsersync.init({
        server: "./docs/",
        port: 4000,
        notify: false
    });

    gulp.watch(paths.pug.watch, gulp.parallel("pug"));
    gulp.watch(paths.styles.watch, gulp.parallel("styles"));
    gulp.watch(paths.scripts.watch, gulp.parallel("scripts"));
    gulp.watch(paths.images.watch, gulp.parallel("images"));
});
