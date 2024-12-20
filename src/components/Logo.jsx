import logo from "../assets/images/tour-gis-logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="tour gis" className="logo" width="250" />
    </Link>
  );
};

export default Logo;
