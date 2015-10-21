'use strict';

var gulp = require('gulp'),
    merge = require('merge'),
    webpack = require('webpack'),
    gutil = require('gulp-util'),
    del = require('del'),
    _ = require('lodash');

var chromeBuildFolder = "./build/chrome";

var webpackConfig = {
    module: {
        preLoaders: [
            {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/},
        ],
        
        loaders: [
            {test: /\.js$/, loader: "babel-loader", exclude: /node_modules/},
        ]
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

gulp.task('clean', del.bind(
  null, ['build/*'], {dot: true}
));

gulp.task('chrome',["chrome:assets","chrome:background","chrome:stop"]);

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

gulp.task("mocha:build", function(callback) {
    var config = _.merge({},
                         webpackConfig, {
                            output: {
                                path: __dirname + "/build/tests",
                                filename: "main.js"
                            },
                            entry: "./tests/main.js"        
                        });
    
    webpack(config, function(err,stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        
        gutil.log("[webpack]", stats.toString({
        }));
        
        callback();            
    });
    
});

