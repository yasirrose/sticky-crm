<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class GoldenTicket extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $guarded = [];
    protected $table = 'golden_tickets';
    protected $fillable = [
        'month',
        'initials',
        'rebills',
        'cycle_1_per',
        'cycle_2',
        'cycle_2_per',
        'cycle_3_plus',
        'cycle_3_plus_per',
        'avg_ticket',
        'revenue',
        'refund',
        'refund_rate',
        'CBs',
        'CB_per',
        'CB_currency',
        'fulfillment',
        'processing',
        'cpa',
        'cpa_avg',
        'net',
        'clv',
    ];

    public function getTableColumns()
    {
        return Schema::getColumnListing($this->table);
    }
}
