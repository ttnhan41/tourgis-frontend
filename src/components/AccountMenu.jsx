import Wrapper from "../assets/wrappers/AccountMenu";
import { useState } from "react";
import { useDashboardContext } from "../pages/UserDashboard";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AccountMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, logoutUser } = useDashboardContext();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <button
        type="button"
        className="btn menu-btn"
        onClick={() => setShowMenu(!showMenu)}
      >
        <FaUserCircle />
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showMenu ? "dropdown show-dropdown" : "dropdown"}>
        <button type="button" className="dropdown-btn" /*onClick={}*/>
          Tài khoản
        </button>
        {user.role === "admin" ? (
          <button
            type="button"
            className="dropdown-btn"
            onClick={() => navigate("/admin")}
          >
            Admin
          </button>
        ) : null}
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          Đăng xuất
        </button>
      </div>
    </Wrapper>
  );
};
export default AccountMenu;
