import { Link } from "react-router-dom";
import {FaUser, FaLock} from "react-icons/fa";
import Wrapper from "../assets/wrappers/Login";

const Login = () => {
  return (
    <Wrapper>
      <div className="wrapper">
        <form action="">
          <h1>Đăng nhập</h1>
          <div className="input-box">
            <input type="email" placeholder="emailcuaban@gmail.com" required />
            <FaUser className="icon"/>
          </div>

          <div className="input-box">
            <input type="password" name="" id="" placeholder="Nhập mật khẩu" required />
            <FaLock className="icon"/>
          </div> 

          <div className="remember-forgot">
            <label><input type="checkbox" name="" id="" />Nhớ mật khẩu</label>
            <Link to="#" className="forgot">Quên mật khẩu?</Link>
          </div>

          <button type="submit" className="btn">Đăng nhập</button>

          <div className="register-link">
            <div>Bạn chưa có tài khoản? <Link to="/register" className="btn">Đăng ký</Link></div>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default Login;
