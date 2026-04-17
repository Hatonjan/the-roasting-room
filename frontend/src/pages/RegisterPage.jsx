import '../styles/pages/RegisterPage.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    // Validate all fields are filled
    const newFieldErrors = {};
    if (!formData.username.trim()) newFieldErrors.username = 'Username is required';
    if (!formData.first_name.trim()) newFieldErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) newFieldErrors.last_name = 'Last name is required';
    if (!formData.email.trim()) newFieldErrors.email = 'Email is required';
    if (!formData.password) newFieldErrors.password = 'Password is required';
    if (!formData.password_confirm) newFieldErrors.password_confirm = 'Please confirm your password';

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setError('Please fill in all required fields');
      return;
    }

    // Validate password match
    if (formData.password !== formData.password_confirm) {
      setFieldErrors({ password_confirm: 'Passwords do not match' });
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 8) {
      setFieldErrors({ password: 'Password must be at least 8 characters' });
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      console.log('Attempting registration with:', {
        username: formData.username,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        api_url: `${API_BASE_URL}/api/users/register/`
      });

      const response = await fetch(`${API_BASE_URL}/api/users/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        // Redirect to login
        navigate('/login', { 
          state: { message: 'Account created successfully! Please log in.' } 
        });
      } else {
        console.log('Registration error - Status:', response.status);
        const errorData = await response.json();
        console.log('Registration error - Response:', errorData);
        
        // Handle field-specific errors from backend
        if (typeof errorData === 'object') {
          const newErrors = {};
          let generalError = '';
          
          Object.keys(errorData).forEach(field => {
            const fieldError = Array.isArray(errorData[field]) 
              ? errorData[field][0] 
              : errorData[field];
            
            if (field === 'non_field_errors' || field === 'detail') {
              generalError = fieldError;
            } else {
              newErrors[field] = fieldError;
            }
          });
          
          setFieldErrors(newErrors);
          setError(generalError || 'Registration failed. Please try again.');
        } else {
          setError(errorData.detail || 'Registration failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error registering:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">
      <div className="register-container">
        <div className="register-card">
          <h1 className="register-title">Create Your Account</h1>
          <p className="register-subtitle">Join us and start exploring our coffee selections.</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                className={fieldErrors.username ? 'input-error' : ''}
                required
              />
              {fieldErrors.username && <span className="field-error">{fieldErrors.username}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input 
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="John"
                  className={fieldErrors.first_name ? 'input-error' : ''}
                  required
                />
                {fieldErrors.first_name && <span className="field-error">{fieldErrors.first_name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={fieldErrors.last_name ? 'input-error' : ''}
                  required
                />
                {fieldErrors.last_name && <span className="field-error">{fieldErrors.last_name}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={fieldErrors.email ? 'input-error' : ''}
                required
              />
              {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  className={fieldErrors.password ? 'input-error' : ''}
                  required 
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password_confirm">Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPasswordConfirm ? 'text' : 'password'}
                  id="password_confirm"
                  name="password_confirm"
                  value={formData.password_confirm}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={fieldErrors.password_confirm ? 'input-error' : ''}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  title={showPasswordConfirm ? 'Hide password' : 'Show password'}
                >
                  {showPasswordConfirm ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {fieldErrors.password_confirm && <span className="field-error">{fieldErrors.password_confirm}</span>}
            </div>

            <button 
              type="submit" 
              className="register-btn"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="register-footer">
            <p>Already have an account? <Link to="/login">Log in here</Link></p>
          </div>
        </div>
      </div>
    </main>
  );
}
