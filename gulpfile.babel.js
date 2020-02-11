import gulp from "gulp";
import { paths } from "./gulp/paths";

const requireDir = require("require-dir");
requireDir("./gulp/tasks/");


export const build = gulp.series("clean",
  gulp.parallel(["pug", "styles", "scripts", "images"]));

export const development = gulp.series("clean",
  gulp.parallel(["pug", "styles", "scripts", "images"]),
  gulp.parallel("serve"));

export default development;
