<?php

namespace App\Repositories;

use App\Models\Task;

interface TaskRepositoryInterface
{
    public function create(array $data): Task;
    public function findById(int $id): ?Task;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
    public function findAllByUser(int $userId);
}
