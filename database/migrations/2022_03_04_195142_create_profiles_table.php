<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('profile_id');
            $table->string('account_id');
            $table->string('alias')->nullable()->default(null);
            $table->string('account_name')->nullable()->default(null);
            $table->string('currency_id')->nullable()->default(null);
            $table->string('currency_title')->nullable()->default(null);
            $table->string('currency_code')->nullable()->default(null);
            $table->string('currency_symbol_left')->nullable()->default(null);
            $table->json('global_fields')->nullable()->default(null)->comment('dynamic');
            $table->json('account_fields')->nullable()->default(null)->comment('dynamic');
            $table->json('fee_fields')->nullable()->default(null)->comment('dynamic');
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
        Schema::dropIfExists('profiles');
    }
}
