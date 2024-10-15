import styled from "styled-components";

const Wrapper = styled.section`
  .leaflet-container {
    height: 90vh;
  }
  .cluster-icon {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    background-color: #fff;
    transform: translate(-25%, -25%);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 1.5rem;
  }
  .current-location-btn {
    display: flex;
    justify-content: center;
  }
  .btn {
    padding: 0.75rem 1rem;
    margin: 1.25rem;
  }
`;
export default Wrapper;
