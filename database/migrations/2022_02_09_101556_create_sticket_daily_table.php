<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSticketDailyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sticket_daily', function (Blueprint $table) {
            $table->id();
            $table->date('date')->nullable()->default(null)->comment("Date");
            $table->integer('initials')->nullable()->default(0)->comment("Initials");
            $table->integer('decline')->nullable()->default(0)->comment("Decline");
            $table->decimal('decline_per', 10, 2)->nullable()->default(0)->comment("Decline %");
            $table->decimal('scrub_per', 10, 2)->nullable()->default(0)->comment("Scrub %");
            $table->integer('EOT_declines')->nullable()->default(0)->comment("EOT Declines");
            $table->integer('EOT_approved')->nullable()->default(0)->comment("EOT Approved");
            $table->decimal('EOT_per', 10, 2)->nullable()->default(0)->comment("EOT %");

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
        Schema::dropIfExists('sticket_daily');
    }
}
