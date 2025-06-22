<?php

namespace App\Http\Controllers;

use App\Models\Classes;
use Illuminate\Http\Request;
use App\Models\Students;
use App\Models\Teachers;
use App\Models\StudentClasses;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //



    public function index()
    {
        // Get students grouped by month
        $studentMonthly = Students::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->pluck('total', 'month');

        // Get teachers grouped by month
        $teacherMonthly = Teachers::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->pluck('total', 'month');

        // Build final chart data for all 12 months
        $chartData = collect(range(1, 12))->map(function ($month) use ($studentMonthly, $teacherMonthly) {
            return [
                'name' => date('M', mktime(0, 0, 0, $month, 1)), // Jan, Feb, ...
                'Students' => $studentMonthly->get($month, 0),
                'Teachers' => $teacherMonthly->get($month, 0),
            ];
        });

        return Inertia::render('Dashboard', [
            'stats' => [
                'students' => Students::count(),
                'teachers' => Teachers::count(),
                'classes' => Classes::count(),
                'subjects' => 12, // Or make dynamic
            ],
            'chartData' => $chartData,
        ]);
    }
}
