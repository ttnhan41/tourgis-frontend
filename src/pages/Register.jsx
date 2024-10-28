import { Link } from "react-router-dom";
import {FaUser, FaLock} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import {FaLocationDot} from "react-icons/fa6";
// import Wrapper from "../assets/wrappers/Register";
import "../assets/css/register.css";

const Register = () => {
  return (
    <div className="wrapper">
        <form action="" method="">
          <h1>Đăng ký</h1>

          <div className="form-columns">
            <div className="column">
              <h5>Thông tin tài khoản</h5>

              <div className="input-box">
                <input type="email" placeholder="Nhập email của bạn" required />
                <MdEmail className="icon"/>
              </div>

              <div className="input-box">
                <input type="password" name="" id="" placeholder="Nhập mật khẩu" required />
                <FaLock className="icon"/>
              </div>

              <div className="input-box">
                <input type="password" name="" id="" placeholder="Nhập lại mật khẩu" required />
                <FaLock className="icon"/>
              </div> 
            </div>

            <div className="column">
              <h5>Thông tin cá nhân</h5>

              <div className="input-box">
                <input type="text" name="" id="" placeholder="Nhập tên của bạn. Vd: Nguyễn Văn A" required />
                <FaUser className="icon"/>
              </div>

              <div className="input-box">
                <input type="text" name="" id="" placeholder="Ví dụ: 123 Đường Lê Lợi, Phường Bến Thành, Quận 1, TP.HCM"/>
                <FaLocationDot className="icon"/>
              </div>

              <button type="submit" className="btn">Đăng ký</button>
            </div>
          </div>

          <div className="login-link">
            <div>Bạn đã có tài khoản? <Link to="/login" className="btn">Đăng nhập</Link></div>
          </div>
          
        </form>
      </div>
  );
};

export default Register;
