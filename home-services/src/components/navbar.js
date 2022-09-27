import React from "react";
import { Link , useNavigate} from "react-router-dom";
import Avatars from "../components/avatar";
import { useSelector, useDispatch } from 'react-redux'
import { signout } from '../Reducers/authSlice'


//  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const Navbar = () => {
  // const [dropdown, setDropdown] = useState(false);

// get the current status
const signinStatus = useSelector((state) => state.authSlice.status)

//get username
//const signinUser;//

// get the dispatcher
const dispatch = useDispatch()

// used to navigate
const navigate = useNavigate()

  return (
    <nav
      style={{ backgroundColor: "navy" }}
      className="navbar navbar-expand-lg navbar-dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          Home Services
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          
            
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/available-services"
              >
                Available Services
              </Link>
            </li>
             
            
            {/* <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/upcoming-services"
              >
                Upcoming Services
              </Link>
            </li> */}
            
           
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/offerzone"
              >
                Upcoming Services
              </Link>
            </li>
          

            
            {/* <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/admin">
                Admin
              </Link>
            </li> */}
            
          </ul>

          <ul className="navbar-nav navbar-right">
            {/* <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/signup"
              >
                SignUp
              </Link>
            </li> */}
            <li className='nav-item'>
              {/* if user is not signed then render signin link */}
              {!signinStatus && (
                <Link
                  className='nav-link active'
                  aria-current='page'
                  to='/signin'>
                  SignIn
                </Link>
              )}

              {/* if user is signed in then render signout button */}
              {signinStatus && (
                <button
                  style={{ textDecoration: 'none', color: 'white' }}
                  onClick={() => {
                    sessionStorage.clear();
                    // send the action to let the user signout
                    dispatch(signout())
                    // go to signin page
                    navigate('/signin')

                  }}
                  className='btn btn-link'
                  aria-current='page'>
                  SignOut
                </button>
              )}
            </li>
          
           
           <Avatars />
           
          </ul>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;



