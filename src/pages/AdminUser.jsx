import Wrapper from "../assets/wrappers/AdminUser";
import React, {useState} from "react";
import {Table, Button, Modal} from 'antd';
import {useNavigate, useLoaderData} from "react-router-dom";

const User = () => {
    // dữ liệu người dùng ảo, sau sẽ lấy từ API
    const userData = [
        { id: 1, username: 'Nguyễn Ngọc Thanh Sang', email: 'sang@gmail.com', bookmarkCount: 5, registeredDate: '2024-01-01', bookmarks: ['Location A', 'Location B', 'Location C'] },
        { id: 2, username: 'Trần Trọng Nhân', email: 'nhan@gmail.com', bookmarkCount: 3, registeredDate: '2024-02-01', bookmarks: ['Location D', 'Location E'] },
        // Thêm dữ liệu mẫu khác...
    ];

    // State cho popup và dữ liệu bookmarks
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBookmarks, setSelectedBookmarks] = useState([]);

    // cấu hình cột cho bảng
    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Tên người dùng', dataIndex: 'username', key: 'username', render: (text, record) => (
            <Button type="link" onClick={() => handleShowBookmarks(record)}>
                {text}
            </Button>
        ) },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Số lượng địa điểm đã bookmark', dataIndex: 'bookmarkCount', key: 'bookmarkCount' },
        { title: 'Ngày đăng ký', dataIndex: 'registeredDate', key: 'registeredDate' },
    ]

    // Hiện popup khi nhấn vào tên người dùng
    const handleShowBookmarks = (record) => {
        setSelectedBookmarks(record.bookmarks || []);
        setIsModalVisible(true);
    };

    // đóng pop up
    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedBookmarks([]);
    };

    return (
        <Wrapper>
            <Table columns={columns} dataSource={userData} rowKey="id" />

            <Modal
                title = "Danh sách địa điểm đã lưu"
                open = {isModalVisible}
                onCancel={handleCloseModal}
                footer = {<Button onClick={handleCloseModal}>Đóng</Button>}
            >
                 <ul>
                    {selectedBookmarks.map((bookmark, index) => (
                        <li key={index}>{bookmark}</li>
                    ))}
                </ul>
            </Modal>
        </Wrapper>
    )
};

export default User;