import { useForm } from 'react-hook-form';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { keyframes } from '@mui/system';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  animation: `${fadeIn} 0.6s ease-out`,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const LoginForm = () => {
    const [value, setValue] = useState("");
    const [valid, setValid] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setError(""); // Clear any previous errors
        try {
            const response = await axios.post('https://vaccine-backend.onrender.com/api/auth/login', {
                email: data.username,
                password: data.password
            });
            
            if (response.data && response.data.status === 'success' && response.data.data) {
                const { user, token } = response.data.data;
                login({ user, token }); // Pass both user and token to login function
                
                // Navigate based on user role
                if (user.role === 'provider') {
                    navigate('/provider_dashboard');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setError('Invalid response from server. Please try again.');
            }
        } catch (err: any) {
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (err.response.status === 401) {
                    setError('Invalid email or password. Please try again.');
                } else if (err.response.status === 404) {
                    setError('Server not found. Please try again later.');
                } else {
                    setError(err.response.data?.error || 'An error occurred during login. Please try again.');
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

    const handleValidation = (e:any) => {
        //set value to user input
        setValue(e.target.value);
        
        //define regex     
        const reg = new RegExp("[a-z]");
        
        //test whether input is valid
        setValid(reg.test(e.target.value));
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: 2,
            }}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <StyledPaper elevation={3}>
                    <Box sx={{ mb: 3, textAlign: 'center' }}>
                        <MedicalServicesIcon sx={{ fontSize: 60, color: 'primary.main', mb: 1 }} />
                        <Typography variant="h4" component="h1" gutterBottom>
                            Vaccine & Immunization
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Tracking System
                        </Typography>
                    </Box>

                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ width: '100%', maxWidth: 400 }}
                    >
                        <StyledTextField
                            fullWidth
                            label="Email"
                            {...register('username', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                            error={Boolean(errors.username)}
                            helperText={errors.username?.message?.toString()}
                            variant="outlined"
                            margin="normal"
                        />

                        <StyledTextField
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
                            helperText={errors.password?.message?.toString()}
                            variant="outlined"
                            margin="normal"
                        />

                        <FormControlLabel
                            control={<Checkbox {...register('rememberMe')} color="primary" />}
                            label="Provider"
                            sx={{ mb: 2 }}
                        />

                        {error && (
                            <Typography color="error" sx={{ mb: 2 }}>
                                {error}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={isLoading}
                            sx={{
                                mt: 2,
                                mb: 2,
                                py: 1.5,
                                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                                },
                            }}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </Button>

                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Link href="/signUp" variant="body2" sx={{ textDecoration: 'none' }}>
                                Don't have an account? Sign Up
                            </Link>
                        </Box>
                    </Box>
                </StyledPaper>
            </motion.div>
        </Box>
    );
};

export default LoginForm;