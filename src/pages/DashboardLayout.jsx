import Wrapper from "../assets/wrappers/DashboardLayout";
import { Link } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <Wrapper>
      <div className="wrapper">
        <h1>DashboardLayout</h1>
        <Link to="/admin">admin page</Link>
      </div>
    </Wrapper>
  );
};
export default DashboardLayout;
