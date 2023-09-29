<?php

use Illuminate\Support\Facades\Route;

// API routes with prefix
// Route::prefix('api')->group(function () {
//     Route::get('/posts', 'ApiController@getPosts');
//     // Add more API routes as needed
// });

// Route::get('/{any}', function () {
//     return view('welcome');
// })->where('any', '.*');

Route::get('/', function () {
    return view('welcome');
});

