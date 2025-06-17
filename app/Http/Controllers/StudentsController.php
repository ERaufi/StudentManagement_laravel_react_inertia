<?php

namespace App\Http\Controllers;

use App\Models\Students;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
            'age' => 'required|integer|min:1|max:150',
            'date_of_birth' => 'nullable|date',
            'gender' => 'required|in:m,f',
            'score' => 'required|integer|min:0|max:100',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $student = new Students();
        $student->name = $request->name;
        $student->email = $request->email;
        $student->age = $request->age;
        $student->date_of_birth = $request->date_of_birth;
        $student->gender = $request->gender;
        $student->score = $request->score;
        $student->user_id = 1;


        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('students', 'public');
            $student->image = $path;
        }



        $student->save();

        return redirect()->route('students.index')->with('success', 'Student created successfully.');
    }

    public function edit($id)
    {
        $student = Students::where('id', $id)->first();
        return Inertia::render('Students/Edit', [
            'student' => $student
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:students,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email,' . $request->id,
            'age' => 'required|integer|min:1|max:150',
            'date_of_birth' => 'nullable|date',
            'gender' => 'required|in:m,f',
            'score' => 'required|integer|min:0|max:100',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $student = Students::where('id', $request->id)->first();
        $student->name = $request->name;
        $student->email = $request->email;
        $student->age = $request->age;
        $student->date_of_birth = $request->date_of_birth;
        $student->gender = $request->gender;
        $student->score = $request->score;

        if ($request->hasFile('image')) {
            if ($student->image && Storage::disk('public')->exists($student->image)) {
                Storage::disk('public')->delete($student->image);
            }

            $path = $request->file('image')->store('students', 'public');
            $student->image = $path;
        }

        $student->update();

        return redirect()->route('students.index')->with('success', 'Student updated successfully.');
    }


    public function destroy($id)
    {
        $student = Students::where('id', $id)->first();
        if ($student->image && Storage::disk('public')->exists($student->image)) {
            Storage::disk('public')->delete($student->image);
        }

        $student->delete();

        return redirect()->route('students.index')->with('success', 'student deleted successfully.');
    }
}
