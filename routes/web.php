<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;




// Route::inertia('students', 'Students/Index');
// Route::inertia('students', 'Students/Index', [
//     'abc' => 'bbc',
//     'dd' => 'dd'
// ]);

// Route::get('students/{name}/{last_name}', function ($name, $last_name) {
//     return Inertia::render('Students/Index', [
//         'abc' => $name,
//         'dd' => $last_name,
//     ]);
// });
Route::get('students/{name?}/{last_name?}', function ($name = 'Guest', $last_name = 'User') {
    return Inertia::render('Students/Index', [
        'abc' => $name,
        'dd' => $last_name,
    ]);
});

Route::fallback(function () {
    return Inertia::render('Errors/NotFound');
});
