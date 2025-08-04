<?php

namespace App\Exports;

use App\Models\Student;
use App\Models\Students;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class StudentsExport implements FromCollection, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Students::select(
            'id',
            'name',
            'email',
            'age',
            'date_of_birth',
            'gender',
            'score',
            'image',
            'user_id',
            'created_at',
            'updated_at'
        )->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Name',
            'Email',
            'Age',
            'Date of Birth',
            'Gender',
            'Score',
            'Image',
            'User ID',
            'Created At',
            'Updated At',
        ];
    }
}
