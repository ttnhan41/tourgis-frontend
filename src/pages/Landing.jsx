import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Logo } from "../components";

export const loader = async () => {
    try {
      const { data } = await customFetch.get("/auth/validate");
      return data;
    } catch (error) {
      return redirect("/");
    }
  };

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useLoaderData();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated || isAuthenticated === undefined) {
    return null;
  }

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
          <Link to="/map" className="btn map-link">
            Tra cứu bản đồ du lịch
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
