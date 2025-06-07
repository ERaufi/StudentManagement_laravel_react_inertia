<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::controller(StudentsController::class)->group(function () {
    Route::get('students', 'index');
    Route::get('students', 'withData');
    Route::get('students/{name}/{last_name}', 'withRouteParameters');
    Route::get('students/{name?}/{last_name?}', 'withOptionalRouteParameters');
});

Route::inertia('teachers', 'Teachers/Index');


Route::fallback(function () {
    return Inertia::render('Errors/NotFound');
});
