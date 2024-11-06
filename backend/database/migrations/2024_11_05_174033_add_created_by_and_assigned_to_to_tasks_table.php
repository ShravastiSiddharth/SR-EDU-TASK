<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        Schema::table('tasks', function (Blueprint $table) {
            // Add created_by column to reference the super admin who created the task
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            
            // Add assigned_to column to reference the user who is assigned the task
            $table->foreignId('assigned_to')->nullable()->constrained('users')->onDelete('set null');
        });

        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        
        Schema::table('tasks', function (Blueprint $table) {
            // Drop the created_by and assigned_to columns
            $table->dropForeign(['created_by']);
            $table->dropForeign(['assigned_to']);
            $table->dropColumn(['created_by', 'assigned_to']);
        });

        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
};
