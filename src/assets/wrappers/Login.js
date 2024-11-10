import styled from "styled-components";
import background from "../images/react-background.jpg";

const Wrapper = styled.section`
  /* Đặt ảnh background cho toàn bộ Wrapper*/
  // background-image: url(${background});
  // background-size: cover;
  // background-position: center;
  background: linear-gradient(
    159deg,
    var(--primary-700) 0%,
    var(--primary-200) 100%
  );
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .wrapper {
    width: 420px;
    background: var(--white);
    border: 2px solid rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(30px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    padding: 30px 40px;
  }

  .wrapper h1 {
    font-size: 36px;
    text-align: center;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    font-weight: bold;
  }

  .wrapper .input-box {
    position: relative;
    width: 100%;
    height: 50px;
    margin: 30px 0;
  }

  .input-box input {
    width: 100%;
    height: 100%;
    background: transparent;
    outline: none;
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-radius: 40px;
    font-size: 16px;
    color: var(--black);
    padding: 20px 45px 20px 20px;
  }

  .input-box input::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }

  .input-box .icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
  }

  .wrapper .remember-forgot {
    display: flex;
    justify-content: space-around;
    font-size: 14.5px;
    margin: -15px 0 15px;
  }

  .remember-forgot label input {
    accent-color: #fff;
    text-decoration: none;
  }

  .link {
    color: var(--primary-700);
    text-decoration: underline;
  }

  .link:hover {
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  }

  .wrapper button {
    width: 100%;
    height: 45px;
    background: linear-gradient(
      30deg,
      var(--primary-600) 0%,
      var(--primary-400) 100%
    );
    border: 2px solid rgba(0, 0, 0, 0.2);
    outline: none;
    border-radius: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-size: 16px;
    color: #fff;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  }

  .wrapper button:hover {
    background: linear-gradient(
      30deg,
      var(--primary-600) 100%,
      var(--primary-400) 0%
    );
    box-shadow: var(--shadow-3);
  }

  .wrapper .register-link {
    display: flex;
    flex-direction: row;
    column-gap: 3px;
    justify-content: center;
    align-items: center;
    font-size: 14.5px;
    margin: 20px 0 15px;
  }
`;
export default Wrapper;
