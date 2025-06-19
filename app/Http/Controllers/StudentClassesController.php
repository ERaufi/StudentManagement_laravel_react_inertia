<?php

namespace App\Http\Controllers;

use App\Models\Classes;
use App\Models\StudentClasses;
use App\Models\Students;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentClassesController extends Controller
{
    //
    public function index(Request $request)
    {
        $searchStudent = $request->input('student');
        $searchClass = $request->input('class');
        $sortField = $request->input('sort', 'id');
        $sortDirection = $request->input('direction', 'desc');

        $studentClasses = StudentClasses::with(['student', 'class'])
            ->when($searchStudent, fn($q) => $q->whereHas('student', fn($q2) => $q2->where('name', 'like', "%{$searchStudent}%")))
            ->when($searchClass, fn($q) => $q->whereHas('class', fn($q2) => $q2->where('name', 'like', "%{$searchClass}%")))
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('StudentClasses/Index', [
            'studentClasses' => $studentClasses,
            'searchStudent' => $searchStudent,
            'searchClass' => $searchClass,
            'sort' => $sortField,
            'direction' => $sortDirection,
        ]);
    }

    public function create()
    {
        $students = Students::select('id', 'name')->get();
        $classes = Classes::select('id', 'name')->get();

        return Inertia::render('StudentClasses/Create', [
            'students' => $students,
            'classes' => $classes,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'class_id' => 'required|exists:classes,id',
            'score' => 'nullable|integer|min:0|max:100',
        ]);

        $studentClass = new StudentClasses();
        $studentClass->student_id = $request->student_id;
        $studentClass->class_id = $request->class_id;
        $studentClass->score = $request->score;
        $studentClass->save();

        return redirect()->route('student_classes.index')->with('success', 'Student class record created successfully.');
    }

    public function edit($id)
    {
        $studentClass = StudentClasses::findOrFail($id);
        $students = Students::select('id', 'name')->get();
        $classes = Classes::select('id', 'name')->get();

        return Inertia::render('StudentClasses/Edit', [
            'studentClass' => $studentClass,
            'students' => $students,
            'classes' => $classes,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'class_id' => 'required|exists:classes,id',
            'score' => 'nullable|integer|min:0|max:100',
        ]);

        $studentClass = StudentClasses::findOrFail($id);
        $studentClass->student_id = $request->student_id;
        $studentClass->class_id = $request->class_id;
        $studentClass->score = $request->score;
        $studentClass->save();

        return redirect()->route('student_classes.index')->with('success', 'Student class record updated successfully.');
    }

    public function destroy($id)
    {
        $studentClass = StudentClasses::findOrFail($id);
        $studentClass->delete();

        return redirect()->route('student_classes.index')->with('success', 'Student class record deleted successfully.');
    }

    public function show($id)
    {
        $studentClass = StudentClasses::with(['student', 'class'])->findOrFail($id);

        return Inertia::render('StudentClasses/View', [
            'studentClass' => $studentClass,
        ]);
    }
}
