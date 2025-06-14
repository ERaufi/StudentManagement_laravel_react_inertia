<?php

namespace App\Http\Controllers;

use App\Models\Students;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentsController extends Controller
{
    //
    public function index()
    {
        $students = Students::with('user:id,name')->get();

        return Inertia::render('Students/Index', [
            'students' => $students,
        ]);
    }

    public function withData()
    {
        sleep(3);
        return inertia('Students/Index', [
            'abc' => __('Name'),
            'dd' => __('Name')
        ]);
    }

    public function withRouteParameters($name, $last_name)
    {
        return Inertia::render('Students/Index', [
            'abc' => $name,
            'dd' => $last_name,
        ]);
    }

    public function withOptionalRouteParameters($name = 'Guest', $last_name = 'User')
    {
        return Inertia::render('Students/Index', [
            'abc' => $name,
            'dd' => $last_name,
        ]);
    }
}
