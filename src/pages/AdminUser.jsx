import Wrapper from "../assets/wrappers/AdminUser";
import React, {useState, useEffect} from "react";
import {Table, Button, Modal, Tooltip, List, message, Space, Form, Input, Select, Empty} from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {useNavigate, useLoaderData} from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import Item from "antd/es/list/Item";

const User = () => {

    const [users, setUsers] = useState([]);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [isBookmarksModalVisible, setIsBookmarksModalVisible] = useState(false);
    const [bookmarkedPlaces, setBookmarkedPlaces] = useState([]);
    const [selectedBookmarks, setSelectedBookmarks] = useState([]);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await customFetch.get('/users/');
                const userData = response.data.users || [];
                setUsers(userData);

                // fetch places
                const placesResponse = await customFetch.get("/tourist-attractions/");
                // console.log(placesResponse.data.touristAttractions);
                const placesData = placesResponse.data.touristAttractions || [];
                setPlaces(placesData);
            }
            catch (error) {
                toast.error(error?.response?.data?.msg || "Lỗi khi tải dữ liệu");
            }
        };
        fetchUsers();
    }, []);

    const showUpdateModal = (record) => {
        setEditingRecord(record);
        setIsUpdateModalVisible(true);
        form.setFieldsValue(record);
    };

    const handleCancelUpdateModal = () => {
        setIsUpdateModalVisible(false);
        form.resetFields();
        setEditingRecord(null);
    };

    const handleUpdate = async (values) => {
        try {
            const response = await customFetch.patch(`/users/update-user/${editingRecord._id}`, values);
            setUsers(users.map(user => user._id === editingRecord._id ? response.data.user : user));
            message.success("Cập nhật thành công");
            handleCancel();
        }
        catch (error) {
            toast.error(error?.response?.data?.msg || "Lỗi khi cập nhật");
        }
    };

    const handleDelete = async (id) => {
        try {
            await Modal.confirm({
                title: "Xác nhận xóa",
                content: "Bạn có chắc chắn muốn xóa người dùng này?",
                okText: "Xóa",
                okType: "danger",
                cancelText: "Hủy",
                onOk: async () => {
                    await customFetch.delete(`/users/${id}`);
                    setUsers(users.filter(user => user._id !== id));
                    message.success("Xóa thành công");
                }
            });
        }
        catch (error) {
            toast.error(error?.response?.data?.msg || "Lỗi khi xóa");
        }
    };

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
            title: 'Thao Tác', 
            key: 'actions', 
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => showUpdateModal(record)}
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        // onClick={() => handleDelete(record._id)}
                    />
                </Space>
            )
        },
    ]
    // Hiện popup khi nhấn vào tên người dùng
    const handleShowBookmarks = async (record) => {
        console.log(record);
        try {
            // Get full place details for each bookmark
            const bookmarkPromises = (record.locationBookmarks || []).map(async (id) => {
                console.log('Fetching place with id:', id);
                const response = await customFetch.get(`/tourist-attractions/${id}`);
                console.log('Place data:', response.data);
                return response.data;
            });
            
            const places = await Promise.all(bookmarkPromises);
            console.log('Places:', places);
            setBookmarkedPlaces(places);
            setSelectedBookmarks(record.locationBookmarks || []);
            setIsBookmarksModalVisible(true);
        } catch (error) {
            console.error('Error fetching bookmarked places:', error);
            message.error('Không thể tải thông tin địa điểm đã lưu');
        }
    };

    // đóng pop up
    const handleCloseBookmarksModal = () => {
        setIsBookmarksModalVisible(false);
        setSelectedBookmarks([]);
    };

    return (
        <Wrapper>
            <Table columns={columns} dataSource={users} rowKey="id" />

            {/* Modal hiển thị danh sách địa điểm đã bookmark */}
            <Modal
                title="Địa điểm đã lưu"
                open={isBookmarksModalVisible}
                onCancel={handleCloseBookmarksModal}
                // footer={null}
            >
                {bookmarkedPlaces.length > 0 ? (
                    <List
                        dataSource={bookmarkedPlaces}
                        renderItem={place => (
                            <List.Item>
                                <List.Item.Meta
                                    title={place.name}
                                    description={place.address}
                                />
                            </List.Item>
                        )}
                    />
                ) : (
                    <Empty description="Không có địa điểm đã lưu" />
                )}
            </Modal>

            {/* Modal chỉnh sửa người dùng */}
            <Modal
                title="Chỉnh sửa người dùng"
                open={isUpdateModalVisible}
                onOk={() => {
                    form.validateFields()
                        .then(values => handleUpdate(values))
                        .catch(info => console.log('Validate Failed:', info));
                }}
                onCancel={handleCancelUpdateModal}
                okText="Lưu"
                cancelText="Hủy"
                // footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        name="name"
                        label="Tên người dùng"
                        rules={[{ required: true, message: 'Vui lòng nhập tên người dùng' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Vui lòng nhập email' }, { type: 'email', message: 'Email không hợp lệ' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="location"
                        label="Địa chỉ"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phoneNumber"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }, { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </Wrapper>
    );
};

export default User;