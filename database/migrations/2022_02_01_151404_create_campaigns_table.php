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
            $table->text('c_id')->nullable()->default(null);
            $table->text('gateway_id')->nullable()->default(null);
            $table->text('is_active')->nullable()->default(null);
            $table->text('tax_provider_id')->nullable()->default(null);
            $table->text('data_verification_provider_id')->nullable()->default(null);
            $table->text('site_url')->nullable()->default(null);
            // $table->text('id')->primary();
            $table->text('is_archived')->nullable()->default(null);
            $table->text('is_archivedprepaid_blocked')->nullable()->default(null);
            $table->text('is_custom_price_allowed')->nullable()->default(null);
            $table->text('is_avs_enabled')->nullable()->default(null);
            $table->text('is_collections_enabled')->nullable()->default(null);
            $table->longText('created_at')->nullable()->default(null);
            $table->longText('updated_at')->nullable()->default(null);
            $table->text('archived_at')->nullable()->default(null);
            $table->text('name')->nullable()->default(null);
            $table->text('description')->nullable()->default(null);
            $table->text('pre_auth_amount')->nullable()->default(null);
            $table->longText('creator')->nullable()->default(null);
            $table->longText('updator')->nullable()->default(null);
            $table->longText('countries')->nullable()->default(null);
            $table->text('fulfillment_id')->nullable()->default(null);
            $table->text('check_provider_id')->nullable()->default(null);
            $table->text('membership_provider_id')->nullable()->default(null);
            $table->text('call_confirm_provider_id')->nullable()->default(null);
            $table->text('chargeback_provider_id')->nullable()->default(null);
            $table->text('prospect_provider_id')->nullable()->default(null);
            $table->text('email_provider_id')->nullable()->default(null);
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