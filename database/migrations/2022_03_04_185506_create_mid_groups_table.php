<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMidGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mid_groups', function (Blueprint $table) {
            $table->id()->index();
            $table->string('group_name');
            $table->string('group_alias')->nullable()->default(null);
            $table->string('assigned_mids')->nullable()->default(null);
            $table->string('gross_revenue')->nullable()->default(null);
            $table->string('bank_per')->nullable()->default(20);
            $table->string('target_bank_balance')->nullable()->default(null);
            $table->string('status')->nullable()->default(null);
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
        Schema::dropIfExists('mid_groups');
    }
}
