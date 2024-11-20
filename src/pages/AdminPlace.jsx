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

    // dữ liệu mẫu cho các bảng
    const [categories, setCategories] = useState([
        { id: 1, name: "Thiên nhiên", description: "Những địa điểm thiên nhiên đẹp", dateAdded: "2024-11-07" },
        { id: 2, name: "Lịch sử", description: "Các di tích lịch sử", dateAdded: "2024-11-07" },
        { id: 3, name: "Văn hóa", description: "Những địa điểm văn hóa đặc sắc", dateAdded: "2024-11-06" },
        { id: 4, name: "Giải trí", description: "Các khu vui chơi giải trí nổi bật", dateAdded: "2024-11-05" },
        { id: 5, name: "Ẩm thực", description: "Những nhà hàng, quán ăn nổi tiếng", dateAdded: "2024-11-04" },
        { id: 6, name: "Shopping", description: "Các trung tâm mua sắm lớn", dateAdded: "2024-11-03" },
        { id: 7, name: "Lễ hội", description: "Các lễ hội đặc sắc trong năm", dateAdded: "2024-11-02" },
        { id: 8, name: "Du lịch", description: "Các tour du lịch hấp dẫn", dateAdded: "2024-11-01" },
        { id: 9, name: "Khám phá", description: "Những địa điểm khám phá mới lạ", dateAdded: "2024-10-31" },
        { id: 10, name: "Thể thao", description: "Các khu vực thể thao và hoạt động ngoài trời", dateAdded: "2024-10-30" },
    ]);

    const [types, setTypes] = useState([
        { id: 1, name: "Núi", category: "Thiên nhiên" },
        { id: 2, name: "Bãi biển", category: "Thiên nhiên" },
        { id: 3, name: "Chợ", category: "Shopping, Khám phá, Ẩm thực" },
        { id: 4, name: "Công viên", category: "Giải trí" },
        { id: 5, name: "Khu di tích", category: "Lịch sử" },
        { id: 6, name: "Nhà hát", category: "Giải trí, Văn hóa" },
        { id: 7, name: "Nhà hàng", category: "Ẩm thực" },
        { id: 8, name: "Trung tâm mua sắm", category: "Shopping" },
        { id: 9, name: "Bảo tàng", category: "Văn hóa, Lịch sử" },
        { id: 10, name: "Khu du lịch sinh thái", category: "Thiên nhiên, Du lịch" },
        { id: 11, name: "Sân vận động", category: "Thể thao" },
        { id: 12, name: "Địa điểm lễ hội", category: "Lễ hội, Giải trí" },
        { id: 13, name: "Khu nghỉ dưỡng", category: "Thiên nhiên, Du lịch" },
        { id: 14, name: "Cửa hàng quà tặng", category: "Shopping" },
        { id: 15, name: "Thể thao ngoài trời", category: "Thể thao" },
    ]);

    const [places, setPlaces] = useState([
        { id: 1, name: "Suối Tiên", type: "Khu du lịch sinh thái", dateAdded: "2024-11-01", imageURL: "image.jpg" },
        { id: 2, name: "Hồ Đá", type: "Khu du lịch sinh thái", dateAdded: "2024-11-01", imageURL: "image.jpg" },
        { id: 3, name: "Đồi Cù", type: "Núi", dateAdded: "2024-11-02", imageURL: "image.jpg" },
        { id: 4, name: "Biển Nha Trang", type: "Bãi biển", dateAdded: "2024-11-03", imageURL: "image.jpg" },
        { id: 5, name: "Chợ Bến Thành", type: "Chợ", dateAdded: "2024-11-03", imageURL: "image.jpg" },
        { id: 6, name: "Công viên Gia Định", type: "Công viên", dateAdded: "2024-11-04", imageURL: "image.jpg" },
        { id: 7, name: "Dinh Độc Lập", type: "Khu di tích", dateAdded: "2024-11-04", imageURL: "image.jpg" },
        { id: 8, name: "Nhà hát Thành phố", type: "Nhà hát", dateAdded: "2024-11-05", imageURL: "image.jpg" },
        { id: 9, name: "Nhà hàng Gánh", type: "Nhà hàng", dateAdded: "2024-11-05", imageURL: "image.jpg" },
        { id: 10, name: "Vincom Center", type: "Trung tâm mua sắm", dateAdded: "2024-11-06", imageURL: "image.jpg" },
        { id: 11, name: "Bảo tàng Lịch sử Việt Nam", type: "Bảo tàng", dateAdded: "2024-11-06", imageURL: "image.jpg" },
        { id: 12, name: "Sân vận động Mỹ Đình", type: "Sân vận động", dateAdded: "2024-11-07", imageURL: "image.jpg" },
        { id: 13, name: "Đầm Sen", type: "Địa điểm lễ hội", dateAdded: "2024-11-07", imageURL: "image.jpg" },
        { id: 14, name: "Khu nghỉ dưỡng Alma", type: "Khu nghỉ dưỡng", dateAdded: "2024-11-08", imageURL: "image.jpg" },
        { id: 15, name: "Cửa hàng lưu niệm Lotte", type: "Cửa hàng quà tặng", dateAdded: "2024-11-08", imageURL: "image.jpg" },
        { id: 16, name: "Khu thể thao Phú Thọ", type: "Thể thao ngoài trời", dateAdded: "2024-11-09", imageURL: "image.jpg" },
    ]);

    const categoryColumns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
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
        { title: 'ID', dataIndex: 'id', key: 'id' },
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
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Tên Địa Điểm', dataIndex: 'name', key: 'name' },
        { title: 'Loại', dataIndex: 'type', key: 'type' },
        { title: 'Ảnh', dataIndex: 'imageURL', key: 'image', render: (text) => <span>{text}</span> },
        { title: 'Ngày Thêm', dataIndex: 'dateAdded', key: 'dateAdded' },

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