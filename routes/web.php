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

Route::get('/teachers', [TeachersController::class, 'index'])->name('teachers.index');
Route::get('/teachers/create', [TeachersController::class, 'create'])->name('teachers.create');
Route::post('/teachers', [TeachersController::class, 'store'])->name('teachers.store');
Route::get('teacher/edit/{id}', [TeachersController::class, 'edit']);
Route::post('teacher-update', [TeachersController::class, 'update'])->name('teachers.update');
Route::delete('teachers/delete/{id}', [TeachersController::class, 'destroy'])->name('teachers.destroy');


Route::controller(ClassesController::class)->group(function () {
    Route::get('classes', 'index')->name('classes.index');
    Route::get('classes/create', 'create')->name('classes.create');
    Route::post('classes', 'store')->name('classes.store');
    Route::get('classes/{id}/edit', 'edit')->name('classes.edit');
    Route::put('classes/{id}', 'update')->name('classes.update');
    Route::delete('classes/{id}', 'destroy')->name('classes.destroy');
    Route::get('classes/{id}', 'show')->name('classes.show');
});


Route::controller(StudentClassesController::class)->group(function () {
    Route::get('student_classes', 'index')->name('student_classes.index');
    Route::get('student_classes/create', 'create')->name('student_classes.create');
    Route::post('student_classes', 'store')->name('student_classes.store');
    Route::get('student_classes/{id}/edit', 'edit')->name('student_classes.edit');
    Route::put('student_classes/{id}', 'update')->name('student_classes.update');
    Route::delete('student_classes/{id}', 'destroy')->name('student_classes.destroy');
    Route::get('student_classes/{id}', 'show')->name('student_classes.show');
});

Route::fallback(function () {
    return Inertia::render('Errors/NotFound');
});
