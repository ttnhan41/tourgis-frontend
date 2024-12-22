import Wrapper from "../assets/wrappers/AdminPlace";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Select, Table, Button, Modal, Input, Space, Form, message, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const { TextArea } = Input;

const Place = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [modalType, setModalType] = useState("");
    const [form] = Form.useForm();

    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // fetch categories
                const categoriesResponse = await customFetch.get("/categories/");
                console.log(categoriesResponse.data.categories);
                const categoriesData = categoriesResponse.data.categories || [];
                setCategories(categoriesData);

                // fetch types
                const typesResponse = await customFetch.get("/types/");
                const typesData = typesResponse.data.types || [];
                setTypes(typesData);

                // fetch places
                const placesResponse = await customFetch.get("/tourist-attractions/");
                console.log(placesResponse.data.touristAttractions);
                const placesData = placesResponse.data.touristAttractions || [];
                setPlaces(placesData);
            }
            catch (error) {
                toast.error(error?.response?.data?.msg || "Lỗi khi tải dữ liệu");
            }
        };
        fetchData();
    }, []);

    const showModal = (type, record = null) => {
        setModalType(type);
        setEditingRecord(record);
        setIsModalVisible(true);
        if (record) {
            form.setFieldsValue(record); // Điền dữ liệu vào form nếu đang chỉnh sửa
        } else {
            form.resetFields(); // Đặt lại form nếu là thêm mới
        }
    }

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleSave = () => {
        form.validateFields().then(values => {
            if (editingRecord) {
                // Cập nhật bản ghi
                if (modalType === "editCategory") {
                    setCategories(prev => prev.map(cat => cat.id === editingRecord.id ? { ...cat, ...values } : cat));
                } else if (modalType === "editType") {
                    setTypes(prev => prev.map(type => type.id === editingRecord.id ? { ...type, ...values } : type));
                } else if (modalType === "editPlace") {
                    setPlaces(prev => prev.map(place => place.id === editingRecord.id ? { ...place, ...values } : place));
                }
                message.success("Cập nhật thành công!");
            } else {
                // Thêm mới bản ghi
                const newRecord = { id: Date.now(), ...values };
                if (modalType === "addCategory") {
                    setCategories([...categories, newRecord]);
                } else if (modalType === "addType") {
                    setTypes([...types, newRecord]);
                } else if (modalType === "addPlace") {
                    setPlaces([...places, newRecord]);
                }
                message.success("Thêm mới thành công!");
            }
            handleCancel();
        }).catch(info => {
            console.log("Validate Failed:", info);
        });
    };

    const categoryColumns = [
        { 
            title: 'STT', 
            key: 'index',
            render: (text, record, index) => index + 1 // index bắt đầu từ 0
        },
        { title: 'Tên Phân Loại', dataIndex: 'name', key: 'name' },
        { title: 'Mô Tả', dataIndex: 'description', key: 'description' },
        // { title: 'Ngày cập nhật', dataIndex: 'dateAdded', key: 'dateAdded'},
        {
            title: 'Thao Tác', key: 'actions', render: (text, record) => (
                <>
                    <Button icon={<EditOutlined />} onClick={() => showModal("editCategory", record)} style={{ marginRight: 8 }} />
                    <Button icon={<DeleteOutlined />} />
                </>
            )
        },
    ];

    const typeColumns = [
        { 
            title: 'STT', 
            key: 'index',
            render: (text, record, index) => index + 1 // index bắt đầu từ 0
        },
        { title: 'Tên Loại', dataIndex: 'name', key: 'name' },
        { title: 'Phân Loại', dataIndex: 'category', key: 'category' },
        {
            title: 'Thao Tác', key: 'actions', render: (text, record) => (
                <>
                    <Button icon={<EditOutlined />} onClick={() => showModal("editType", record)} style={{ marginRight: 8 }} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id, "type")} />
                </>
            )
        },
    ];

    const placeColumns = [
        { 
            title: 'STT', 
            key: 'index',
            render: (text, record, index) => index + 1 // index bắt đầu từ 0
        },
        { title: 'Tên Địa Điểm', dataIndex: 'name', key: 'name' },
        { title: 'Loại', dataIndex: 'type', key: 'type', render: (text) => text ? text.name : "" },
        // { title: 'Ảnh', dataIndex: 'imageURL', key: 'image', render: (text) => <span>{text}</span> },
        {
            title: 'Ảnh',
            dataIndex: 'imageURL',
            key: 'image',
            render: (text) => <img src={text} alt="Ảnh địa điểm" style={{ width: 100, height: 100 }} />
        },
        { title: 'Ngày Thêm', dataIndex: 'createdAt', key: 'dateAdded', render: (text) => text ? new Date(text).toLocaleDateString("vi-VN") : '' },
        {
            title: 'Thao Tác', key: 'actions', render: (text, record) => (
                <>
                    <Button icon={<EditOutlined />} onClick={() => showModal("editPlace", record)} style={{ marginRight: 8 }} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id, "place")} />
                </>
            )
        },
    ];

    // xử lý upload ảnh
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <Wrapper>
            <div className="section">
                <div className="table-container">
                    <div className="table-header">
                        <h3>Phân loại địa điểm</h3>
                        <Button icon={<PlusOutlined />} className="btn" onClick={() => showModal("addCategory")}>Thêm mới</Button>
                    </div>
                    <Table dataSource={categories} columns={categoryColumns} rowKey="id" pagination={{ pageSize: 5 }} className="table" />
                </div>

                <div className="table-container">
                    <div className="table-header">
                        <h3>Loại địa điểm</h3>
                        <Button icon={<PlusOutlined />} className="btn" onClick={() => showModal("addType")}>Thêm mới</Button>
                    </div>
                    <Table dataSource={types} columns={typeColumns} rowKey="id" pagination={{ pageSize: 5 }} className="table" />
                </div>
            </div>

            <div className="section">
                <div className="table-container">
                    <div className="table-header">
                        <h3>Danh sách địa điểm</h3>
                        <Button icon={<PlusOutlined />} className="btn" onClick={() => showModal("addPlace")}>Thêm mới</Button>
                    </div>
                    <Table dataSource={places} columns={placeColumns} rowKey="id" pagination={{ pageSize: 10 }} className="table" />
                </div>
            </div>

            <Modal title={modalType.includes("edit") ? "Chỉnh sửa" : "Thêm mới"} open={isModalVisible} onCancel={handleCancel} onOk={handleSave} okText='Lưu' cancelText='Hủy'>
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Tên" rules={[{ required: true, message: "Vui lòng nhập tên" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}>
                        <TextArea rows={4} />
                    </Form.Item>

                    {modalType === "addType" || modalType === "editType" ? (
                        <Form.Item name="category" label="Phân Loại" rules={[{ required: true, message: "Vui lòng chọn phân loại" }]}>
                            {/* <Input placeholder="Nhập phân loại" /> */}
                            <Select
                                placeholder="Chọn phân loại"
                                mode="multiple"
                                allowClear // thêm tính năng xóa lựa chọn
                            >
                                {categories.map((category) => (
                                    <Select.Option key={category.id} value={category.name}>
                                        {category.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    ) : null}

                    {modalType === "addPlace" || modalType === "editPlace" ? (
                        <>
                            <Form.Item name="type" label="Loại" rules={[{ required: true, message: "Vui lòng chọn loại" }]}>
                                {/* <Input placeholder="Nhập loại" /> */}
                                <Select
                                    placeholder="Chọn loại địa điểm"
                                    // mode="multiple"
                                    allowClear // thêm tính năng xóa lựa chọn
                                >
                                    {types.map((type) => (
                                        <Select.Option key={type.id} value={type.name}>
                                            {type.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            {/* Thêm mục Upload ảnh */}
                            <Form.Item name="image" label="Ảnh địa điểm" valuePropName="fileList" getValueFromEvent={normFile}>
                                <Upload name="logo" listType="picture" maxCount={1} action="/upload.do" beforeUpload={() => false} >
                                    <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                                </Upload>
                            </Form.Item>
                        </>
                    ) : null}
                </Form>
            </Modal>

        </Wrapper>
    )
};

export default Place;