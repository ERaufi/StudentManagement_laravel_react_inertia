<?php

use App\Http\Controllers\ClassesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentClassesController;
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
    Route::get('student/view/{id}', 'show')->name('students.show');
});

Route::controller(TeachersController::class)->group(function () {
    Route::get('/teachers',  'index')->name('teachers.index');
    Route::get('/teachers/create',  'create')->name('teachers.create');
    Route::post('/teachers',  'store')->name('teachers.store');
    Route::get('teacher/edit/{id}',  'edit');
    Route::post('teacher-update',  'update')->name('teachers.update');
    Route::delete('teachers/delete/{id}',  'destroy')->name('teachers.destroy');
    Route::get('teachers/view/{id}', 'show')->name('teachers.show');
});




Route::controller(ClassesController::class)->group(function () {
    Route::get('classes', 'index')->name('classes.index');
    Route::get('classes/create', 'create')->name('classes.create');
    Route::post('classes', 'store')->name('classes.store');
    Route::get('classes/{id}/edit', 'edit')->name('classes.edit');
    Route::put('classes/{id}', 'update')->name('classes.update');
    Route::delete('classes/{id}', 'destroy')->name('classes.destroy');
    Route::get('classes/{id}', 'show')->name('classes.show');
});


Route::fallback(function () {
    return Inertia::render('Errors/NotFound');
});
