const path =  require( "path" );
const webpack = require( "webpack" );
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PreloadPlugin = require("preload-webpack-plugin");

module.exports = {
    mode: "development",
    // context: ".",
    output: {
        path: path.join( __dirname, "public/build" ),
        filename: "js/bundle.js",
        publicPath: "/"
    },
    resolve: {
        extensions: [
            ".mjs",
            ".js",
            ".json",
            ".wasm"
        ],
        modules: [
            "./node_modules"
        ],
        plugins: [
            {
                apply: function nothing() {
                    // ¯\_(ツ)_/¯
                },
                makePlugin: function () { /* omitted long function */ },
                moduleLoader: function () { /* omitted long function */ },
                topLevelLoader: {
                    apply: function nothing() {
                        // ¯\_(ツ)_/¯
                    }
                },
                bind: function () { /* omitted long function */ },
                tsLoaderOptions: function () { /* omitted long function */ },
                forkTsCheckerOptions: function () { /* omitted long function */ }
            }
        ],
        symlinks: false
    },
    resolveLoader: {
        modules: [
            "./node_modules/@vue/cli-plugin-babel/./node_modules",
            "./node_modules",
            "./node_modules",
            "./node_modules/@vue/cli-service/./node_modules"
        ]
    },
    module: {
        rules: [
            /* config.module.rule('images') */
            {
                test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                use: [
                    {
                        loader: "./node_modules/url-loader/dist/cjs.js",
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: "./node_modules/file-loader/dist/cjs.js",
                                options: {
                                    name: "img/[name].[hash:8].[ext]"
                                }
                            }
                        }
                    }
                ]
            },
            /* config.module.rule('svg') */
            {
                test: /\.(svg)(\?.*)?$/,
                use: [
                    {
                        loader: "./node_modules/file-loader/dist/cjs.js",
                        options: {
                            name: "img/[name].[hash:8].[ext]"
                        }
                    }
                ]
            },
            /* config.module.rule('media') */
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                    {
                        loader: "./node_modules/url-loader/dist/cjs.js",
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: "./node_modules/file-loader/dist/cjs.js",
                                options: {
                                    name: "media/[name].[hash:8].[ext]"
                                }
                            }
                        }
                    }
                ]
            },
            /* config.module.rule('fonts') */
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: [
                    {
                        loader: "./node_modules/url-loader/dist/cjs.js",
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: "./node_modules/file-loader/dist/cjs.js",
                                options: {
                                    name: "fonts/[name].[hash:8].[ext]"
                                }
                            }
                        }
                    }
                ]
            },
            /* config.module.rule('pug') */
            {
                test: /\.pug$/,
                oneOf: [
                    /* config.module.rule('pug').rule('pug-vue') */
                    {
                        resourceQuery: /vue/,
                        use: [
                            {
                                loader: "pug-plain-loader"
                            }
                        ]
                    },
                    /* config.module.rule('pug').rule('pug-template') */
                    {
                        use: [
                            {
                                loader: "raw-loader"
                            },
                            {
                                loader: "pug-plain-loader"
                            }
                        ]
                    }
                ]
            },
            /* config.module.rule('css') */
            {
                test: /\.css$/,
                oneOf: [
                    /* config.module.rule('css').rule('vue-modules') */
                    {
                        resourceQuery: /module/,
                        use: [
                            {
                                loader: "./node_modules/vue-style-loader/index.js",
                                options: {
                                    sourceMap: false,
                                    shadowMode: false
                                }
                            },
                            {
                                loader: "./node_modules/css-loader/dist/cjs.js",
                                options: {
                                    sourceMap: false,
                                    importLoaders: 2,
                                    modules: {
                                        localIdentName: "[name]_[local]_[hash:base64:5]"
                                    }
                                }
                            },
                            {
                                loader: "./node_modules/postcss-loader/src/index.js",
                                options: {
                                    sourceMap: false
                                }
                            }
                        ]
                    },
                    /* config.module.rule('css').rule('vue') */
                    {
                        resourceQuery: /\?vue/,
                        use: [
                            {
                                loader: "./node_modules/vue-style-loader/index.js",
                                options: {
                                    sourceMap: false,
                                    shadowMode: false
                                }
                            },
                            {
                                loader: "./node_modules/css-loader/dist/cjs.js",
                                options: {
                                    sourceMap: false,
                                    importLoaders: 2
                                }
                            },
                            {
                                loader: "./node_modules/postcss-loader/src/index.js",
                                options: {
                                    sourceMap: false
                                }
                            }
                        ]
                    },
                    /* config.module.rule('css').rule('normal-modules') */
                    {
                        test: /\.module\.\w+$/,
                        use: [
                            {
                                loader: "./node_modules/vue-style-loader/index.js",
                                options: {
                                    sourceMap: false,
                                    shadowMode: false
                                }
                            },
                            {
                                loader: "./node_modules/css-loader/dist/cjs.js",
                                options: {
                                    sourceMap: false,
                                    importLoaders: 2,
                                    modules: {
                                        localIdentName: "[name]_[local]_[hash:base64:5]"
                                    }
                                }
                            },
                            {
                                loader: "./node_modules/postcss-loader/src/index.js",
                                options: {
                                    sourceMap: false
                                }
                            }
                        ]
                    },
                    /* config.module.rule('css').rule('normal') */
                    {
                        use: [
                            {
                                loader: "./node_modules/vue-style-loader/index.js",
                                options: {
                                    sourceMap: false,
                                    shadowMode: false
                                }
                            },
                            {
                                loader: "./node_modules/css-loader/dist/cjs.js",
                                options: {
                                    sourceMap: false,
                                    importLoaders: 2
                                }
                            },
                            {
                                loader: "./node_modules/postcss-loader/src/index.js",
                                options: {
                                    sourceMap: false
                                }
                            }
                        ]
                    }
                ]
            },
            /* config.module.rule('postcss') */
            {
                test: /\.p(ost)?css$/,
                oneOf: [
                    /* config.module.rule('postcss').rule('vue-modules') */
                    {
                        resourceQuery: /module/,
                        use: [
                            {
                                loader: "./node_modules/vue-style-loader/index.js",
                                options: {
                                    sourceMap: false,
                                    shadowMode: false
                                }
                            },
                            {
                                loader: "./node_modules/css-loader/dist/cjs.js",
                                options: {
                                    sourceMap: false,
                                    importLoaders: 2,
                                    modules: {
                                        localIdentName: "[name]_[local]_[hash:base64:5]"
                                    }
                                }
                            },
                            {
                                loader: "./node_modules/postcss-loader/src/index.js",
                                options: {
                                    sourceMap: false
                                }
                            }
                        ]
                    },
                    /* config.module.rule('postcss').rule('vue') */
                    {
                        resourceQuery: /\?vue/,
                        use: [
                            {
                                loader: "./node_modules/vue-style-loader/index.js",
                                options: {
                                    sourceMap: false,
                                    shadowMode: false
                                }
                            },
                            {
                                loader: "./node_modules/css-loader/dist/cjs.js",
                                options: {
                                    sourceMap: false,
                                    importLoaders: 2
                                }
                            },
                            {
                                loader: "./node_modules/postcss-loader/src/index.js",
                                options: {
                                    sourceMap: false
                                }
                            }
                        ]
                    },
                    /* config.module.rule('postcss').rule('normal-modules') */
                    {
                        test: /\.module\.\w+$/,
                        use: [
                            {
                                loader: "./node_modules/vue-style-loader/index.js",
                                options: {
                                    sourceMap: false,
                                    shadowMode: false
                                }
                            },
                            {
                                loader: "./node_modules/css-loader/dist/cjs.js",
                                options: {
                                    sourceMap: false,
                                    importLoaders: 2,
                                    modules: {
                                        localIdentName: "[name]_[local]_[hash:base64:5]"
                                    }
                                }
                            },
                            {
                                loader: "./node_modules/postcss-loader/src/index.js",
                                options: {
                                    sourceMap: false
                                }
                            }
                        ]
                    },
                    /* config.module.rule('postcss').rule('normal') */
                    {
                        use: [
                            {
                                loader: "./node_modules/vue-style-loader/index.js",
                                options: {
                                    sourceMap: false,
                                    shadowMode: false
                                }
                            },
                            {
                                loader: "./node_modules/css-loader/dist/cjs.js",
                                options: {
                                    sourceMap: false,
                                    importLoaders: 2
                                }
                            },
                            {
                                loader: "./node_modules/postcss-loader/src/index.js",
                                options: {
                                    sourceMap: false
                                }
                            }
                        ]
                    }
                ]
            },
            /* config.module.rule('less') */
            {
                test: /\.less$/,
                oneOf: [
                    /* config.module.rule('less').rule('vue-modules') */
                    {
                        resourceQuery: /module/,
                        use: [
                            {
                                loader: "./node_modules/vue-style-loader/index.js",
                                options: {
                                    sourceMap: false,
                                    shadowMode: false
                                }
                            },
                            {
                                loader: "./node_modules/css-loader/dist/cjs.js",
                                options: {
                                    sourceMap: false,
                                    importLoaders: 2,
                                    modules: {
                                        localIdentName: "[name]_[local]_[hash:base64:5]"
                                    }
                                }
                            },
                            {
                                loader: "./node_modules/postcss-loader/src/index.js",
                                options: {
                                    sourceMap: false
                                }
                            },
                            {
                                loader: "less-loader",
                                options: {
                                    sourceMap: false
                                }
                            }
                        ]
                    },
                    /* config.module.rule('less').rule('vue') */
                    {
                        resourceQuery: /\?vue/,
                        use: [
                            {
                                loader: "./node_modules/vue-style-loader/index.js",
                                options: {
                                    sourceMap: false,
                                    shadowMode: false
                                }
                            },
                            {
                                loader: "./node_modules/css-loader/dist/cjs.js",
                                options: {
                                    sourceMap: false,
                                    importLoaders: 2
                                }
                            },
                            {
                                loader: "./node_modules/postcss-loader/src/index.js",
                                options: {
                                    sourceMap: false
                                }
                            },
                            {
                                loader: "less-loader",
                                options: {
                                    sourceMap: false
                                }
                            }
                        ]
                    },
                    /* config.module.rule('less').rule('normal-modules') */
                    {
                        test: /\.module\.\w+$/,
                        use: [
                            {
                                loader: "./node_modules/vue-style-loader/index.js",
                                options: {
                                    sourceMap: false,
                                    shadowMode: false
                                }
                            },
                            {
                                loader: "./node_modules/css-loader/dist/cjs.js",
                                options: {
                                    sourceMap: false,
                                    importLoaders: 2,
                                    modules: {
                                        localIdentName: "[name]_[local]_[hash:base64:5]"
                                    }
                                }
                            },
                            {
                                loader: "./node_modules/postcss-loader/src/index.js",
                                options: {
                                    sourceMap: false
                                }
                            },
                            {
                                loader: "less-loader",
                                options: {
                                    sourceMap: false
                                }
                            }
                        ]
                    },
                    /* config.module.rule('less').rule('normal') */
                    {
                        use: [
                            {
                                loader: "./node_modules/vue-style-loader/index.js",
                                options: {
                                    sourceMap: false,
                                    shadowMode: false
                                }
                            },
                            {
                                loader: "./node_modules/css-loader/dist/cjs.js",
                                options: {
                                    sourceMap: false,
                                    importLoaders: 2
                                }
                            },
                            {
                                loader: "./node_modules/postcss-loader/src/index.js",
                                options: {
                                    sourceMap: false
                                }
                            },
                            {
                                loader: "less-loader",
                                options: {
                                    sourceMap: false
                                }
                            }
                        ]
                    }
                ]
            },
            /* config.module.rule('stylus') */
            {
                test: /\.styl(us)?$/,
                oneOf: [
                    /* config.module.rule('stylus').rule('vue-modules') */
                    {
                        resourceQuery: /module/,
                        use: [
                            {
                                loader: "./node_modules/vue-style-loader/index.js",
                                options: {
                                    sourceMap: false,
                                    shadowMode: false
                                }
                            },
                            {
                                loader: "./node_modules/css-loader/dist/cjs.js",
                                options: {
                                    sourceMap: false,
                                    importLoaders: 2,
                                    modules: {
                                        localIdentName: "[name]_[local]_[hash:base64:5]"
                                    }
                                }
                            },
                            {
                                loader: "./node_modules/postcss-loader/src/index.js",
                                options: {
                                    sourceMap: false
                                }
                            },
                            {
                                loader: "./node_modules/stylus-loader/index.js",
                                options: {
                                    sourceMap: false,
                                    preferPathResolver: "webpack"
                                }
                            }
                        ]
                    },
                    /* config.module.rule('stylus').rule('vue') */
                    {
                        resourceQuery: /\?vue/,
                        use: [
                            {
                                loader: "./node_modules/vue-style-loader/index.js",
                                options: {
                                    sourceMap: false,
                                    shadowMode: false
                                }
                            },
                            {
                                loader: "./node_modules/css-loader/dist/cjs.js",
                                options: {
                                    sourceMap: false,
                                    importLoaders: 2
                                }
                            },
                            {
                                loader: "./node_modules/postcss-loader/src/index.js",
                                options: {
                                    sourceMap: false
                                }
                            },
                            {
                                loader: "./node_modules/stylus-loader/index.js",
                                options: {
                                    sourceMap: false,
                                    preferPathResolver: "webpack"
                                }
                            }
                        ]
                    },
                    /* config.module.rule('stylus').rule('normal-modules') */
                    {
                        test: /\.module\.\w+$/,
                        use: [
                            {
                                loader: "./node_modules/vue-style-loader/index.js",
                                options: {
                                    sourceMap: false,
                                    shadowMode: false
                                }
                            },
                            {
                                loader: "./node_modules/css-loader/dist/cjs.js",
                                options: {
                                    sourceMap: false,
                                    importLoaders: 2,
                                    modules: {
                                        localIdentName: "[name]_[local]_[hash:base64:5]"
                                    }
                                }
                            },
                            {
                                loader: "./node_modules/postcss-loader/src/index.js",
                                options: {
                                    sourceMap: false
                                }
                            },
                            {
                                loader: "./node_modules/stylus-loader/index.js",
                                options: {
                                    sourceMap: false,
                                    preferPathResolver: "webpack"
                                }
                            }
                        ]
                    },
                    /* config.module.rule('stylus').rule('normal') */
                    {
                        use: [
                            {
                                loader: "./node_modules/vue-style-loader/index.js",
                                options: {
                                    sourceMap: false,
                                    shadowMode: false
                                }
                            },
                            {
                                loader: "./node_modules/css-loader/dist/cjs.js",
                                options: {
                                    sourceMap: false,
                                    importLoaders: 2
                                }
                            },
                            {
                                loader: "./node_modules/postcss-loader/src/index.js",
                                options: {
                                    sourceMap: false
                                }
                            },
                            {
                                loader: "./node_modules/stylus-loader/index.js",
                                options: {
                                    sourceMap: false,
                                    preferPathResolver: "webpack"
                                }
                            }
                        ]
                    }
                ]
            },
            /* config.module.rule('js') */
            {
                test: /\.m?jsx?$/,
                exclude: [
                    function () { /* omitted long function */ }
                ],
                use: [
                    {
                        loader: "./node_modules/cache-loader/dist/cjs.js",
                        options: {
                            cacheDirectory: "./node_modules/.cache/babel-loader",
                            cacheIdentifier: "5dfaa5a7"
                        }
                    },
                    {
                        loader: "./node_modules/babel-loader/lib/index.js"
                    }
                ]
            },
            /* config.module.rule('eslint') */
            {
                enforce: "pre",
                test: /\.((j|t)sx?)$/,
                exclude: [
                    /node_modules/,
                    // "node_modules/@vue/cli-service/lib"
                ],
                use: [
                    {
                        loader: "./node_modules/eslint-loader/index.js",
                        options: {
                            extensions: [
                                ".js",
                                ".jsx",
                                ".vue"
                            ],
                            cache: true,
                            cacheIdentifier: "7c3bdc76",
                            emitWarning: false,
                            emitError: false,
                            eslintPath: "./node_modules/eslint",
                            formatter: undefined
                        }
                    }
                ]
            },
            /* config.module.rule('i18n') */
            {
                resourceQuery: /blockType=i18n/,
                type: "javascript/auto",
                use: [
                    {
                        loader: "@intlify/vue-i18n-loader"
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: "chunk-vendors",
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: "initial"
                },
                common: {
                    name: "chunk-common",
                    minChunks: 2,
                    priority: -20,
                    chunks: "initial",
                    reuseExistingChunk: true
                }
            }
        },
        minimizer: [
            {
                apply: function () {},
                options: {
                    test: /\.m?js(\?.*)?$/i,
                    chunkFilter: () => true,
                    warningsFilter: () => true,
                    extractComments: false,
                    sourceMap: false,
                    cache: true,
                    cacheKeys: defaultCacheKeys => defaultCacheKeys,
                    parallel: true,
                    include: undefined,
                    exclude: undefined,
                    minify: undefined,
                    terserOptions: {
                        compress: {
                            arrows: false,
                            collapse_vars: false,
                            comparisons: false,
                            computed_props: false,
                            hoist_funs: false,
                            hoist_props: false,
                            hoist_vars: false,
                            inline: false,
                            loops: false,
                            negate_iife: false,
                            properties: false,
                            reduce_funcs: false,
                            reduce_vars: false,
                            switches: false,
                            toplevel: false,
                            typeofs: false,
                            booleans: true,
                            if_return: true,
                            sequences: true,
                            unused: true,
                            conditionals: true,
                            dead_code: true,
                            evaluate: true
                        },
                        mangle: {
                            safari10: true
                        }
                    }
                }
            }
        ]
    },
    plugins: [
        /* config.plugin('define') */
        new webpack.DefinePlugin(
            {
                "process.env": {
                    VUE_APP_API_URL: "\"http://localhost:3000\"",
                    NODE_ENV: "\"development\"",
                    BASE_URL: "\"/\""
                }
            }
        ),
        /* config.plugin('case-sensitive-paths') */
        new CaseSensitivePathsPlugin(),
        /* config.plugin('friendly-errors') */
        new FriendlyErrorsWebpackPlugin(
            {
                additionalTransformers: [
                    function () { /* omitted long function */ }
                ],
                additionalFormatters: [
                    function () { /* omitted long function */ }
                ]
            }
        ),
        /* config.plugin('html') */
        new HtmlWebpackPlugin(
            {
                title: "ddd-viewer-example-webpack",
                templateParameters: function () { /* omitted long function */ },
                template: "././public/index.html"
            }
        ),
        /* config.plugin('preload') */
        new PreloadPlugin(
            {
                rel: "preload",
                include: "initial",
                fileBlacklist: [
                    /\.map$/,
                    /hot-update\.js$/
                ]
            }
        ),
        /* config.plugin('prefetch') */
        new PreloadPlugin(
            {
                rel: "prefetch",
                include: "asyncChunks"
            }
        ),
        // /* config.plugin('copy') */
        // new CopyPlugin(
        //     [
        //         {
        //             from: "./public",
        //             to: "dist",
        //             toType: "dir",
        //             ignore: [
        //                 ".DS_Store",
        //                 {
        //                     glob: "index.html",
        //                     matchBase: false
        //                 }
        //             ]
        //         }
        //     ]
        // )
    ],
    entry: {
        app: [
            "./src/main.js"
        ]
    },
    devServer: {
        compress: true,
        disableHostCheck: true
    }
};