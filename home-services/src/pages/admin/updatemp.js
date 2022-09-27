import React from "react";
import { toast } from "react-toastify";
import { Link,useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import config from '../config';
//config.serverURL+

export default function UpdateEmployee() {
  const params = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  //employee inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [deptName, setDeptName] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [salary, setSalary] = useState("");
  const [empStatus, setEmpStatus] = useState("");
  console.log(params);
  useEffect(() => {
    // load all the services created by admin
    employeelist();
  }, []);

  //get all emp
  const employeelist = () => {
    //create axios api to send data to server
    const url = config.serverURL+`/admin/employee/${params.id}`;

    axios.get(url).then(response => {
      const res = response.data;
      console.log("result in update", res);
      setData(res);
      setFirstName(res.firstName);
      setLastName(res.lastName);
      setPhoneNum(res.phoneNum);
      setDeptName(res.deptName);
      setHireDate(res.hireDate);
      setSalary(res.salary);
      setEmpStatus(res.empStatus);

    })
    .catch(error => {
      toast.error("Invalid credential");
       console.log(error);
     });
  };
  function updateemployee(id) {
    //alert(id)
    const body = {
      firstName,
      lastName,
      phoneNum,
      hireDate,
      salary,
      deptName,
      empStatus
    };

    console.log(body);

    const url = config.serverURL+`/admin/employee/${id}`;

    //axios api call
    axios.put(url, body).then(response => {
      const result = response.data;
      console.log("result", result.data);

      if ((result["status"] = "success")) {
        toast.success("Employee details Updated succcessfully!!");
        navigate("/list-employee");
      } else {
        toast.error("Employee details cannot be updated");
      }
    });
  }

  return (
    <div style={{ marginTop: 20 }}>
      <Link className="nav-link active" aria-current="page" to="/admin">
      Admin Home
    </Link>
      <h1 style={{ textAlign: "center", color: "navy" }}>
        Update Employee : {data.firstName}
      </h1>
      <div style={styles.container}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            defaultValue={data.firstName}
            onChange={e => {
              setFirstName(e.target.value);
            }}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input
            defaultValue={data.lastName}
            onChange={e => {
              setLastName(e.target.value);
            }}
            type="text"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Phone Number</label>
          <input
            defaultValue={data.phoneNum}
            onChange={e => {
              setPhoneNum(e.target.value);
            }}
            className="form-control"
            type="tel"
          />
        </div>
        <div className="mb-3">
          <label>Hire Date</label>
          <input
            defaultValue={data.hireDate}
            onChange={e => {
              setHireDate(e.target.value);
            }}
            className="form-control"
            type="date"
          />
        </div>
        <div className="mb-3">
          <label>Salary</label>
          <input
            defaultValue={data.salary}
            onChange={e => {
              setSalary(e.target.value);
            }}
            className="form-control"
            type="number"
          />
        </div>
        <div className="mb-3">
          <label>Service Name </label>
          <input
            defaultValue={data.deptName}
            onChange={e => {
              setDeptName(e.target.value);
            }}
            className="form-control"
            type="text"
          />
        </div>
        <div className="mb-3">
          <label>Hire Status </label>
          <input
            defaultValue={data.empStatus}
            onChange={e => {
                setEmpStatus(e.target.value);
            }}
            className="form-control"
            type="text"
          />
        </div>

        <div className="mb-3" style={{ marginTop: 40 }}>
          <button onClick={() => updateemployee(data.id)} style={styles.Button}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
const styles = {
  container: {
    width: 400,
    height: 580,
    padding: 20,
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    marginTop: 20,
    borderColor: "navy",
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: "solid",
    boxShadow: "1px 1px 20px 5px #C9C9C9"
  },
  Button: {
    position: "relative",
    width: "100%",
    height: 40,
    backgroundColor: "navy",
    color: "white",
    borderRadius: 5,
    border: "none",
    marginTop: 10
  }
};
