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

        // Define month names manually
        $months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];

        // Build chart data using a simple loop
        $chartData = [];
        for ($month = 1; $month <= 12; $month++) {
            $chartData[] = [
                'name' => $months[$month - 1],
                'Students' => $studentMonthly->get($month, 0),
                'Teachers' => $teacherMonthly->get($month, 0),
            ];
        }

        // Render the dashboard with stats and chart data
        return Inertia::render('Dashboard', [
            'stats' => [
                'students' => Students::count(),
                'teachers' => Teachers::count(),
                'classes' => Classes::count(),
                'subjects' => 12, // Update if dynamic later
            ],
            'chartData' => $chartData,
        ]);
    }
}
