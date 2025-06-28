<?php

namespace Database\Seeders;

use App\Models\Classes;
use App\Models\StudentClasses;
use App\Models\Students;
use App\Models\Teachers;
use App\Models\User;
use Database\Factories\ClassesFactory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Teachers::factory(20)->create();
        // Students::factory(100)->create();
        // Classes::factory(50)->create();
        // StudentClasses::factory(200)->create();
        $this->call(PermissionsSeeder::class);
    }
}
