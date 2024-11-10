import {
  Link,
  Form,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { FaUser, FaLock, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import Wrapper from "../assets/wrappers/Register";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

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
    await customFetch.post("/auth/register", data);
    toast.success("Đăng ký thành công");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
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

  const [passwordInput, setPasswordInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const onPasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validatePasswordInput(e);
  };

  const validatePasswordInput = (name, value) => {
    if (name === "password") {
      if (
        passwordInput.confirmPassword &&
        value !== passwordInput.confirmPassword
      ) {
        setConfirmPasswordError("Mật khẩu xác nhận không khớp.");
      } else {
        setConfirmPasswordError("");
      }
    }

    if (name === "confirmPassword") {
      setConfirmPasswordError("");
      if (passwordInput.password && value !== passwordInput.password) {
        setConfirmPasswordError("Mật khẩu xác nhận không khớp.");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const handleSubmit = (e) => {
    if (passwordInput.password !== passwordInput.confirmPassword) {
      e.preventDefault();
      setConfirmPasswordError("Mật khẩu xác nhận không khớp.");
    } else {
      setConfirmPasswordError("");
    }
  };

  return (
    <Wrapper>
      <div className="wrapper">
        <Form method="post" onSubmit={handleSubmit}>
          <h1>Đăng ký</h1>

          <div className="form-columns">
            <div className="column">
              <h5>Điền thông tin tài khoản</h5>

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
                  value={passwordInput.password}
                  onChange={onPasswordInputChange}
                  required
                />
                <FaLock className="icon" />
              </div>

              <div className="input-box">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Nhập lại mật khẩu"
                  value={passwordInput.confirmPassword}
                  onChange={onPasswordInputChange}
                  onBlur={(e) =>
                    validatePasswordInput(e.target.name, e.target.value)
                  }
                  required
                />
                <FaLock className="icon" />
              </div>
              {confirmPasswordError && (
                <p className="error-msg">{confirmPasswordError}</p>
              )}
            </div>

            <div className="column">
              <h5>Điền thông tin cá nhân</h5>

              <div className="input-box">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nhập họ tên"
                  required
                />
                <FaUser className="icon" />
              </div>

              <div className="input-box">
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Nhập địa chỉ"
                  required
                />
                <FaLocationDot className="icon" />
              </div>

              <div className="input-box">
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Nhập số điện thoại (không bắt buộc)"
                />
                <FaPhone className="icon" />
              </div>

              <button type="submit" className="btn">
                Đăng ký
              </button>
            </div>
          </div>
        </Form>

        <div className="login-link">
          <p>Bạn đã có tài khoản?</p>
          <Link to="/login" className="link">
            Đăng nhập
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Register;
