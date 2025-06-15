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
