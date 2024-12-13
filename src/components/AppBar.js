import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/auth.js'
import theme from './CreateThemeMui.js';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  function _logout() {
    Cookies.remove('token');
    dispatch(logout())
    navigate("/login");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
      <AppBar position="static">
      <CssBaseline />
        <Toolbar style={{backgroundColor:'#201b5b'}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className='text-white' to="/">EXTRADEX</Link>
          </Typography>
          <Link to="/category" className='text-white'>
                  <Button color="white">category</Button>
                </Link>
          {isAuthenticated && (
            <Button color="white" onClick={_logout}>Logout</Button>
          )}

          {
            !isAuthenticated && (
              <>
                <Link to="/login" className='text-white'>
                  <Button color="white">Login</Button>
                </Link>

                <Link to="/register" className='text-white'>
                  <Button color="white">Register</Button>
                </Link>
              </>
            )}

        </Toolbar>
      </AppBar>
      </ThemeProvider>
    </Box>
  );
}