let fs = require('fs')
let path = require('path')
let gulp = require('gulp')
let autoprefixer = require('gulp-autoprefixer')
let cssnano = require('gulp-cssnano')
let gulpif = require('gulp-if')
let plumber = require('gulp-plumber')
let stylus = require('gulp-stylus')
let sourcemaps = require('gulp-sourcemaps')

let {NODE_ENV} = process.env
let dev = NODE_ENV === 'development'
let prd = NODE_ENV === 'production'
let webpack
let bundlerConfig
let bundler

let patterns = {
  static: 'src/{popup.html,manifest.json}',
  js: 'src/**/*.js',
  styl: 'src/**/*.styl'
}

gulp.task('static', () => gulp.src(patterns.static).pipe(gulp.dest('dist')))

gulp.task('stylus', () =>
  gulp
    .src('src/index.styl')
    .pipe(plumber())
    .pipe(gulpif(dev, sourcemaps.init()))
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(gulpif(prd, cssnano()))
    .pipe(gulpif(dev, sourcemaps.write('.')))
    .pipe(gulp.dest('dist'))
)

gulp.task('webpack-init', done => {
  webpack = require('webpack')
  bundlerConfig = require('./webpack.config')
  bundler = webpack(bundlerConfig)
  done()
})

gulp.task('webpack', done => {
  bundler.run((err, res) => {
    if (err !== null && err !== undefined) {
      console.error('error bundling', err)
    }
    done()
  })
})

gulp.task('watch', () => {
  gulp.watch(patterns.static, ['static'])
  gulp.watch(patterns.styl, ['stylus'])
  gulp.watch(patterns.js, ['webpack'])
})

gulp.task('dev', ['static', 'stylus', 'webpack-init', 'webpack', 'watch'])
gulp.task('prd', ['static', 'stylus', 'webpack-init', 'webpack'])
