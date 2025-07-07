<?php

use App\Http\Controllers\ClassesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\StudentsController;
use App\Http\Controllers\TeachersController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RolePermissionController;


Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
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


    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/', [UsersController::class, 'index'])->name('index');
        Route::get('/create', [UsersController::class, 'create'])->name('create');
        Route::post('/', [UsersController::class, 'store'])->name('store');
        Route::get('/edit/{id}', [UsersController::class, 'edit'])->name('edit');
        Route::post('/update', [UsersController::class, 'update'])->name('update');
        Route::delete('/{id}', [UsersController::class, 'destroy'])->name('destroy');
        Route::get('/{id}', [UsersController::class, 'show'])->name('show');
    });


    Route::prefix('roles')->group(function () {
        Route::get('/', [RolePermissionController::class, 'index'])->name('roles.index');
        Route::get('/create', [RolePermissionController::class, 'create'])->name('roles.create');
        Route::post('/roles', [RolePermissionController::class, 'store'])->name('roles.store');
        Route::get('add-permission-to-role/{id}', [RolePermissionController::class, 'AddPermissionToRole']);
        Route::post('assign-permissions-to-role/{id}', [RolePermissionController::class, 'AssignPermissions']);
        Route::get('add-users-to-role/{id}', [RolePermissionController::class, 'AddUsersToRole']);
        Route::post('assign-users-to-role/{id}', [RolePermissionController::class, 'AssignUsersToRole']);
    });
});






require __DIR__ . '/auth.php';


Route::fallback(function () {
    return Inertia::render('Errors/NotFound');
});
