<?php

namespace App\Imports;

use App\Models\Students;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class StudentsImport implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        Log::info($row['email']);
        $user = User::firstOrCreate(
            ['email' => $row['email']],
            [
                'name' => $row['name'],
                'password' => Hash::make('password'),
            ]
        );

        return new Students([
            'name'          => $row['name'],
            'email'         => $row['email'],
            'age'           => $row['age'],
            'date_of_birth' => $row['date_of_birth'],
            'gender'        => $row['gender'],
            'score'         => $row['score'],
            'image'         => $row['image'] ?? null,
            'user_id'       => $user->id,
        ]);
    }
}
