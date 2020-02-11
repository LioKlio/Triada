"use strict";

import gulp from "gulp";
import zip from "gulp-zip";

gulp.task("zip", () =>
	gulp
		.src("./docs/*")
		.pipe(zip("docs.zip"))
		.pipe(gulp.dest("./"))
);
