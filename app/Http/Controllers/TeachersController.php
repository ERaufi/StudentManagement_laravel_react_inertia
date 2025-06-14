<?php

namespace App\Http\Controllers;

use App\Models\Teachers;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeachersController extends Controller
{
    //
    public function index()
    {
        $teachers = Teachers::with('user:id,name')
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Teachers/Index', [
            'teachers' => $teachers,
        ]);
    }
}
