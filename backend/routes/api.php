<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TaskController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->post('/create-user', [AuthController::class, 'createUser']);

Route::middleware('auth:sanctum')->group(function () {
 
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/tasks', [TaskController::class, 'create']);
    Route::put('/tasks/{id}', [TaskController::class, 'update']);
    Route::delete('/tasks/{id}', [TaskController::class, 'delete']);
});

Route::middleware('auth:sanctum')->get('/users-created-by-me', [AuthController::class, 'getUsersCreatedByLoggedInUser']);

Route::middleware('auth:sanctum')->get('/tasks/assigned', [TaskController::class, 'getAssignedTasks']);
