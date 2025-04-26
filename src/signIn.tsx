import { useForm } from 'react-hook-form';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const LoginForm = () => {
    const [value, setValue] = useState("");
    const [valid, setValid] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dashboard = () => {
        // const fetchApi = async () => {
        // }
        //Redux value store base rendering dashboard
        // if (this.props.getDataReducer.items && this.props.getDataReducer.items.length >= 0) {

        // }
        // else{

        // }
        window.location.replace("/dashboard")
        // window.location.replace("/provider_dashboard")
    }

    const onSubmit = (data: any) => {
        // Add your login logic here using the data object
        console.log('Login successful', data);
    };

    const handleValidation = (e: any) => {
        //set value to user input
        setValue(e.target.value);

        //define regex     
        const reg = new RegExp("[a-z]");

        //test whether input is valid
        setValid(reg.test(e.target.value));
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
                Vaccine & Immunization Tracking System
            </Typography>
            <TextField
                fullWidth
                label="Username"
                {...register('username', {
                    required: 'Username is required',
                    minLength: {
                        value: 10,
                        message: 'Username must be at least 8 characters',
                    },
                })}
                onChange={(e) => handleValidation(e)}
                error={Boolean(errors.username)}
                helperText={valid}
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
            <FormControlLabel
                control={<Checkbox {...register('rememberMe')} color="primary" />}
                label="Provider"
                sx={{ mt: 1, textAlign: 'left' }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={dashboard}>
                Login
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Box mt={1}>
                    <Link href="/signUp" variant="body2">
                        New user Registration
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginForm;