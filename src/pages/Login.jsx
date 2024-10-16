import { Link } from "react-router-dom";
import {FaUser, FaLock} from "react-icons/fa";
import Wrapper from "../assets/wrappers/Login";

const Login = () => {
  return (
    <Wrapper>
      <div className="wrapper">
        <form action="">
          <h1>Log In</h1>
          <div className="input-box">
            <input type="email" placeholder="Email" required />
            <FaUser className="icon"/>
          </div>

          <div className="input-box">
            <input type="password" name="" id="" placeholder="Password" required />
            <FaLock className="icon"/>
          </div> 

          <div className="remember-forgot">
            <label><input type="checkbox" name="" id="" />Remember me</label>
            <Link to="#" className="forgot">Forgot password?</Link>
          </div>

          <button type="submit" className="btn">Login</button>

          <div className="register-link">
            <div>Don't have an account? <Link to="/register" className="register">Register</Link></div>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};
export default Login;
