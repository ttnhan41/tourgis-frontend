import {
  Link,
  Form,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import Wrapper from "../assets/wrappers/Login";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/auth/validate");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/login", data);
    toast.success("Đăng nhập thành công");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
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
      <div className="wrapper">
        <Form method="post">
          <h1>Đăng nhập</h1>
          <div className="input-box">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Nhập email"
              required
            />
            <MdEmail className="icon" />
          </div>

          <div className="input-box">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Nhập mật khẩu"
              required
            />
            <FaLock className="icon" />
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" name="" id="" />
              Nhớ mật khẩu
            </label>
            <Link to="#" className="link">
              Quên mật khẩu?
            </Link>
          </div>

          <button type="submit" className="btn">
            Đăng nhập
          </button>
        </Form>

        <div className="register-link">
          <p>Bạn chưa có tài khoản?</p>
          <Link to="/register" className="link">
            Đăng ký
          </Link>
        </div>

        <Link to="/" className="link">
          {"<<"} Về trang chủ
        </Link>
      </div>
    </Wrapper>
  );
};

export default Login;
