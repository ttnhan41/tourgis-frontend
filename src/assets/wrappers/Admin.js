import styled from "styled-components";

const Wrapper = styled.section`
  .wrapper {
    margin: 0 auto;
    display: flex;
    /* background-color: bisque; */
    /* width: var(--fluid-width); */
    /* max-width: var(--max-width); */
    height: 100vh;
  }

  .sidebar {
    width: 18%;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-3);
  }

  .home-url {
    padding: 0 auto;
    justify-content: space-evenly;
    align-items: center;
    display: flex;
    height: 12vh;
    background-color: var(--primary-300);
  }

  .home-url .logo {
    background-color: #fff;
  }

  .home-url h2 {
    margin-left: 10px;
    font-weight: 1000;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .navigate {
    background-color: var(--primary-300);
    flex: 1;
  }

  .navigate .item {
    height: 10vh;
    font-family: monospace;
    font-size: 1.5em;
    margin: 10px 0px 10px 10px;
    border-radius: 10px 0 0 10px;
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    // background-color: var(--background-color);
  }

  header {
    padding: 0 auto;
    justify-content: space-between;
    align-items: center;
    display: flex;
    height: 12vh;
    width: 100%;
    padding: 0 1em;
    background-color: white;
  }

  header h3 {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 500;
  }

  .search-box .input-box {
    position: relative;
  }

  .search-box .search-icon {
    position: absolute;
    font-size: 24px;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
  }

  .search-box input {
    width: 300px;
    height: 40px;
    padding-left: 50px;
    font-size: 1em;
    border-radius: 50px;
  }

  .account {
    display: flex;
    // background-color: aqua;
    position: relative;
  }

  .account .user-info {
    padding: 0 0.4em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-radius: var(--border-radius);
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
    margin: 0 5px;
  }

  .account .user-icon {
    position: absolute;
    left: -1em;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2em;
  }

  .account .user-info h5,
  p {
    // margin-bottom: 0.25em;
  }

  button {
    border: none;
  }

  .content {
    padding: 1em;
    flex: 1;
    overflow-y: auto;
    background-color: var(--grey-200);
  }

  .account-menu-btn-container {
    position: relative;
  }

  .menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
  }

  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  .dropdown {
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    box-shadow: var(--shadow-2);
    text-align: center;
    visibility: hidden;
    border-radius: var(--border-radius);
    background: var(--primary-500);
    z-index: 99;
  }

  .show-dropdown {
    visibility: visible;
  }

  .dropdown-btn {
    border-radius: var(--border-radius);
    padding: 0.5rem;
    background: transparent;
    border-color: transparent;
    color: var(--white);
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .dropdown-btn:hover {
    background: var(--primary-700);
  }
`;

export default Wrapper;
