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
        $sortField = $request->input('sort', 'id');       // ✅ New: Get sort field (default: id)
        $sortDirection = $request->input('direction', 'desc');

        $teachers = Teachers::with('user:id,name')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->orderBy($sortField, $sortDirection) // ✅ New: Apply sorting

            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Teachers/Index', [
            'teachers' => $teachers,
            'search' => $search,
            'sort' => $sortField,         // ✅ New
            'direction' => $sortDirection // ✅ New
        ]);
    }


    public function create()
    {
        return Inertia::render('Teachers/Create');
    }

    public function store(Request $request)
    {
        $teacher = new Teachers();
        $teacher->name = $request->name;
        $teacher->email = $request->email;
        $teacher->phone = $request->phone;
        $teacher->user_id = 1;
        $teacher->save();

        return redirect()->route('teachers.index');
    }
}
