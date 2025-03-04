import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';



export default function TransactionsList({ 
  data, 
  fetchTransactions, 
  setEditTransaction 
}) {

  const user = useSelector(state => state.auth.user);
  function categoryName(id) {
    const category = user.categories.find((category)=> category._id === id);

    return category ? category.label : 'NA';
  }

  async function remove(_id) {
    const token = Cookies.get('token');
    if (!window.confirm('Are you sure to delete')) return;
    const res = await fetch(`${process.env.REACT_APP_API_URL}transaction/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.ok) {
      fetchTransactions();
      window.alert("Deleted Successfully");
    }
  }

  function formatDate(date) {
    return dayjs(date).format("DD MMM, YYYY");
  }

  return (
    <>
      <Typography sx={{ marginTop: 10 }} variant="h6">List of Transactions</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, bgcolor:'#ffffff' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.map(month => (
                month.transactions.map((row) => {
                  return (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {row.amount}
                      </TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">{categoryName(row.category_id)}</TableCell>
                      <TableCell align="center">{formatDate(row.date)}</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" component="label" onClick={() => setEditTransaction(row)}>
                          <EditTwoToneIcon />
                        </IconButton>
                        <IconButton color="warning" component="label" onClick={() => remove(row._id)}>
                          <DeleteSharpIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })
              ))
            }
            
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}