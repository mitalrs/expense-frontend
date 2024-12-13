import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone.js';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp.js';
import IconButton from '@mui/material/IconButton';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import { setUser } from '../store/auth.js';
import CategoryForm from '../components/CategoryForm.js';



export default function Category() {
    const token = Cookies.get('token');

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const [editCategory, setEditCategory] = React.useState({})

    function setEdit(category) {
        setEditCategory(category);
    }

    async function remove(id) {
        const res = await fetch(`${process.env.REACT_APP_API_URL}category/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if(res.ok){
        const _user = {
            ...user,
            categories: user.categories.filter((cat) => cat._id != id)
        }
        dispatch(setUser(_user));
        }
    }

    return (
        <Container>
            <CategoryForm editCategory={editCategory} />
            <Typography sx={{ marginTop: 10 }} variant="h6">List of Categories</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, bgcolor:'#8a85aa' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Lable</TableCell>
                            <TableCell align="center">Icon</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user?.categories.map((row) => {
                            return (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" component="th" scope="row">
                                        {row.label}
                                    </TableCell>
                                    <TableCell align="center">{row.icon}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            color="primary"
                                            component="label"
                                         onClick={() => setEdit(row)}
                                        >
                                            <EditTwoToneIcon />
                                        </IconButton>
                                        <IconButton
                                            color="warning"
                                            component="label"
                                            onClick={() => remove(row._id)}
                                        >
                                            <DeleteSharpIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}