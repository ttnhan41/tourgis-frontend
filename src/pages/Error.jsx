import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import notFoundImg from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={notFoundImg} alt="not found" />
          <h3>Không tìm thấy trang</h3>
          <p>Chúng tôi không thể tìm thấy trang mà bạn đang truy cập</p>
          <Link to="/">Về trang chủ</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h3>Something went wrong</h3>
      </div>
    </Wrapper>
  );
};

export default Error;
