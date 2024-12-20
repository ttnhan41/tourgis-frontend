import styled from "styled-components";

const Wrapper = styled.div`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  background: var(--background-secondary-color);
  .header-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    display: flex;
    align-items: center;
    width: 250px;
  }
  .btn-container {
    display: flex;
    align-items: center;
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;
    .header-center {
      width: 90%;
    }
  }
`;
export default Wrapper;
