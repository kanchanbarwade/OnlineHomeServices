import { useNavigate } from 'react-router-dom';
import Images from "../../images/image1_location.png"
import {toast} from 'react-toastify'
import {useState} from 'react'
import axios  from 'axios';
import config from '../config';
//config.serverURL+

const ForgotPassword =()=>{
    const  [userName, setUserName] = useState('')
    // const  [NewPassword, setNewPassword]= useState('')
    // const  [ConfirmPassword, setConfirmPassword]= useState('')
    const navigate = useNavigate()
  
    const forgotpassword =()=>{
        if(userName.length===0){
            toast.error('please enter email');
        }
        else {
         const url = config.serverURL+`/user/forgetpassword/${userName}`

           axios.post(url).then(
            function(res) {
                toast.success("Password sent to your email");
                navigate('../signin');
              }
        
           )
           .catch(function(error) {
            toast.error("Invalid User Name");
          })
        }
    }

    return (
    <div style={styles.container1}>
    <div style={{marginTop: 0}}>
     <div style={styles.container}>
      <div className='mb-3'>
          <label>Email?</label>
          <input onChange ={(e)=>{setUserName(e.target.value)}}
          className='form-control' type='email' placeholder="Enter your email"/>
      </div>

      {/* <div className='mb-3'>
          <label>New password</label>
          <input onChange ={(e)=>{setNewPassword(e.target.value)}}
          className='form-control' type='password' placeholder="Your New password"/>
      </div>

      <div className='mb-3'>
          <label>confirm password</label>
          <input onChange ={(e)=>{setConfirmPassword(e.target.value)}}
          className='form-control' type='password' placeholder="confirm your password"/>
      </div> */}

            <div className='mb3' style={{marginTop: 40}}>
            </div>
            
           <button style={styles.Button}
            onClick={forgotpassword}className=''>Submit
            </button>
            
       </div>
       
       </div>
    </div>
    
)
}

const styles ={
    container:{
        width:400, 
        height:350, 
        padding: 20,
        position: 'relative',
        backgroundColor:'white',
         top:100, 
         left: 0, 
         right:0, 
         bottom:0, 
         margin: "auto",
         borderColor: '#663399',
         borderRadius:10,
         borderWidth: 1,
         borderStyle: 'solid',
         boxShadow: '1px 1px 10px 1px white'
        
        },

        container1:{
            backgroundImage: `url(${Images})`,
            backgroundPosition: 'center',
            backgroundSize:'cover',
            backgroundRepeat:'no-repeat',
            width:'100%',
            height: '100vh',
            },

            Button: {
                position: 'relative',
                width: '100%',
                height: 40,
                backgroundColor: 'navy',
                color: 'white',
                borderRadius: 5,
                border: 'none',
                marginTop: 10,
              },
    
}
export default ForgotPassword