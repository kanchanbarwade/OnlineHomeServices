import {Link, useParams,useNavigate } from "react-router-dom";
import Button from "../../components/button";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify'
import config from '../config';
//config.serverURL+

function UpdateService() {
  //get id from url
  const params = useParams();
  const navigate = useNavigate(); 
  const [data, setData] = useState([]);
  const [serviceName, setserviceName] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [longDesc, setLongDesc] = useState('')
  const [serviceCharge, setserviceCharge] = useState('')
  const [serviceTax, setServiceTax ]= useState(0)

 
  useEffect(() => {
    console.log(params.id);
    servicelist();
  }, []);

  const servicelist = async () => {

    const url = config.serverURL+`/admin/services/${params.id}`;
    axios.get(url).then((response) => {
      console.log(response.data);
      const res = response.data
      setData(response.data);
      setserviceName(res.serviceName)
      setShortDesc(res.shortDesc)
      setLongDesc(res.longDesc)
      setserviceCharge(res.serviceCharge)
      setServiceTax(res.serviceTax)
    });
  };
  function updateservice(id) {
    //alert(id)
      
    const body = {
      serviceName,
      shortDesc,
      longDesc,
      serviceCharge,
      serviceTax,
    }
    console.log(body)
    //url to call service api
    const url=config.serverURL+`/admin/services/${id}`

    //axios api call
    axios.put(url,body).then((response)=>{
      const result = response.data;
      console.log("result",result)

      if(response['status']="success"){
        toast.success("Service Updated succcessfully!!");
        navigate('/services-list');
       

      }else{
        toast.error("Service cannot be updated");
      }
    })
    
  }
 

  return (
    <div className="container" style={{ marginTop: 20 }}>
      <Link className="nav-link active" aria-current="page" to="/admin">
      Admin Home
    </Link>
      <h3
        style={{
          textAlign: "center",
          marginBottom: 50,
          fontFamily: "revert-layer",
        }}
      >
        {" "}
        Update Service : {data.serviceName} 
      </h3>

      <div className="row">
        <div
          className="col"
          style={{ borderRightStyle: "solid", borderRightColor: "lightgray" }}
        >
          <div className="mb-3">
            <label>Service Title</label>
            <input
              onChange={(e) => {
                setserviceName(e.target.value)
              }}
              type="text"
              defaultValue={data.serviceName}
              className="form-control"
            ></input>
          </div>
          
          <div className="mb-3">
            <label>Short Description</label>
            <textarea
              onChange={(e) => {
                setShortDesc(e.target.value)
              }}
              rows={2}
              defaultValue={data.shortDesc}
              className="form-control"
            />
          </div>
          
          <div className="mb-3">
            <label>Long Desription</label>
            <textarea
              onChange={(e) => {
                setLongDesc(e.target.value)
              }}
              rows={6}
              defaultValue={data.longDesc}
              className="form-control"
            />
          </div>
        </div>

        <div className="col">
          
          <div className="mb-3">
            <label>Service Charge</label>
            <input
              onChange={(e) => {
                setserviceCharge(e.target.value)
              }}
              type="number"
              defaultValue={data.serviceCharge}
              className="form-control"
            ></input>
          </div>
          
          <div className="mb-3">
            <label>Service Tax</label>
            <input
              onChange={(e) => {
                setServiceTax(e.target.value)
              }}
              type="number"
              defaultValue={data.serviceTax}
              className="form-control"
            ></input>
          </div>
        </div>
      </div>

      <div className="row">
        <Button onClick={()=>updateservice(data.id)} title="Update " />
      </div>
    </div>
  );
}

export default UpdateService;
