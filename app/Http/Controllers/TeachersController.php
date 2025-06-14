<?php

namespace App\Http\Controllers;

use App\Models\Teachers;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeachersController extends Controller
{
    //
    public function index(Request $request)
    {
        $search = $request->input('search');

        $teachers = Teachers::with('user:id,name')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Teachers/Index', [
            'teachers' => $teachers,
            'search' => $search,
        ]);
    }
}
