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
    // protected $casts = [
    //     'decline_orders' => 'array'
    // ];
    protected $fillable = [
        'router_id',
        'router_name',
        'mid_count',
        'router_date_in',
        'router_desc',
        'mid_group_setting_id',
        'mid_group_setting',
        'is_three_d_routed',
        'is_strict_preserve',
        'created_on',
        'campaign_id',
        'current_monthly_amount',
        'processing_percent',
        'gateway_id',
        'gateway_type',
        'gateway_provider',
        'gateway_alias',
        'gateway_created',
        'gateway_active',
        'global_monthly_cap',
        'monthly_sales',
        'processing_percent',
        'reserve_percent',
        'transaction_fee',
        'chargeback_fee',
        'gateway_descriptor',
        'customer_service_number',
        'gateway_currency',
        'decline_per',
        'decline_id',
        'decline_orders',
        'mid_group',
    ];
}
