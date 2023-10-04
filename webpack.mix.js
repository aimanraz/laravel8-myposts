const mix = require("laravel-mix");

// mix.webpackConfig({
//     resolve: {
//         extensions: [".js", ".jsx", ".json", ".scss"],
//         alias: {
//             "@": __dirname + "/resources/react",
//         },
//     },
// });

mix.js("resources/js/app.js", "public/js")
    .react()
    .sass("resources/sass/app.scss", "public/css");

mix.js("resources/react/pages/WelcomePage.js", "public/js/").react().version();
