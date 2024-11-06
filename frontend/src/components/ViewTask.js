import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ViewTask = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    const apiUrl = 'http://localhost:8000/api/tasks/assigned'; // Adjusted to the assigned tasks API

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
            }}>Your Assigned Tasks</h1>

            {error && <div style={{
                color: 'red',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '10px'
            }}>{error}</div>}

            {tasks.length === 0 ? (
                <p style={{
                    textAlign: 'center',
                    fontSize: '1.1rem',
                    color: '#666'
                }}>You don't have any tasks assigned to you.</p>
            ) : (
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
                                
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ViewTask