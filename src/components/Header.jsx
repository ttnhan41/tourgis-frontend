import Wrapper from "../assets/wrappers/Header";
import AccountMenu from "./AccountMenu";
import Logo from "./Logo";

const Header = () => {
  return (
    <Wrapper>
      <div className="header-center">
        <div>
          <Logo />
        </div>
        <div className="btn-container">
          <AccountMenu />
        </div>
      </div>
    </Wrapper>
  );
};
export default Header;
