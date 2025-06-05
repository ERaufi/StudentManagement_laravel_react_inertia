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


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('DashboardComposition'))->name('dashboard');
    Route::get('/profile', fn() => Inertia::render('Profile'))->name('profile');
    Route::get('/dashboard-alt', fn() => Inertia::render('DashboardPersistent'))->name('dashboard.alt');
    Route::get('/profile-alt', fn() => Inertia::render('ProfilePersistent'))->name('profile.alt');
});


require __DIR__ . '/auth.php';


Route::fallback(function () {
    return Inertia::render('Errors/NotFound');
});
