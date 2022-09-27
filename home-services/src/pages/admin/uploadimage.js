import React from 'react'
import { useState,useEffect } from 'react';

import { Link,useParams, useNavigate } from "react-router-dom";
import axios from 'axios'
import {toast} from 'react-toastify'
import Button from '../../components/button'
import config from '../config';
//config.serverURL+

export default function UploadImage() {
  const navigate = useNavigate();
   

    // used to keep the selected file
    const [file, setFile] = useState('')
    const params= useParams();
    console.log("params.id",params.id)

    const [MyServices, setMyServices] = useState([]);


    useEffect(() => {

        servicelist();

    }, [])

    const servicelist=()=>{
        const url = config.serverURL+`/admin/services/${params.id}`;
      
      
        axios
          .get(url)
          .then((response) => {
            const res = response.data;
            console.log(res);
            setMyServices(res)
          })
       }
       const handleimg=(e)=>{
        console.log(e.target.files[0])
        setFile(e.target.files[0])
       }

    const uploadImage=()=>{
        const formdata = new FormData()
        
        // add the file
        console.log(file)
        formdata.append('file', file)
        console.log("body",formdata)

        const url= config.serverURL+`/admin/services/${params.id}/upload`
        axios
          .post(url, formdata,{
           // headers: {
              //'Content-Type': 'multipart/form-data',
             // token: sessionStorage['token'],
           // },
          })
          .then((response) => {
            const result = response.data
            if (response['status'] === 'error') {
              toast.error('error while uploading file');
              //navigate('/my-homes')
            } else {
              toast.success('successfully uploaded a file');
              navigate('/services-list');
            }
          })
    }
  return (
    <div className='container'>
      <Link className="nav-link active" aria-current="page" to="/admin">
      Admin Home
    </Link>
      <h3 style={{ textAlign: 'center', margin: 20 }}>Upload Image</h3>

      <div className='mb-3'>
        <label>Select Image</label>
        <input
          className='form-control'
          type='file'
          onChange={handleimg}
        />
        <Button onClick={uploadImage} title='Upload Photo'></Button>
        
      </div>
    </div>
  )
}
