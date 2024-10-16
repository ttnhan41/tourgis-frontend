import { Link } from "react-router-dom";
import '../assets/css/Login.css';
import {FaUser, FaLock} from "react-icons/fa";

const Login = () => {
  return (
    <div className="wrapper">
      {/* <h1>Login page</h1>
      <Link to="/register">Register page</Link> */}
      <form action="">
        <h1>Log In</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" required />
          <FaUser className="icon"/>
        </div>

        <div className="input-box">
          <input type="password" name="" id="" placeholder="Password" required />
          <FaLock className="icon"/>
        </div>
        

        <div className="remember-forgot">
          <label><input type="checkbox" name="" id="" />Remember me</label>
          <Link to="#">Forgot password?</Link>
        </div>

        <button type="submit">Login</button>

        <div className="register-link">
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </form>
    </div>
  );
};
export default Login;
