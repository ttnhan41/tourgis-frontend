import styled from "styled-components";

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .map-link {
    margin-top: 2rem;
  }
  .map-img {
    width: 60%;
    height: 60%;
    object-fit: contain;
    margin-top: -5rem;
  }
`;

export default Wrapper;
