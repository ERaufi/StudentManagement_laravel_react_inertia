<?php

namespace App\Http\Controllers;

use App\Models\Teachers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


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
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:teachers,email|unique:users,email',
            'phone' => 'required|string|max:20',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        try {
            DB::beginTransaction();

            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make('password');
            $user->save();

            $teacher = new Teachers();
            $teacher->name = $request->name;
            $teacher->email = $request->email;
            $teacher->phone = $request->phone;
            $teacher->user_id = $user->id;

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('teachers', 'public');
                $teacher->image = $path;
            }

            $teacher->save();

            DB::commit();

            return redirect()->route('teachers.index')->with('success', 'Teacher and user created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->back()->withInput()->withErrors([
                'error' => 'Something went wrong: ' . $e->getMessage()
            ]);
        }
    }


    public function edit($id)
    {
        $student = Teachers::where('id', $id)->first();
        return Inertia::render('Teachers/Edit', [
            'teacher' => $student
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:teachers,email',
            'phone' => 'required|string|max:20',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $teacher = Teachers::where('id', $request->id)->first();
        $teacher->name = $request->name;
        $teacher->email = $request->email;
        $teacher->phone = $request->phone;
        $teacher->user_id = 1;


        if ($request->hasFile('image')) {
            if ($teacher->image && Storage::disk('public')->exists($teacher->image)) {
                Storage::disk('public')->delete($teacher->image);
            }

            $path = $request->file('image')->store('teachers', 'public');
            $teacher->image = $path;
        }

        $teacher->update();

        return redirect()->route('teachers.index')->with('success', 'Teacher created successfully.');
    }

    public function destroy($id)
    {
        $teacher = Teachers::where('id', $id)->first();
        if ($teacher->image && Storage::disk('public')->exists($teacher->image)) {
            Storage::disk('public')->delete($teacher->image);
        }

        $teacher->delete();

        return redirect()->route('teachers.index')->with('success', 'Teacher deleted successfully.');
    }
}
