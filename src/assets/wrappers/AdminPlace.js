import styled from "styled-components";

const Wrapper = styled.section`
    .section {
        display: flex;
        gap: 20px; /* Khoảng cách giữa hai bảng */
        margin: 20px 0;
    }

    .table-container {
        flex: 1; /* Cho phép bảng chiếm đều không gian */
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    .table-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 20px;
        background-color: #f5f5f5;
        border-bottom: 1px solid #e0e0e0;
    }

    .table-header h3 {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 600;
        color: #333;
    }

    .table-container .table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9rem;
    }

    .table .ant-table-thead > tr > th {
        background-color: #f0f0f0;
        color: #333;
        font-weight: 600;
        border-bottom: 1px solid #ddd;
    }

    .table .ant-table-tbody > tr > td {
        color: #555;
        border-bottom: 1px solid #f0f0f0;
    }

    .table .ant-table-thead > tr > th,
    .table .ant-table-tbody > tr > td {
        padding: 4px 8px;
        height: 2em;
    }

    .table .ant-table-tbody > tr:hover > td {
        background-color: #f1f1f1;
    }

    .table .ant-table-tbody > tr:nth-child(even) > td {
        background-color: #f9f9f9;
    }

    @media (max-width: 768px) {
        .section {
            flex-direction: column;
        }
    }



`;

export default Wrapper;
