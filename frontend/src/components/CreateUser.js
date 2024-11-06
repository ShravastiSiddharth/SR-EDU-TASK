import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const CreateUser = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      role: '',
    };

    let valid = true;

    if (!formData.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
      valid = false;
    } else if (!['0', '1'].includes(formData.role)) {
      newErrors.role = 'Role must be 0 (admin) or 1 (user)';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');

    // Ensure only users with role 0 (admin) can create a new user
    if (userRole !== '0') {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'You are not authorized to create users.',
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/create-user',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: 'success',
        title: 'User Created!',
        text: `User ${response.data.user.name} created successfully.`,
      });

      // Reset form data and hide the form
      setFormData({
        name: '',
        email: '',
        password: '',
        role: '',
      });
      setShowForm(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Something went wrong.',
      });
    }

    setIsLoading(false);
  };

  return (
    <div style={styles.container}>
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          style={styles.button}
        >
          Create User
        </button>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3 style={styles.formTitle}>Create a New User</h3>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={styles.input}
            />
            {errors.name && <span style={styles.error}>{errors.name}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.input}
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={styles.input}
            />
            {errors.password && <span style={styles.error}>{errors.password}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              style={styles.input}
            >
              <option value="">Select Role</option>
              <option value="0">Admin</option>
              <option value="1">User</option>
            </select>
            {errors.role && <span style={styles.error}>{errors.role}</span>}
          </div>

          <button type="submit" style={styles.submitButton} disabled={isLoading}>
            {isLoading ? 'Creating User...' : 'Create User'}
          </button>
        </form>
      )}
    </div>
  );
};

// Inline styling
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: '15px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
  },
};

export default CreateUser;
