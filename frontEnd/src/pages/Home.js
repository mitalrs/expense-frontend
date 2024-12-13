import React from "react";
import { Container } from "@mui/system";
import TransactionForm from "../components/TransactionForm.js";
import TransactionsList from "../components/TransactionsList.js";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import TransactionChart from "../components/TransactionChart.js";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const token = Cookies.get("token");
    const res = await fetch(`${process.env.REACT_APP_API_URL}transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await res.json();
    setTransactions(data);
  }

  return (
    <Container>
        <TransactionChart data={transactions} />

      <TransactionForm
        fetchTransactions={fetchTransactions}
        editTransaction={editTransaction}
      />

      <TransactionsList
        data={transactions}
        fetchTransactions={fetchTransactions}
        setEditTransaction={setEditTransaction}
      />
    </Container>
  );
}
