<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;


class UsersController extends Controller
{
    //
    public function index(Request $request)
    {
        $search = $request->input('search');
        $sortField = $request->input('sort', 'id');
        $sortDirection = $request->input('direction', 'desc');

        $users = User::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Users/Index', [
            'users' => $users,
            'search' => $search,
            'sort' => $sortField,
            'direction' => $sortDirection
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        try {
            DB::beginTransaction();

            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->save();

            DB::commit();

            return redirect()->route('users.index')->with('success', 'User created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('User Create Error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTrace()
            ]);

            return redirect()->back()->withInput()->withErrors([
                'error' => 'Something went wrong: ' . $e->getMessage()
            ]);
        }
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('Users/Edit', [
            'user' => $user
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $request->id,
            'password' => 'nullable|string|min:6',
        ]);

        $user = User::findOrFail($request->id);
        $user->name = $request->name;
        $user->email = $request->email;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('Users/View', [
            'user' => $user
        ]);
    }
}
