import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Transact } from "../Model/Transaction.model";
import axios from "axios";

function Transactions() {
  const { groupId } = useParams<{ groupId: string }>();
  const [transactions, setTransac] = useState<Transact[]>([]);

  useEffect(() => {
    axios
      .get<Transact[]>(`http://localhost:5257/api/Transaction/${groupId}`)
      .then((response) => {
        setTransac(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [groupId]);
  return (
    <div className="container">
      <h3>Transactions</h3>
      <table className="table table-striped table-hover table-borderless table-primary align-middle">
        <thead className="table-dark">
          <tr>
            <th>Payer</th>
            <th>Amount</th>
            <th>Split method</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {transactions.map((item) => (
            <tr key={item.id}className="table-primary">
              <td>{item.payer.name}</td>
              <td>{item.amount}</td>
              <td>{item.split}</td>
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}
export default Transactions;
