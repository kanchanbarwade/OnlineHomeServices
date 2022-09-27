import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {Link, useNavigate } from 'react-router-dom';
import config from '../config';
//config.serverURL+

export default function ShowPending() {
  const [Orders, setOrders] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    pending();
  }, []);
  const pending = () => {
    const url = config.serverURL+`/admin/orders/pending`;
    axios.get(url).then((response) => {
      const result = response.data;
      console.log("result", result);
      setOrders(result)
    })
    .catch(error => {
     // toast.error("Empty");
       console.log(error);
     });;
  };

  const back=()=>{
    navigate("/showallbookedservices")
  }
  return (
    <div className="container">
      <Link className="nav-link active" aria-current="page" to="/admin">
      Admin Home
    </Link>
      <h1 style={{ textAlign: "center", color: "navy", marginTop: 30 }}>
        Services Booked{" "}
      </h1>
      <table className="table table-striped" style={{ marginTop: 30 }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Customer Name</th>
            <th>Service Name</th>
            <th>Employee Name</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {Orders.map((order) => {
            return (
              <tr>
                <td>{order.id}</td>
                <td>{order.user.firstName}</td>
                <td>{order.service.serviceName}</td>
                <td>{order.emp.firstName}</td>
                <td>{order.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={back} style={styles.Button} className="">
          Back
        </button>
      </div>
    </div>
  );
}
const styles = {
  Button: {
    position: "relative",
    width: "12%",
    height: 40,
    backgroundColor: "navy",
    color: "white",
    borderRadius: 5,
    border: "none",
    marginTop: 10,
    marginLeft: 20,
  },
};
