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
        $data['user_id'] = Auth::id();
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
}
