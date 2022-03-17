<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MidGroup extends Model
{
    use HasFactory, softDeletes;
    // public $timestamps = false;
    protected $guarded = [];
    protected $table = 'mid_groups';
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'group_name',
        'assigned_mids',
        'gross_revenue',
        'bank_per',
        'target_bank_balance',
    ];
}