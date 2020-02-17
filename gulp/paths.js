export const paths = {
  pug: {
    src: "./src/pug/!(_)*.pug",
    watch: "./src/pug/**/*.pug",
    dist: "./docs/",
  },
  styles: {
    src: "./src/scss/!(_)*.scss",
    watch: "./src/scss/**/*.scss",
    dist: "./docs/css/"
  },
  scripts: {
    src: "./src/js/!(_)*.js",
    watch: "./src/js/**/*.js",
    dist: "./docs/js/",
  },
  images: {
    src: [
      "./src/img/**/*.{jpg,jpeg,png,gif,tiff,svg}",
      "!./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}"
    ],
    watch: "./src/img/**/*.{jpg,jpeg,png,gif,svg}",
    dist: "./docs/img/",
  },
  fonts: {
    src: "./src/fonts/**/*",
    dist: "./docs/fonts/"
  }
};
