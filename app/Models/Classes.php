<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    //
    use HasFactory;
    public function teacher()
    {
        return $this->belongsTo(Teachers::class);
    }

    public function studentClasses()
    {
        return $this->hasMany(StudentClasses::class, 'class_id');
    }
}
