import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError(""); // Clear any previous errors
    try {
      const response = await axios.post('https://vaccine-backend.onrender.com/api/auth/register', {
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role
      });
      
      if (response.data && response.data.data) {
        login(response.data.data);
        navigate('/dashboard');
      } else {
        setError('Invalid response from server. Please try again.');
      }
    } catch (err: any) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (err.response.status === 409) {
          setError('An account with this email already exists.');
        } else if (err.response.status === 400) {
          setError('Invalid input. Please check your details and try again.');
        } else {
          setError(err.response.data?.error || 'An error occurred during registration. Please try again.');
        }
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: '500px',
        margin: 'auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
        Login Form
      </Typography>
      <TextField
        fullWidth
        label="Username"
        {...register('username', {
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username must be at least 10 characters',
          },
        })}
        error={Boolean(errors.username)}
         helperText="Username must be at least 10 characters"
        margin="normal"
      />
      <TextField
        fullWidth
        type="password"
        label="Password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        })}
        error={Boolean(errors.password)}
         helperText='Password must be at least 6 characters'
        margin="normal"
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        type="dob"
        label="DOB"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'DOM should contain DD/MM/YYYY',
          },
        })}
        error={Boolean(errors.password)}
         helperText='DOM should contain DD/MM/YYYY'
        margin="normal"
        sx={{ mt: 2 }}
      />
      <FormControlLabel
        control={<Checkbox {...register('provider')} color="primary" />}
        label="Provider"
        sx={{ mt: 1, textAlign: 'left' }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Register
      </Button>
    </Box>
  );
};

export default LoginForm;