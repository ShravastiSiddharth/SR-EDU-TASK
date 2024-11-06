<?php 


namespace App\Services;

use App\Repositories\TaskRepository;
use Illuminate\Support\Facades\Auth;

class TaskService
{
    protected $taskRepository;

    public function __construct(TaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function createTask(array $data)
    {
        // Ensure the 'assigned_to' field is handled if it's provided
        $data['user_id'] = Auth::id();
        $data['created_by'] = Auth::id();   // Ensure the task is assigned to the current authenticated user
        return $this->taskRepository->create($data);
    }
    

    public function updateTask(int $id, array $data)
    {
        $task = $this->taskRepository->findById($id);

       
        if ($task && $task->user_id === Auth::id()) {
            return $this->taskRepository->update($id, $data);
        }

        return false;
    }

    public function deleteTask(int $id)
    {
        $task = $this->taskRepository->findById($id);

       
        if ($task && $task->user_id === Auth::id()) {
            return $this->taskRepository->delete($id);
        }

        return false;
    }

    public function getUserTasks()
    {
        return $this->taskRepository->findAllByUser(Auth::id());
    }

    public function getAssignedTasks()
{
    // Fetch tasks where the assigned_to field matches the authenticated user
    return $this->taskRepository->findAllAssignedToUser(Auth::id());
}

}
