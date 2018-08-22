require! {
  fs
  path
  gulp
  'gulp-autoprefixer': autoprefixer
  'gulp-cssnano': cssnano
  'gulp-if': gulpif
  'gulp-livescript': livescript
  'gulp-plumber': plumber
  'gulp-stylus': stylus
  'gulp-skip-unchanged': skipUnchanged
  'gulp-read-file': readFile
  'gulp-sourcemaps': sourcemaps
}

{NODE_ENV} = process.env
dev = NODE_ENV is 'development'
prd = NODE_ENV is not 'development'
map = dev ? 'embedded' : 'none'
webpack = void
bundlerConfig = void
bundler = void

patterns =
  static: 'src/{popup.html,manifest.json}'
  ls: 'src/**/*.ls'
  styl: 'src/**/*.styl'

gulp.task 'static', ->
  gulp.src patterns.static
    .pipe gulp.dest 'dist/webextension'

gulp.task 'stylus', ->
  gulp.src 'src/index.styl'
    .pipe plumber()
    .pipe gulpif dev, sourcemaps.init()
    .pipe stylus()
    .pipe autoprefixer()
    .pipe gulpif prd, cssnano()
    .pipe gulpif dev, sourcemaps.write('.')
    .pipe gulp.dest 'dist/webextension'

gulp.task 'livescript', ->
  gulp.src patterns.ls
    .pipe plumber()
    .pipe skipUnchanged()
    .pipe readFile()
    .pipe sourcemaps.init()
    .pipe livescript {+bare, map}
    .pipe sourcemaps.write('.')
    .pipe gulp.dest 'dist/tmp'

gulp.task 'webpack-init', (done) ->
  webpack := require 'webpack'
  bundlerConfig := require './webpack.config'
  bundler := webpack bundlerConfig
  done!

gulp.task 'webpack', <[livescript]>, (done) ->
  (err) <- bundler.run
  if err is not void and err is not null
    console.error 'error bundling', err.message
    if err.stack is not void
      console.error err.stack
  done!

gulp.task 'watch', ->
  gulp.watch patterns.static, <[static]>
  gulp.watch patterns.styl, <[stylus]>
  gulp.watch patterns.ls, <[webpack]>

gulp.task 'dev', <[static stylus livescript webpack-init webpack watch]>
gulp.task 'prd', <[static stylus livescript webpack-init webpack]>
