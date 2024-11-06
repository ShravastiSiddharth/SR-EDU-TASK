<?php

namespace App\Repositories;

use App\Models\Task;

class TaskRepository
{
    public function create(array $data): Task
    {
        return Task::create($data);
    }

    public function findById(int $id): ?Task
    {
        return Task::find($id);
    }

    public function update(int $id, array $data): bool
    {
        $task = $this->findById($id);
        if ($task) {
            return $task->update($data);
        }
        return false;
    }

    public function delete(int $id): bool
    {
        $task = $this->findById($id);
        if ($task) {
            return $task->delete();
        }
        return false;
    }

    public function findAllByUser(int $userId)
    {
        return Task::where('user_id', $userId)->get();
    }

    public function findAllAssignedToUser(int $userId)
{
    // Fetch tasks where the assigned_to field matches the user ID
    return Task::where('assigned_to', $userId)->get();
}

}
