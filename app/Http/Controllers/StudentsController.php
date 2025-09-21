<?php

namespace App\Http\Controllers;

use App\Exports\StudentsExport;
use App\Imports\StudentsImport;
use App\Mail\StudentReportMail;
use App\Models\Students;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;

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
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email|unique:users,email',
            'age' => 'required|integer|min:1|max:150',
            'date_of_birth' => 'nullable|date',
            'gender' => 'required|in:m,f',
            'score' => 'required|integer|min:0|max:100',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        try {
            DB::beginTransaction();

            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make('password');
            $user->save();

            $student = new Students();
            $student->name = $request->name;
            $student->email = $request->email;
            $student->age = $request->age;
            $student->date_of_birth = $request->date_of_birth;
            $student->gender = $request->gender;
            $student->score = $request->score;
            $student->user_id = $user->id;

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('students', 'public');
                $student->image = $path;
            }

            $student->save();

            DB::commit();

            return redirect()->route('students.index')->with('success', 'Student and user created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('Error', [
                'Message' => $e->getMessage(),
                'Traces' => $e->getTrace()
            ]);


            return redirect()->back()->withInput()->withErrors([
                'error' => 'Something went wrong: ' . $e->getMessage()
            ]);
        }
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

    public function show($id)
    {
        $student = Students::with('user')->findOrFail($id);
        $student->image_url = $student->image ? asset('storage/' . $student->image) : null;

        return Inertia::render('Students/View', [
            'student' => $student
        ]);
    }

    public function export()
    {
        return Excel::download(new StudentsExport, 'students.xlsx');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,csv',
        ]);

        Excel::import(new StudentsImport, $request->file('file'));

        return redirect()->back()->with('success', 'Students imported successfully.');
    }

    public function studentReport($id)
    {
        // Load student with related classes + scores
        $student = Students::with('studentClasses.class')->findOrFail($id);

        // Generate PDF
        $pdf = Pdf::loadView('pdfs.student_report', compact('student'))
            ->setPaper('a4', 'portrait');

        return $pdf->stream("student_report_{$student->id}.pdf");
    }


    public function emailReport($id)
    {
        $student =Students::with('studentClasses.class')->findOrFail($id);

        // Generate PDF as raw bytes
        $pdf = Pdf::loadView('pdfs.student_report', compact('student'))
            ->setPaper('a4', 'portrait')
            ->output();

        // Send email with attachment
        Mail::to($student->email)->send(new StudentReportMail($student, $pdf));

        return back()->with('success', 'Report sent to student email!');
    }
}
