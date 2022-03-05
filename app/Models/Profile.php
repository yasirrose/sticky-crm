<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;
    protected $table = 'profiles';
    protected $cast = [
        'global_fields' => 'array',
        'account_fields' => 'array',
        'fee_fields' => 'array',
    ];
    protected $fillable = [
        'profile_id',
        'account_id',
        'alias',
        'account_name',
        'currency_id',
        'currency_title',
        'currency_code',
        'currency_symbol_left',
        'global_fields',
        'account_fields',
        'fee_fields'
    ];
}
