import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            web tìm kiếm <span>địa điểm du lịch</span>
          </h1>
          <p>Gợi ý và tra cứu địa điểm du lịch ở VN</p>
          <Link to="/register" className="btn register-link">
            Đăng ký
          </Link>
          <Link to="/login" className="btn">
            Đăng nhập
          </Link>
        </div>
        <img src={main} alt="travel" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
