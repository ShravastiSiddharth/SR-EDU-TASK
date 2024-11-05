<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TaskService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    protected $taskService;

    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'task_name' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|string|in:pending,completed,started',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $task = $this->taskService->createTask($request->all());
        return response()->json(['task' => $task], 201);
    }

    public function update($id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'task_name' => 'string|max:255',
            'description' => 'string',
            'status' => 'string|in:pending,completed,started',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $task = $this->taskService->updateTask($id, $request->all());

        if ($task) {
            return response()->json(['task' => $task], 200);
        }

        return response()->json(['message' => 'Task not found or unauthorized'], 404);
    }

    public function delete($id)
    {
        $task = $this->taskService->deleteTask($id);

        if ($task) {
            return response()->json(['message' => 'Task deleted successfully'], 200);
        }

        return response()->json(['message' => 'Task not found or unauthorized'], 404);
    }

    public function index()
    {
        $tasks = $this->taskService->getUserTasks();
        return response()->json(['tasks' => $tasks], 200);
    }
}
