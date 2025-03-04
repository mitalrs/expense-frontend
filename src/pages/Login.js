import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import {Link as RouterLink} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined.js';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
import { setUser } from '../store/auth.js';
import { useDispatch } from 'react-redux';
import theme from '../components/CreateThemeMui.js';
import { ThemeProvider } from "@mui/material/styles";



export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const form = {
            email: data.get('email'),
            password: data.get('password'),
        };
        
        
        const res = await fetch(`${process.env.REACT_APP_API_URL}auth/login`, {
            method:'POST',
            body:JSON.stringify(form),
            headers: {
                'content-type': "application/json",
            },
        });

        const { token, user } = await res.json()


        if(res.ok){
            Cookies.set('token', token)
            dispatch(setUser(user))
            navigate("/");
        }
    };

    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" sx={{bgcolor:'#ffffff'}}>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: '#D19D00' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{color:'#000000'}}>
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2,bgcolor:'#201b5b', color:'#9c97b8'}}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <RouterLink to="/register" sx={{bgcolor:'#201b5b'}}>
                            <Link component="span" variant="body2" sx={{color:'#201b5b'}}>
                                {"Don't have an account? Register"}
                            </Link>
                            </RouterLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
        </ThemeProvider>
    );
}
