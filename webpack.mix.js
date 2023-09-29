const mix = require("laravel-mix");

mix.webpackConfig({
    resolve: {
        extensions: [".js", ".jsx", ".json", ".scss"],
        alias: {
            "@": __dirname + "/resources/react",
        },
    },
});

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("resources/js/app.js", "public/js")
    .react()
    .sass("resources/sass/app.scss", "public/css");

mix.react().js("resources/react/pages/WelcomePage.js", "public/js/").version();
