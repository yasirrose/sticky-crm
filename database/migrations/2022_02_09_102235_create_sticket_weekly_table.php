<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSticketWeeklyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sticket_weekly', function (Blueprint $table) {
            $table->id();
            $table->date('week')->comment("week");
            $table->integer('volume')->nullable()->default(0)->comment("Volume");
            $table->integer('rebills')->nullable()->default(0)->comment("Rebills");
            $table->decimal('rebill_per', 10, 2)->nullable()->default(null)->comment("Rebill % ");
            $table->decimal('avg_day', 10, 2)->nullable()->default(null)->comment("AVG Day");
            $table->decimal('filled_per', 10, 2)->nullable()->default(0)->comment("Filled %");
            $table->decimal('avg_ticket', 10, 2)->nullable()->default(null)->comment('Avg Ticket');
            $table->decimal('revenue', 10, 2)->nullable()->default(null)->comment('Revenue');
            $table->decimal('refund', 10, 2)->nullable()->default(null)->comment('Refund');
            $table->decimal('refund_rate', 10, 2)->nullable()->default(null)->comment('Refund Rate');
            $table->integer('CBs')->nullable()->default(0)->comment('CBs');
            $table->decimal('CB_per', 10, 2)->nullable()->default(0)->comment('CB %');
            $table->decimal('CB_currency', 10, 2)->nullable()->default(null)->comment('CB $');
            $table->decimal('fulfillment', 10, 2)->nullable()->default(null)->comment('Fulfillment');
            $table->decimal('processing', 10, 2)->nullable()->default(null)->comment('Processing');
            $table->decimal('cpa', 10, 2)->nullable()->default(null)->comment('CPA');
            $table->decimal('cpa_avg', 10, 2)->nullable()->default(null)->comment('CPA AVG');
            $table->decimal('net', 10, 2)->nullable()->default(null)->comment('Net');
            $table->decimal('clv', 10, 2)->nullable()->default(null)->comment('CLV');
          
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
        Schema::dropIfExists('sticket_weekly');
    }
}
