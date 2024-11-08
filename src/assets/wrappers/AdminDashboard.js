import styled from "styled-components";

const Wrapper = styled.section`
    .statistics {
        display: flex;
        gap: 1.5em;
        padding: 1em 0em;
        // border: 1px solid black;
    }

    .statistics .box {
        flex: 1;
        padding: 1em;
        background-color: #f0f0f0;
        text-align: left;
        // border: 1px solid red;
        display: flex;
        border-radius: var(--border-radius);
        aspect-ratio: 2 / 1;
        justify-content: space-evenly;
        align-items: center;
    }

    .displayed-data {
        width: 50%;    
    }

    .displayed-data h2 {
        // background-color: yellow;
        font-weight: 500;
        margin-bottom: 0.25em;
    }

    .displayed-data .type{
        // background-color: blue;
        color: var(--grey-600);
    }

    .icon {
        font-size: 3em;
    }

    /* Container cho 2 bảng đặt cạnh nhau */
    .dashboard-tables {
        display: flex;
        gap: 20px; /* Khoảng cách giữa hai bảng */
        margin: 20px 0;
    }

    /* Định dạng cho mỗi bảng */
    .recent-table {
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

    // /* Nút See All */
    // .see-all-btn {
    //     padding: 6px 12px;
    //     font-size: 0.9rem;
    //     color: #fff;
    //     background-color: #007bff;
    //     border: none;
    //     border-radius: 4px;
    //     cursor: pointer;
    //     transition: background-color 0.3s;
    // }

    // .see-all-btn:hover {
    //     background-color: #0056b3;
    // }

    .recent-table h3 {
        padding: 12px 20px;
        font-size: 1.2rem;
        font-weight: 600;
        color: #333;
        background-color: #f5f5f5;
        border-bottom: 1px solid #e0e0e0;
        margin: 0;
    }

    /* Định dạng bảng */
    .recent-table table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9rem;
    }

    .recent-table th, .recent-table td {
        padding: 12px 15px;
        text-align: left;
    }

    .recent-table th {
        background-color: #f0f0f0;
        color: #333;
        font-weight: 600;
        border-bottom: 1px solid #ddd;
    }

    .recent-table td {
        color: #555;
        border-bottom: 1px solid #f0f0f0;
    }

    /* Dòng xen kẽ màu để dễ đọc hơn */
    .recent-table tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    /* Hiệu ứng hover cho các hàng */
    .recent-table tr:hover {
        background-color: #f1f1f1;
    }

    /* Responsive: chuyển về dạng cột khi màn hình nhỏ hơn */
    @media (max-width: 768px) {
        .dashboard-tables {
            flex-direction: column;
        }
    }



    




`;

export default Wrapper;