import { useState, useEffect } from "react";
import { useNavigate,Link } from 'react-router-dom'
import axios from "axios";
import { toast } from "react-toastify";
// import UpdateService from "./updateservice";
import config from '../config';
//config.serverURL+

const ServiceList = () => {
  const [MyServices, setMyServices] = useState([]);
  const navigate =useNavigate();
  
  useEffect(() => {
   servicelist();

  }, []);

 const servicelist=()=>{
  const url = config.serverURL+`/admin/services/showservices`;


  axios
    .get(url)
    .then((response) => {
      const res = response.data;
      console.log(res);
      setMyServices(res)
    })
    .catch(error => {
      //toast.error("Empty");
       console.log(error);
     });
 }

  //delete any services
  const deletservice = (id) => {
    const url = config.serverURL+`/admin/services/${id}`;

    axios.delete(url,id).then((response)=>{
      console.log(id)
      console.log(response)
      servicelist()
    })
    .catch(()=>
    {
        toast.error("Can not delete");
    }
    )
  };

   return (
    <div className="container">
      <Link className="nav-link active" aria-current="page" to="/admin">
      Admin Home
    </Link>
      <h1 style={{ textAlign: "center", color: "navy" }}>Service List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Short Description</th>
            <th>Charges</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {MyServices.map((MyService) => {
            console.log("my service " + MyService);
            return (
              <tr>
                <td>{MyService.serviceName}</td>
                <td>{MyService.shortDesc}</td>
                <td>{MyService.serviceCharge}</td>
                <td>
                <Link to ={'/updateservice/'+MyService.id} >
                  <button 
                  //onClick={() => editservice(MyService.id)}
                    style={styles.button}
                    className="btn btn-sm btn-success"
                  >
                    Edit
                  </button>
                  </Link>
                  <button
                    onClick={() => deletservice(MyService.id)}
                    style={styles.button}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                  <Link to ={'/uploadimage/'+MyService.id} >
                  <button 
                  
                    style={styles.button}
                    className="btn btn-sm btn-warning"
                  >
                    Upload Image
                  </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  h3: {
    textAlign: "center",
    margin: 20,
  },
  button: {
    marginRight: 10,
  },
};
export default ServiceList;


