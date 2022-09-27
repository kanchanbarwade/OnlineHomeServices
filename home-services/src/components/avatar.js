
import React from 'react'
import avatar from '../images/avatar.png'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";

export default function Avatar(props) {

  const navigate = useNavigate();
    const handleOpenUserMenu = (event) => {
    const userid= sessionStorage.getItem("user");
    if(userid==null)
    {
      toast.error("Please Sign In");
    }
    else
      navigate("/userdetails/"+userid)
    
  };
  return (
    <div >
  
      <img alt='avatar' src={avatar} 
      style={{width:'50px',borderRadius:'65%', objectFit:'contain' ,border: '1px solid black',cursor:'grab'}}
      onClick={handleOpenUserMenu}
      />

      </div>
  )
}

