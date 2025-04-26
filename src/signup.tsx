import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data:any) => {
    // Add your login logic here using the data object
    console.log('Login successful', data);
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