import React from "react";
import { useEffect,useState } from "react";
import axios  from 'axios';
import { useParams } from 'react-router-dom';
import Button from '../../components/button'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import config from '../config';
//config.serverURL+

export default function UpdateUser() {
  const params = useParams()
  const [user,setUser]= useState();
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const [dob, setDob] = useState("");

  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
   
    userdetails();
  }, []);

  const userdetails = () => {
    
        const url =config.serverURL+`/user/${params.id}` 
        axios.get(url).then
        (response=>{
            const result = response.data
            console.log("result",result)
            setUser(result)
            setFirstName(result.firstName)
            setLastName(result.lastName)
            setEmail(result.email)
            setPhoneNumber(result.phone)
            setPassword(result.password)
            setconfirmPassword(result.password)
            setHouseNo(result.houseNo)
            setStreet(result.street)
            setCity(result.city)
            setState(result.state)
            setPincode(result.pincode)
            setRole(result.role)
        })
  };
 function update(id) {
    //alert(id)
    if(password!==confirmPassword)
    {
      toast.error("Password and Confirm Password should be same");
    }
    else
    {
    const body = {
      firstName,
      lastName,
      email,
      password,
      phone,
      dob,
      houseNo,
      street,
      city,
      state,
      pincode,
      role
    }
    const url = config.serverURL+`/user/${id}`

    axios.put(url,body).then(response=>{
      const result = response.data
      console.log("updated",result)
      if(response['status']===200){
        toast.success("Profile Updated")
        navigate("/userdetails/"+id)
      }else{
        toast.error("Try again!!")
      }
    })
    .catch(()=>
    {
      toast.error("Profile Not Updated");
    });
  }
 }
  return (
    <div className="row">
     <h1 style={{ textAlign: "center", color: "navy" }}>Update Profile</h1>
    <div
      className="col"
      style={{ borderRightStyle: "solid", borderRightColor: "lightgray" }}
    >
      <label>First Name </label>
      <input
      defaultValue={user?.firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
        className="form-control"
        type="text"
       
      />

      <label>Last Name</label>
      <input
      defaultValue={user?.lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        className="form-control"
        type="text"
       
      />

      <label>Phone Number</label>
      <input
      defaultValue={user?.phone}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
        className="form-control"
        type="tel"
        
      />

      <label>Email</label>
      <input
      defaultValue={user?.email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="form-control"
        type="email"
              
        />

      <label>Password</label>
      <input
      defaultValue={user?.password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="form-control"
        type="password"
        required
      />

      <label>Confirm Password</label>
      <input
      defaultValue={user?.confirmPassword}
        onChange={(e) => {
          setconfirmPassword(e.target.value);
        }}
        className="form-control"
        type="password"
        required
      />
    </div>

    <div className="col">
      <label>DOB</label>
      <input
      defaultValue={user?.dob}
        onChange={(e) => {
          setDob(e.target.value);
        }}
        className="form-control"
        type="text"
        
      />

      <label>House No</label>
      <input
      defaultValue={user?.houseNo}
        onChange={(e) => {
          setHouseNo(e.target.value);
        }}
        className="form-control"
        type="text"
        
      />

      <label>Street</label>
      <input
      defaultValue={user?.street}
        onChange={(e) => {
          setStreet(e.target.value);
        }}
        className="form-control"
        type="text"
       
      />

      <label>City</label>
      <input
      defaultValue={user?.city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
        className="form-control"
        type="text"
        
      />

      <label>State</label>
      <input
      defaultValue={user?.state}
        onChange={(e) => {
          setState(e.target.value);
        }}
        className="form-control"
        type="text"
        
      />

      <label>Pincode</label>
      <input
      defaultValue={user?.pincode}
        onChange={(e) => {
          setPincode(e.target.value);
        }}
        className="form-control"
        type="text"
        
      />
    </div>

    <div className="row">
        <Button onClick={()=>update(user?.id)} title="Update " />
      </div>
  </div>
  // </div>
  )
}
