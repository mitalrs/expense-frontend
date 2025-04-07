import React from "react";
import { Container } from "@mui/system";
import TransactionForm from "../components/TransactionForm.js";
import TransactionsList from "../components/TransactionsList.js";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import TransactionChart from "../components/TransactionChart.js";
import dummydata from "../jsonData/TransactionListData.json"
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useNavigate } from "react-router-dom";


export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});
  const auth = useSelector(state => state.auth)
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, [auth.isAuthenticated]);

  async function fetchTransactions() {
    if (!auth.isAuthenticated) {
      setTransactions(dummydata);
    } else {
      const token = Cookies.get("token");
      const res = await fetch(`${process.env.REACT_APP_API_URL}transaction`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = await res.json();
      setTransactions(data);
    }
  }

  function createTransaction() {
    const confirmed = window.confirm("If you want to create a transaction, please login");
    if (confirmed) {
      navigate("/login");
    }
  }


  return (
    <Container>
      <TransactionChart data={transactions} />

      {auth.isAuthenticated ? (
        <TransactionForm
          fetchTransactions={fetchTransactions}
          editTransaction={editTransaction}
        />
      ) :
        (
          <Card sx={{ minWidth: 275, marginTop: 10,  boxShadow: 'none'}}>
            <Button variant="contained" sx={{ bgcolor: '#201b5b' }} onClick={() => createTransaction()}>Create</Button>
          </Card>
        )
      }


      <TransactionsList
        data={transactions}
        fetchTransactions={fetchTransactions}
        setEditTransaction={setEditTransaction}
      />
    </Container>
  );
}
