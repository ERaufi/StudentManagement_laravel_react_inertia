<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentClasses extends Model
{
    //
    use HasFactory;
    
    public function student()
    {
        return $this->belongsTo(Students::class);
    }

    public function class()
    {
        return $this->belongsTo(Classes::class);
    }
}
