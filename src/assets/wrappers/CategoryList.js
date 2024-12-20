import styled from "styled-components";

const Wrapper = styled.div`
  .category-container {
    position: relative;
    margin: 20px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .category-list {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 10px;
    width: 85%;
    overflow-x: auto;
    background: linear-gradient(to right, #f8f9fa, #ffffff);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;

    &::-webkit-scrollbar {
      display: none; /* Hide scrollbar for cleaner look */
    }
  }

  .category-button {
    flex-shrink: 0;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    background: var(--primary-500);
    color: #fff;
    font-weight: bold;
    font-size: 0.9rem;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }

    &.active {
      background: var(--primary-700);
      box-shadow: 0 4px 8px rgba(26, 138, 160, 0.3);
    }
  }

  .scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: "#f4f4f4";
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    z-index: 10;

    img {
      width: 60%;
      height: 60%;
      object-fit: contain;
    }
  }

  .left-scroll-button {
    left: 50px;
  }

  .right-scroll-button {
    right: 50px;
  }
`;

export default Wrapper;
