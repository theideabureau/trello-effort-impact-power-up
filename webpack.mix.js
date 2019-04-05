let mix = require('laravel-mix');

mix.js('src/client.js', 'dist/')
   .js('src/input.js', 'dist/')
   .js('src/settings.js', 'dist/');
