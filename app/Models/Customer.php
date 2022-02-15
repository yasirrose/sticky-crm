<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $casts = [
        'custom_fields' => 'array',
        'addresses' => 'array',
        'notes' => 'array'
    ];
    protected $table = 'customers';
    public $timestamps = false;
    public $incrementing = false;
    protected $guarded = [];
    protected $fillable = [
        'id',
        'customer_id',
        'email',
        'origin_id',
        'is_member',
        'first_name',
        'last_name',
        'phone',
        'phone_key',
        'custom_fields',
        'addresses',
        'notes',
        'is_sms_communication_enabled',
        'created_at',
    ];

}