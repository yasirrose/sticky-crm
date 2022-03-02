<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mid extends Model
{
    use HasFactory;
    // public $timestamps = false;
    protected $guarded = [];
    protected $table = 'mids';
    protected $fillable = [
        'router_id',
        'router_name',
        'router_date_in',
        'router_desc',
        'mid_group_setting_id',
        'mid_group_setting',
        'is_three_d_routed',
        'is_strict_preserve',
        'created_on',
        'campaign_id',
        'gateway_id',
        'gateway_alias',
        'global_monthly_cap',
        'current_monthly_amount',
        'processing_percent',
    ];
}
