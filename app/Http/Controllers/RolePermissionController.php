<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


class RolePermissionController extends Controller
{
    public function index()
    {
        return Inertia::render('Roles/Index', [
            'roles' => Role::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Roles/Create', [
            'permissions' => Permission::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name',
        ]);

        $role = Role::create(['name' => $request->name]);

        return redirect()->route('roles.index')->with('success', 'Role created successfully.');
    }


    public function AddPermissionToRole($id)
    {
        $role = Role::with('permissions')->findOrFail($id);

        return Inertia::render('Roles/Permissions', [
            'role' => $role,
            'allPermissions' => Permission::all(),
        ]);
    }


    public function AssignPermissions(Request $request, $id)
    {
        $role = Role::findOrFail($id);
        $role->syncPermissions($request->permissions); // replaces current permissions

        return redirect()->route('roles.index')->with('success', 'Permissions Added Successfully');
    }




    public function AddUsersToRole($id)
    {
        return Inertia::render('Roles/Users', [
            'role' => Role::with('users')->findOrFail($id),
            'allUsers' => User::select('id', 'name', 'email','user_type')->get(),
        ]);
    }

    public function AssignUsersToRole(Request $request, $id)
    {
        $role = Role::findOrFail($id);
        $userIds = $request->input('users', []);

        User::role($role->name)->get()->each(function ($user) use ($role) {
            $user->removeRole($role);
        });

        // Sync users to the role (attach role to each user)
        foreach (User::whereIn('id', $userIds)->get() as $user) {
            $user->assignRole($role);
        }

        return redirect()->back()->with('success', 'Users assigned to role successfully!');
    }
}
