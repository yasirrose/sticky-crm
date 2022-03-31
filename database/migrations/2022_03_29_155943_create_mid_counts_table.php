<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMidCountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mid_counts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('gateway_id');
            $table->string('gateway_alias')->nullable()->default(null);
            $table->integer('mid_count')->nullable()->default(0);
            $table->json('mid_count_data')->nullable()->default(null);
            $table->unique(['gateway_id', 'gateway_alias']);
            $table->foreign("gateway_id")->references('gateway_id')->on('mids');
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
        Schema::dropIfExists('mid_counts');
    }
}
