import Wrapper from "../assets/wrappers/UserDashboard";
import touristMap from "../assets/images/tourist-map.svg";
import { redirect, useLoaderData, useNavigate, Link } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { Header } from "../components";
import { createContext, useContext } from "react";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardContext = createContext();

const UserDashboard = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Đăng xuất thành công");
  };

  return (
    <DashboardContext.Provider value={{ user, logoutUser }}>
      <Wrapper>
        <main className="dashboard">
          <Header />
          <div className="dashboard-body">
            <img src={touristMap} alt="map" className="img map-img" />
            <Link to="/map" className="btn map-link">
              Tra cứu bản đồ du lịch
            </Link>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboardContext);
export default UserDashboard;
