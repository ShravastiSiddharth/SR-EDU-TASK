<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Add a role column to store user roles (super_admin/user)
            $table->enum('role', ['0', '1'])->default('1');
            
            // Add a created_by column to reference the super admin who created the user
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            
            $table->dropColumn('role');
            $table->dropForeign(['created_by']);
            $table->dropColumn('created_by');
        });
    }
};
