<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\SoftDeletes;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id')->nullable()->default(null);
            $table->string('email')->nullable()->default(null);
            $table->unsignedBigInteger('origin_id')->nullable()->default(null);
            $table->integer('is_member')->nullable()->default(null);
            $table->string('first_name')->nullable()->default(null);
            $table->string('last_name')->nullable()->default(null);
            $table->string('phone')->nullable()->default(null);
            $table->string('phone_key')->nullable()->default(null);
            $table->json('custom_fields')->nullable()->default(null);
            $table->json('addresses')->nullable()->default(null);
            $table->json('notes')->nullable()->default(null);
            $table->integer('is_sms_communication_enabled')->nullable()->default(null);
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
        Schema::dropIfExists('customers');
    }
}
