import styled from "styled-components";

const Wrapper = styled.section`
  .map-and-list {
    display: flex;
    align-items: flex-start;
    width: 100%;
    overflow: hidden;
  }
  .leaflet-container {
    height: 90vh;
    width: 75vw;
    box-sizing: border-box;
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
  .location-list {
    width: 25vw;
    height: 90vh;
    overflow-y: auto;
    padding: 1em;
    box-sizing: border-box;
    background-color: #f4f4f4;
    border-left: 1px solid #ddd;
  }
  .location-box {
    margin-bottom: 1em;
    padding: 1em 1em 0 1em;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-family: Roboto, "Open Sans", sans-serif;
  }
  .search-container {
    position: relative;
  }
  .search-bar {
    width: 100%;
    padding: 0.375rem 0.75rem 0.375rem 1.5rem;
    margin-bottom: 1rem;
    border-radius: 0.25rem;
    background-color: none;
    background-image: url("../images/search-icon.png");
    background-position: 10px 10px;
    background-repeat: no-repeat;
    border: 1px solid #cbd5e1;
    color: #000;
  }
  .search-icon-img {
    position: absolute;
    bottom: 1.45rem;
    left: 0.375rem;
    width: 15px;
    height: 15px;
  }
  h4 {
    font-size: 1.5rem;
  }
  p {
    font-size: 1rem;
    line-height: 1.4rem;
    margin-top: 0.5rem;
  }
  .tourist-attraction-img {
    border-radius: 5px;
    margin-bottom: 1rem;
  }
  .btn-list {
    display: flex;
    justify-content: center;
  }
  .btn {
    padding: 0.75rem 1rem;
    margin: 1rem;
    font-family: Roboto, "Open Sans", sans-serif;
  }
`;
export default Wrapper;
