import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const TaskComponent = () => {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [assignedTo, setAssignedTo] = useState('');  // new state for assigned user
    const [users, setUsers] = useState([]);  // state to store users for the dropdown
    const [editingTask, setEditingTask] = useState(null);
    const [error, setError] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const apiUrl = 'http://localhost:8000/api/tasks';
    const usersApiUrl = 'http://localhost:8000/api/users-created-by-me';

    // Fetch the list of users created by the logged-in admin
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get(usersApiUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data.users);
            } catch (error) {
                setError('Failed to fetch users. Please try again later.');
            }
        };

        fetchUsers();
    }, []);

    // Fetch tasks when the component is mounted
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTasks(response.data.tasks);
            } catch (error) {
                setError('Failed to fetch tasks. Please try again later.');
            }
        };

        fetchTasks();
    }, []);

    // Handle task creation
    const handleCreateTask = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.post(
                apiUrl,
                { task_name: taskName, description, status, assigned_to: assignedTo },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTasks([...tasks, response.data.task]);
            setTaskName('');
            setDescription('');
            setStatus('pending');
            setAssignedTo('');
            setIsFormVisible(false);
            Swal.fire('Success', 'Task created successfully!', 'success');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to create task');
            Swal.fire('Error', 'Failed to create task', 'error');
        }
    };

    // Handle task update
    const handleUpdateTask = async (e) => {
        e.preventDefault();
        if (!editingTask) return;

        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.put(
                `${apiUrl}/${editingTask.id}`,
                { task_name: taskName, description, status, assigned_to: assignedTo },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const updatedTasks = tasks.map((task) =>
                task.id === editingTask.id ? response.data.task : task
            );
            setTasks(updatedTasks);
            setTaskName('');
            setDescription('');
            setStatus('pending');
            setAssignedTo('');
            setEditingTask(null);
            setIsFormVisible(false);
            Swal.fire('Success', 'Task updated successfully!', 'success');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update task');
            Swal.fire('Error', 'Failed to update task', 'error');
        }
    };

    // Handle task deletion
    const handleDeleteTask = async (taskId) => {
        const token = localStorage.getItem('authToken');
        try {
            await axios.delete(`${apiUrl}/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(tasks.filter((task) => task.id !== taskId));
            Swal.fire('Deleted', 'Task deleted successfully!', 'success');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to delete task');
            Swal.fire('Error', 'Failed to delete task', 'error');
        }
    };

    // Handle task edit
    const handleEditTask = (task) => {
        setTaskName(task.task_name);
        setDescription(task.description);
        setStatus(task.status);
        setAssignedTo(task.assigned_to || '');  // Set the assigned user if available
        setEditingTask(task);
        setIsFormVisible(true);
    };

    // Handle creating a new task
    const handleCreateNewTask = () => {
        setTaskName('');
        setDescription('');
        setStatus('pending');
        setAssignedTo('');
        setEditingTask(null);
        setIsFormVisible(true);
    };

    return (
        <div style={{
            margin: '20px auto',
            maxWidth: '600px',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        }}>
            <h1 style={{
                textAlign: 'center',
                color: '#333',
                marginBottom: '15px',
                fontSize: '1.5rem',
            }}>Your Tasks</h1>

            {error && <div style={{
                color: 'red',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '10px'
            }}>{error}</div>}

            <button
                onClick={handleCreateNewTask}
                style={{
                    padding: '10px 20px',
                    fontSize: '1rem',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    transition: 'background-color 0.3s ease',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
            >
                Create New Task
            </button>

            {isFormVisible && (
                <form onSubmit={editingTask ? handleUpdateTask : handleCreateTask} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    maxWidth: '500px',
                    margin: '0 auto',
                    padding: '15px',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                }}>
                    <div>
                        <label htmlFor="taskName" style={{
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            color: '#555',
                            display: 'block',
                            marginBottom: '6px'
                        }}>Task Name</label>
                        <input
                            id="taskName"
                            type="text"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '8px',
                                fontSize: '0.9rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                outline: 'none',
                                transition: 'border-color 0.3s ease',
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#007BFF'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                    </div>

                    <div>
                        <label htmlFor="description" style={{
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            color: '#555',
                            display: 'block',
                            marginBottom: '6px'
                        }}>Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '8px',
                                fontSize: '0.9rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                outline: 'none',
                                height: '70px',
                                transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#007BFF'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                    </div>

                    <div>
                        <label htmlFor="status" style={{
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            color: '#555',
                            display: 'block',
                            marginBottom: '6px'
                        }}>Status</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '8px',
                                fontSize: '0.9rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                outline: 'none',
                                transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#007BFF'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        >
                            <option value="pending">Pending</option>
                            <option value="started">Started</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="assignedTo" style={{
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            color: '#555',
                            display: 'block',
                            marginBottom: '6px'
                        }}>Assign To</label>
                        <select
                            id="assignedTo"
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '8px',
                                fontSize: '0.9rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                outline: 'none',
                                transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#007BFF'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        >
                            <option value="">Select User</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" style={{
                        padding: '8px 16px',
                        fontSize: '1rem',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                        fontWeight: 'bold',
                        marginTop: '10px',
                    }} onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#007BFF'}>
                        {editingTask ? 'Update Task' : 'Create Task'}
                    </button>
                </form>
            )}

            {tasks.length > 0 ? (
                <ul style={{
                    marginTop: '30px',
                    listStyleType: 'none',
                    padding: '0'
                }}>
                    {tasks.map((task) => (
                        <li key={task.id} style={{
                            padding: '12px',
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                            marginBottom: '15px'
                        }}>
                            <h3 style={{
                                margin: '0',
                                fontSize: '1rem',
                                color: '#333',
                                fontWeight: 'bold'
                            }}>{task.task_name}</h3>
                            <p style={{
                                margin: '8px 0',
                                fontSize: '0.95rem',
                                color: '#555'
                            }}>{task.description}</p>
                            <p style={{
                                marginBottom: '8px',
                                fontSize: '0.95rem',
                                color: task.status === 'completed' ? 'green' : task.status === 'started' ? 'orange' : 'red',
                                fontWeight: 'bold'
                            }}>
                                Status: {task.status}
                            </p>
                            <p style={{
                                marginBottom: '8px',
                                fontSize: '0.95rem',
                                fontWeight: 'bold'
                            }}>
                                Assigned To: {task.assigned_to ? task.assigned_to.name : 'Not assigned'}
                            </p>
                            <div style={{
                                display: 'flex',
                                gap: '8px'
                            }}>
                                <button
                                    onClick={() => handleEditTask(task)}
                                    style={{
                                        padding: '6px 12px',
                                        fontSize: '0.85rem',
                                        backgroundColor: '#f0ad4e',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#ec971f'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#f0ad4e'}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteTask(task.id)}
                                    style={{
                                        padding: '6px 12px',
                                        fontSize: '0.85rem',
                                        backgroundColor: '#d9534f',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#c9302c'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#d9534f'}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{
                    textAlign: 'center',
                    fontSize: '1.1rem',
                    color: '#666'
                }}>You don't have any tasks.</p>
            )}
        </div>
    );
};

export default TaskComponent;
