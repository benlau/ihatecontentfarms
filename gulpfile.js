'use strict';

var gulp = require('gulp'),
    merge = require('merge'),
    webpack = require('webpack'),
    gutil = require('gulp-util'),
    del = require('del'),
    _ = require('lodash'),
    path = require('path'),
    zip = require('gulp-zip'),
    runSequence = require('run-sequence');

var chromeBuildFolder = "./build/chrome";

var webpackConfig = {
    module: {
        preLoaders: [
            {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/},
        ],
        
        loaders: [
            {test: /\.js$/, loader: "babel-loader", exclude: /node_modules/},
        ]
    },
    resolve: {
        root: path.resolve("./src")
    }
}

var chromeWebpackConfig = _.merge({},
                                webpackConfig,{
                                    output: {
                                        path: __dirname + "/" + chromeBuildFolder
                                    }
                                });

function chromeWebpack(filename,callback) {
    var config = {};
    _.merge(config,chromeWebpackConfig,{
        entry: "./chrome/" + filename,
        output: {
            filename: filename
        }});
        
    webpack(config,function (err,stats){
        
        if(err) throw new gutil.PluginError("webpack", err);
        
        gutil.log("[webpack]", stats.toString({
        }));
        
        callback();
    });
}

gulp.task('default', function(callback) {
    runSequence ("clean",
                 "chrome",
                 callback);
});

gulp.task('clean', del.bind(
  null, ['build/*'], {dot: true}
));

gulp.task('chrome',["chrome:assets","chrome:background","chrome:stop","chrome:options"]);

gulp.task("chrome:assets", function() {
    var assets = [
        "chrome/**/.css",
        "chrome/libs/**/*.js",
        "chrome/img/**/*",
        "chrome/**/*.css",
        "chrome/**/*.html",
        "chrome/**/*.json"
    ]
    
    return gulp.src(assets,{ base: "./chrome"})
             .pipe(gulp.dest(chromeBuildFolder));    
});

gulp.task("chrome:background", function(callback) {
    chromeWebpack("background.js",callback);
});

gulp.task("chrome:stop", function(callback) {
    chromeWebpack("stop.js",callback);
});

gulp.task("chrome:options", function(callback) {
    chromeWebpack("options.js",callback);
});

gulp.task("chrome:bundle", function() {
    return gulp.src(["build/chrome/**/*"], { base: "./build/chrome" })
            .pipe(zip("chrome.zip"))
            .pipe(gulp.dest("./build"));
});

gulp.task("mocha:build", function(callback) {
    var config = _.merge({},
                         webpackConfig, {
                            output: {
                                path: __dirname + "/build/tests",
                                filename: "main.js"
                            },
                            devtool: 'source-map',
                            entry: "./tests/main.js"        
                        });
    
    webpack(config, function(err,stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        
        gutil.log("[webpack]", stats.toString({
        }));
        
        callback();            
    });
    
});

