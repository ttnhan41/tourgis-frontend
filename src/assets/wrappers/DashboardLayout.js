import styled from "styled-components";

const Wrapper = styled.section`
    .wrapper {
        width: 420px;
        background: var(--white);
        border: 2px solid rgba(0, 0, 0, .2);
        backdrop-filter: blur(30px);
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
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
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        font-weight: bold;
    }
`;

export default Wrapper;