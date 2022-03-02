<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCampaignsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('campaign_id')->unique()->nullable()->default(null)->comment('c_id');
            $table->unsignedBigInteger('gateway_id')->nullable()->default(null);
            $table->string('is_active')->nullable()->default(null);
            $table->string('tax_provider_id')->nullable()->default(null);
            $table->string('data_verification_provider_id')->nullable()->default(null);
            $table->string('site_url')->nullable()->default(null);
            $table->string('is_archived')->nullable()->default(null);
            $table->string('is_prepaid_blocked')->nullable()->default(null);
            $table->string('is_custom_price_allowed')->nullable()->default(null);
            $table->string('is_avs_enabled')->nullable()->default(null);
            $table->string('is_collections_enabled')->nullable()->default(null);
            $table->longText('created_at')->nullable()->default(null);
            $table->longText('updated_at')->nullable()->default(null);
            $table->string('archived_at')->nullable()->default(null);
            $table->string('name')->nullable()->default(null);
            $table->string('description')->nullable()->default(null);
            $table->string('pre_auth_amount')->nullable()->default(null);
            $table->longText('creator')->nullable()->default(null);
            $table->longText('updator')->nullable()->default(null);
            $table->longText('countries')->nullable()->default(null);
            $table->string('fulfillment_id')->nullable()->default(null);
            $table->string('check_provider_id')->nullable()->default(null);
            $table->string('membership_provider_id')->nullable()->default(null);
            $table->string('call_confirm_provider_id')->nullable()->default(null);
            $table->string('chargeback_provider_id')->nullable()->default(null);
            $table->string('prospect_provider_id')->nullable()->default(null);
            $table->string('email_provider_id')->nullable()->default(null);
            $table->longText('offers')->nullable()->default(null);
            $table->longText('channel')->nullable()->default(null);
            $table->longText('payment_methods')->nullable()->default(null);
            $table->longText('gateway')->nullable()->default(null);
            $table->longText('alternative_payments')->nullable()->default(null);
            $table->longText('shipping_profiles')->nullable()->default(null);
            $table->longText('return_profiles')->nullable()->default(null);
            $table->longText('postback_profiles')->nullable()->default(null);
            $table->longText('coupon_profiles')->nullable()->default(null);
            $table->longText('fraud_providers')->nullable()->default(null);
            $table->longText('volume_discounts')->nullable()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('campaigns');
    }
}