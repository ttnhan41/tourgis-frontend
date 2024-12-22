import Wrapper from "../assets/wrappers/AdminUser";
import React, {useState, useEffect} from "react";
import {Table, Button, Modal, Tooltip, List} from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {useNavigate, useLoaderData} from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const User = () => {

    const [users, setUsers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBookmarks, setSelectedBookmarks] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await customFetch.get('/users/');
                const userData = response.data.users || [];
                setUsers(userData);
            }
            catch (error) {
                toast.error(error?.response?.data?.msg || "Lỗi khi tải dữ liệu");
            }
        };
        fetchUsers();
    }, []);

    const columns = [
        { 
            title: 'STT', 
            key: 'index',
            width: 60,
            render: (text, record, index) => index + 1 // index bắt đầu từ 0
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Tooltip title={text}>
                    <Button type="link" onClick={() => handleShowBookmarks(record)}>
                        {text}
                    </Button>
                </Tooltip>
            ),
        },
        { 
            title: 'Địa chỉ', 
            dataIndex: 'location', 
            key: 'location', 
            ellipsis: true, 
            render: (text) => (
            <Tooltip title={text}>
                {text}
            </Tooltip>
        )},
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: 'Số lượng địa điểm đã bookmark',
            dataIndex: 'locationBookmarks',
            key: 'bookmarkCount',
            render: (bookmarks) => bookmarks.length, // Tính độ dài của mảng
        },
        { title: "Vai trò", dataIndex: 'role', key: 'role'},
        {
            title: 'Thao Tác', key: 'actions', render: (text, record) => (
                <>
                    <Button icon={<EditOutlined />} onClick={() => showModal("editCategory", record)} style={{ marginRight: 8 }} />
                    <Button icon={<DeleteOutlined />} />
                </>
            )
        },
    ]
    // Hiện popup khi nhấn vào tên người dùng
    const handleShowBookmarks = (record) => {
        setSelectedBookmarks(record.locationBookmards || []);
        setIsModalVisible(true);
    };

    // đóng pop up
    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedBookmarks([]);
    };

    return (
        <Wrapper>
            <Table columns={columns} dataSource={users} rowKey="id" />

            <Modal
                title = "Danh sách địa điểm đã lưu"
                open = {isModalVisible}
                onCancel={handleCloseModal}
                // footer = {<Button onClick={handleCloseModal}>Đóng</Button>}
                footer = {null}
            >
                 <List
                    dataSource={selectedBookmarks}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={`Địa điểm ID: ${item}`}
                                description={`Chi tiết ID: ${item}`} // Thay bằng chi tiết khác nếu có
                            />
                        </List.Item>
                    )}
                />
            </Modal>
        </Wrapper>
    )
};

export default User;