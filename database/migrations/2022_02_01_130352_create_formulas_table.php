<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFormulasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('formulas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable()->default(null);
            $table->string('name')->nullable()->default(null);
            $table->string('shortcut_name')->nullable()->default(null);
            $table->string('column_name')->nullable()->default(null);
            $table->unsignedBigInteger('campaign_id')->nullable()->default(null);
            $table->string('campaign_name')->nullable()->default(null);
            $table->string('expression')->nullable()->default(null);
            $table->longText('operands')->nullable()->default(null);
            $table->longText('operators')->nullable()->default(null);
            $table->string('is_applicable')->nullable()->default(null);
            $table->string('status')->nullable()->default(null);
            $table->timestamps();

            $table->unique(['user_id', 'name', 'campaign_id', 'expression']);
            $table->foreign("user_id")->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('formulas');
    }
}
