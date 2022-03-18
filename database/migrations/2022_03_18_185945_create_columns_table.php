<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateColumnsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('columns', function (Blueprint $table) {
            $table->id()->index();
            $table->string('name')->nullable()->default(null);
            $table->string('property')->nullable()->default(null);
            $table->boolean('visible')->nullable()->default(0);
            $table->boolean('isModelProperty')->nullable()->default(0);
            $table->string('table')->nullable()->default(null);
            $table->unique(['name', 'table']);
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
        Schema::dropIfExists('columns');
    }
}
