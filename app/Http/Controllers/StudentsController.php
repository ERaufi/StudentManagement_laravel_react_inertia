<?php

namespace App\Http\Controllers;

use App\Models\Students;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentsController extends Controller
{
    //
    public function index(Request $request)
    {
        $search = $request->input('search');
        $sortField = $request->input('sort', 'id');       // ✅ New: Get sort field (default: id)
        $sortDirection = $request->input('direction', 'desc');

        $students = Students::with('user:id,name')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->orderBy($sortField, $sortDirection) // ✅ New: Apply sorting
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Students/Index', [
            'students' => $students,
            'search' => $search,
            'sort' => $sortField,         // ✅ New
            'direction' => $sortDirection // ✅ New
        ]);
    }

    public function create()
    {
        return Inertia::render('Students/Create');
    }

    public function store(Request $request)
    {
        $student = new Students();
        $student->name = $request->name;
        $student->email = $request->email;
        $student->age = $request->age;
        $student->date_of_birth = $request->date_of_birth;
        $student->gender = $request->gender;
        $student->score = $request->score;
        $student->user_id = 1;
        $student->save();

        return redirect()->route('students.index');
    }
}
