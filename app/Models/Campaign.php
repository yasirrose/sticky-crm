<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    public $timestamps = false;
    protected $guarded = [];
    protected $table = 'campaigns';
    protected $fillable = [
        'id',
        'campaign_id',
        'gateway_id',
        'is_active',
        'tax_provider_id',
        'data_verification_provider_id',
        'site_url',
        'is_archived',
        'is_archivedprepaid_blocked',
        'is_custom_price_allowed',
        'is_avs_enabled',
        'is_collections_enabled',
        'created_at',
        'updated_at',
        'archived_at',
        'name',
        'description',
        'pre_auth_amount',
        'creator',
        'updator',
        'countries',
        'fulfillment_id',
        'check_provider_id',
        'membership_provider_id',
        'call_confirm_provider_id',
        'chargeback_provider_id',
        'prospect_provider_id',
        'email_provider_id',
        'offers',
        'channel',
        'payment_methods',
        'gateway',
        'alternative_payments',
        'shipping_profiles',
        'return_profiles',
        'postback_profiles',
        'coupon_profiles',
        'fraud_providers',
        'volume_discounts',
    ];
}
