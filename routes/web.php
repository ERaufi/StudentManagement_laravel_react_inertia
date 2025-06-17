<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentsController;
use App\Http\Controllers\TeachersController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::controller(StudentsController::class)->group(function () {
    Route::get('students', 'index')->name('students.index');
    Route::get('/students/create', 'create')->name('students.create');
    Route::post('/students', 'store')->name('students.store');
    Route::get('student/edit/{id}', 'edit');
    Route::post('student-update', 'update');
    Route::delete('student/destroy/{id}', 'destroy')->name('students.destroy');
    // Route::get('students', 'withData');
    // Route::get('students/{name}/{last_name}', 'withRouteParameters');
    // Route::get('students/{name?}/{last_name?}', 'withOptionalRouteParameters');
});

Route::get('/teachers', [TeachersController::class, 'index'])->name('teachers.index');
Route::get('/teachers/create', [TeachersController::class, 'create'])->name('teachers.create');
Route::post('/teachers', [TeachersController::class, 'store'])->name('teachers.store');
Route::get('teacher/edit/{id}', [TeachersController::class, 'edit']);
Route::post('teacher-update', [TeachersController::class, 'update'])->name('teachers.update');
Route::delete('teachers/delete/{id}', [TeachersController::class, 'destroy'])->name('teachers.destroy');


// Route::inertia('teachers', 'Teachers/Index');


// Students

// Teachers



Route::fallback(function () {
    return Inertia::render('Errors/NotFound');
});
