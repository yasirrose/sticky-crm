<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Column extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $casts = [
        'isVisible' => 'boolean',
        'IsModelProperty' => 'boolean',
      ];
    protected $table = 'columns';
    protected $fillable = [
        'name',
        'property',
        'visible',
        'isModelProperty',
        'table',
    ];
}