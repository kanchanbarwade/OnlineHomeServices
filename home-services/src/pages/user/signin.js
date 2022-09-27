import { Link, useNavigate } from "react-router-dom";
import Images from "../../images/image1_location.png";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
// use the dispatch to update the redux store about the signin state
import { useDispatch } from 'react-redux'
import { signin } from '../../Reducers/authSlice'
import config from '../config';
//config.serverURL+

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const signinUser = () => {
    if (email.length === 0) {
      toast.error("please enter email");
    } else if (password.length === 0) {
      toast.error("please enter password");
    } else {
      const body = {
        email,
        password
      };
      // url to call the api
      const url = config.serverURL+`/user/signin`;

      // make api call using axios
      axios
        .post(url, body)
        .then(response => {
          // get the server result
          const result = response.data;
          console.log(result);
          console.log("role of user " + result.role);

          if (result.status === 500) {
            toast.error("Login Invalid!!");
          } else {
            if (result.role === "ADMIN") {
              // line added by kanchan
              sessionStorage.setItem("role", result.role);
              sessionStorage.setItem("user", result.id);
              const user = result['data'];
              dispatch(signin(user));
              toast.success("Welcome ADMIN");
              navigate("../admin");
            } else {
              sessionStorage.setItem("role", result.role);
              sessionStorage.setItem("user", result.id);
              //localStorage.setItem("user",result.id)
              const user = result['data'];
              dispatch(signin(user));
              toast.success("Welcome to Home Services");
              navigate("/home/"+result.id);
            }
          }
        })
        .catch(error => {
         toast.error("Invalid credentials");
          console.log(error);
        });
    }
  };

  return (
    <div style={styles.container1}>
      <div style={{ marginTop: 0 }}>
        <div style={styles.container}>
          <div className="mb-3">
            <label>Email</label>
            <input
              onChange={e => {
                setEmail(e.target.value);
              }}
              className="form-control"
              type="email"
              placeholder="Your email"
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              onChange={e => {
                setPassword(e.target.value);
              }}
              className="form-control"
              type="password"
              placeholder="Your password"
            />
          </div>

          <div className="mb3" style={{ marginTop: 40 }} />
          <div className="mb-3">
            <div>
              Don't have an account?
              <Link to="/signup">Signup here</Link>
            </div>
            <button style={styles.Button} onClick={signinUser} className="">
              Signin
            </button>
          </div>
          <div>
            <Link to="/forgot-password">Forgot password ?</Link>
          </div>
          {/* <div>
            <Link to="/reset-password">Reset password </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: 400,
    height: 350,
    padding: 20,
    position: "relative",
    backgroundColor: "white",
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    borderColor: "#663399",
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    boxShadow: "1px 1px 10px 1px white"
  },

  container1: {
    backgroundImage: `url(${Images})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100vh"
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
export default Signin;
