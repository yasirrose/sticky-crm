<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\SoftDeletes;

class CreateProspectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prospects', function (Blueprint $table) {
            $table->id()->index();
            $table->string('prospect_id')->nullable()->default(null)->index();
            $table->string('campaign_id')->nullable()->default(null);
            $table->string('first_name')->nullable()->default(null);
            $table->string('last_name')->nullable()->default(null);
            $table->string('address')->nullable()->default(null);
            $table->string('address2')->nullable()->default(null);
            $table->string('city')->nullable()->default(null);
            $table->string('state')->nullable()->default(null);
            $table->string('state_id')->nullable()->default(null);
            $table->string('zip')->nullable()->default(null);
            $table->string('country')->nullable()->default(null);
            $table->string('phone')->nullable()->default(null);
            $table->string('email')->nullable()->default(null);
            $table->string('ip_address')->nullable()->default(null);
            $table->string('month_created')->nullable()->default(null);
            $table->string('year_created')->nullable()->default(null);
            $table->string('date_created')->nullable()->default(null);
            $table->string('risk_flag')->nullable()->default(null);
            $table->string('affiliate')->nullable()->default(null);
            $table->string('sub_affiliate')->nullable()->default(null);
            $table->json('notes')->nullable()->default(null);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('prospects');
    }
}
