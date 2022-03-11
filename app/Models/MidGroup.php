<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MidGroup extends Model
{
    use HasFactory;
    // public $timestamps = false;
    protected $guarded = [];
    protected $table = 'mid_groups';
    protected $fillable = [
        'group_name',
        'assigned_mids',
        'gross_revenue',
        'bank_per',
        'target_bank_balance',
    ];
}