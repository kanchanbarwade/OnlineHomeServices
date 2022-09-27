import {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import home from '../../images/home2.jpg';
import config from '../config';
//config.serverURL+

//import { fontSize } from '@mui/system';
//import { colors } from 'react-select/dist/declarations/src/theme';
//import UploadImage from '../uploadimage';


export default function AvailableService() {
    const [MyServices, setMyServices] = useState([]);
    //const navigate =useNavigate();
    
    useEffect(() => {
     servicelist();
  
    }, []);
  
   const servicelist=()=>{
    const url = config.serverURL+`/admin/services/showservices`;
  
  
    axios
      .get(url)
      .then((response) => {
        const res = response.data;
        console.log("result",res);
        setMyServices(res)
      })
   }

  return (
    <div style={styles.container1}>
      <center>
        <h3
          style={{
            color: "green",
            fontFamily: "sans-serif",
            fontWeight: 800,
            marginTop: 15,
            fontStyle: "oblique"
          }}
        >
          Available Home Services 
        </h3>
      </center>
    <div style={{marginTop:30}} >
      {MyServices.map((myservice) => {
        const imageUrl =config.serverURL+`/admin/image/download/${myservice.id}`
        return (
          <div
            key={myservice.id}
          
            className='col-3'
            style={{
              position: 'relative',
              padding: 10,
              display: 'inline-block',
              cursor: 'pointer',
              width:400,
              
            }}>
            
            <img 
              alt='service'
              style={{
                height: 300,
                width: 300,
                display: 'block',
                borderRadius: 10,
              }}
              src={imageUrl}
            />
            <div style={{ marginTop: 20 , color:"darkblue", fontFamily:'Helvetica'} } >
            <Link to ={'/bookservice/'+myservice.id} >
              <h5 className='card-title' style={{fontSize:30}}>{myservice.serviceName} </h5>
                <h6 style={{fontSize:20,  marginTop:5}}>
                {myservice.shortDesc}
                </h6>
                <h6 style={{fontSize:20}}> Rs. {myservice.serviceCharge} </h6>
                

              </Link>
            </div>
          </div>
        )
      })}
    </div>

</div>


  )
}


const styles = {

  
  container1: {
    // backgroundImage: `url(${home})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100vh"
  },
  

  };
