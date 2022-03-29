<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Decline extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $table = 'declines';
    protected $casts = [
        'decline_data' => 'array'
    ];
    protected $fillable = [
        'id',
        'gateway_id',
        'gateway_alias',
        'total_declined',
        'decline_per',
        'decline_data',
    ];
}
