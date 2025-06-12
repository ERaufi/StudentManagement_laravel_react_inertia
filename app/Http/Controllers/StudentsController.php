<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentsController extends Controller
{
    //
    public function index()
    {
        return inertia('Students/Index');
        return Inertia::render('Students/Index');
    }

    public function withData()
    {
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
