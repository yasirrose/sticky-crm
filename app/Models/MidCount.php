<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MidCount extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $table = 'mid_counts';
    protected $casts = [
        'mid_count_data' => 'array'
    ];
    protected $fillable = [
        'id',
        'gateway_id',
        'gateway_alias',
        'mid_count',
        'mid_count_data',
    ];
}
