import Wrapper from "../assets/wrappers/AdminPlace";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Select,
  Table,
  Button,
  Modal,
  Input,
  Space,
  Form,
  message,
  Upload,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
  WifiOutlined,
} from "@ant-design/icons";
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
        // console.log(categoriesResponse.data.categories);
        const categoriesData = categoriesResponse.data.categories || [];
        setCategories(categoriesData);

        // fetch types
        const typesResponse = await customFetch.get("/types/");
        // console.log(typesResponse.data.types);
        const typesData = typesResponse.data.types || [];
        setTypes(typesData);

        // fetch places
        const placesResponse = await customFetch.get("/tourist-attractions/");
        // console.log(placesResponse.data.touristAttractions);
        const placesData = placesResponse.data.touristAttractions || [];
        setPlaces(placesData);
      } catch (error) {
        toast.error(error?.response?.data?.msg /*|| "Lỗi khi tải dữ liệu"*/);
      }
    };
    fetchData();
  }, [categories, types, places]);

  const showModal = (type, record = null) => {
    setModalType(type);
    setEditingRecord(record);
    setIsModalVisible(true);
    if (record) {
      if (record.coordinates) {
        const categories = record.category.map((cat) => cat.name);

        form.setFieldsValue({
          name: record.name,
          description: record.description,
          address: record.address,
          phoneNumber: record.phoneNumber,
          status: record.status,
          latitude: record.coordinates.latitude,
          longitude: record.coordinates.longitude,
          imageUrl: record.imageUrl,
          type: record.type.name,
          category: categories,
        });
      } else {
        form.setFieldsValue(record); // Điền dữ liệu vào form nếu đang chỉnh sửa
      }
    } else {
      form.resetFields(); // Đặt lại form nếu là thêm mới
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  //Create new record
  const handleCreate = async (values) => {
    try {
      let endpoint = "";
      switch (modalType) {
        case "addCategory":
          endpoint = "/categories/";
          const categoryData = {
            name: values.name,
            description: values.description,
          };
          const categoryResponse = await customFetch.post(
            endpoint,
            categoryData
          );
          setCategories([...categories, categoryResponse.data]);
          break;
        case "addType":
          endpoint = "/types/";
          const typeData = {
            name: values.name,
            description: values.description,
          };
          const typeResponse = await customFetch.post(endpoint, typeData);
          setTypes([...types, typeResponse.data]);
          break;
        case "addPlace":
          endpoint = "/tourist-attractions/";

          // Create coordinates object
          const coordinates = {
            latitude: parseFloat(values.latitude),
            longitude: parseFloat(values.longitude),
          };

          // Merge coordinates into the values
          const placeData = {
            ...values,
            coordinates, // Add coordinates object to values
            latitude: undefined, // Remove latitude field
            longitude: undefined, // Remove longitude field
            type: types.find((t) => t.name === values.type)?._id, // Chuyển type.name thành ObjectId
            category: values.category.map(
              (cat) => categories.find((c) => c.name === cat)?._id
            ), // Chuyển category.name thành ObjectId
          };

          const placeResponse = await customFetch.post(endpoint, placeData);
          setPlaces([...places, placeResponse.data]);
          break;
      }

      message.success("Thêm mới thành công!");
      handleCancel();
    } catch (error) {
      message.error(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
  };

  //Update record
  const handleUpdate = async (values) => {
    try {
      let endpoint = "";
      switch (modalType) {
        case "editCategory":
          endpoint = `/categories/${editingRecord._id}`;
          const categoryData = {
            name: values.name,
            description: values.description,
          };
          const categoryResponse = await customFetch.patch(
            endpoint,
            categoryData
          );
          setCategories([...categories, categoryResponse.data]);
          break;
        case "editType":
          endpoint = `/types/${editingRecord._id}`;
          const typeData = {
            name: values.name,
            description: values.description,
          };
          const typeResponse = await customFetch.patch(endpoint, typeData);
          setTypes([...types, typeResponse.data]);
          break;
        case "editPlace":
          endpoint = `/tourist-attractions/${editingRecord._id}`;

          // Create coordinates object
          const coordinates = {
            latitude: parseFloat(values.latitude),
            longitude: parseFloat(values.longitude),
          };

          // Merge coordinates into the values
          const placeData = {
            ...values,
            coordinates,
            latitude: undefined, // Remove latitude field
            longitude: undefined, // Remove longitude field
            type: types.find((t) => t.name === values.type)?._id, // Chuyển type.name thành ObjectId
            category: values.category.map(
              (cat) => categories.find((c) => c.name === cat)?._id
            ), // Chuyển category.name thành ObjectId
          };

          const placeResponse = await customFetch.patch(endpoint, placeData);
          setPlaces([...places, placeResponse.data]);
          break;
      }

      // Update local state based on type
      //   if (modalType === "editCategory") {
      //     setCategories(
      //       categories.map((cat) =>
      //         cat._id === editingRecord._id ? response.data : cat
      //       )
      //     );
      //   } else if (modalType === "editType") {
      //     setTypes(
      //       types.map((type) =>
      //         type._id === editingRecord._id ? response.data : type
      //       )
      //     );
      //   } else if (modalType === "editPlace") {
      //     setPlaces(
      //       places.map((place) =>
      //         place._id === editingRecord._id ? response.data : place
      //       )
      //     );
      //   }

      message.success("Cập nhật thành công!");
      handleCancel();
    } catch (error) {
      message.error(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
  };

  //Delete record
  const handleDelete = async (id, type) => {
    if (!id) {
      message.error("ID không hợp lệ!");
      return;
    }

    // Hiển thị modal xác nhận xóa
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Xóa",
      cancelText: "Hủy",
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          let endpoint = "";
          switch (type) {
            case "category":
              endpoint = `/categories/${id}`;
              break;
            case "type":
              endpoint = `/types/${id}`;
              break;
            case "place":
              endpoint = `/tourist-attractions/${id}`;
              break;
            default:
              throw new Error("Loại không hợp lệ");
          }

          // Gửi yêu cầu xóa
          await customFetch.delete(endpoint);

          // Cập nhật state local sau khi xóa thành công
          if (type === "category") {
            setCategories((prev) =>
              prev.filter((category) => category._id !== id)
            );
          } else if (type === "type") {
            setTypes((prev) => prev.filter((type) => type._id !== id));
          } else if (type === "place") {
            setPlaces((prev) => prev.filter((place) => place._id !== id));
          }

          message.success("Xóa thành công!");
        } catch (error) {
          message.error(error?.response?.data?.msg || "Có lỗi xảy ra!");
        }
      },
      onCancel: () => {
        message.info("Đã hủy thao tác xóa.");
      },
    });
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingRecord) {
          // Cập nhật bản ghi
          // console.log(values);
          handleUpdate(values);
        } else {
          // Tạo mới bản ghi
          handleCreate(values);
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const categoryColumns = [
    {
      title: "STT",
      key: "index",
      width: 40,
      render: (text, record, index) => index + 1, // index bắt đầu từ 0
    },
    // {
    //     title: 'ID',
    //     dataIndex: '_id',
    //     key: 'id',
    //     render: (text) => <span>{text || 'Không xác định'}</span>
    // },
    { title: "Tên Danh Mục", dataIndex: "name", key: "name" },
    {
      title: "Mô Tả",
      dataIndex: "description",
      key: "description",
    },
    { title: "Ngày Cập Nhật", dataIndex: "dateAdded", key: "dateAdded" },
    {
      title: "Thao Tác",
      key: "actions",
      render: (text, record) => (
        <>
          <Space size="middle">
            <Button
              icon={<EditOutlined />}
              onClick={() => showModal("editCategory", record)}
            />
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record._id, "category")}
            />
          </Space>
        </>
      ),
    },
  ];

  const typeColumns = [
    {
      title: "STT",
      key: "index",
      width: 40,
      render: (text, record, index) => index + 1, // index bắt đầu từ 0
    },
    { title: "Tên Loại", dataIndex: "name", key: "name" },
    {
      title: "Mô Tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (text) => <Tooltip title={text}>{text}</Tooltip>,
    },
    {
      title: "Thao Tác",
      key: "actions",
      render: (text, record) => (
        <>
          <Space size="middle">
            <Button
              icon={<EditOutlined />}
              onClick={() => showModal("editType", record)}
            />
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record._id, "type")}
            />
          </Space>
        </>
      ),
    },
  ];

  const placeColumns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1, // index bắt đầu từ 0
    },
    { title: "Tên Địa Điểm", dataIndex: "name", key: "name" },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (text) => (text ? text.name : ""),
    },
    { title: "Địa Chỉ", dataIndex: "address", key: "address" },
    {
      title: "Ảnh",
      dataIndex: "imageUrl",
      key: "image",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          Xem ảnh
        </a>
      ),
    },
    {
      title: "Ngày Thêm",
      dataIndex: "createdAt",
      key: "dateAdded",
      render: (text) =>
        text ? new Date(text).toLocaleDateString("vi-VN") : "",
    },
    {
      title: "Thao Tác",
      key: "actions",
      render: (text, record) => (
        <>
          <Space size="middle">
            <Button
              icon={<EditOutlined />}
              onClick={() => showModal("editPlace", record)}
            />
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record._id, "place")}
            />
          </Space>
        </>
      ),
    },
  ];

  return (
    <Wrapper>
      <div className="section">
        <div className="table-container">
          <div className="table-header">
            <h3>Danh mục địa điểm</h3>
            <Button
              icon={<PlusOutlined />}
              className="btn"
              onClick={() => showModal("addCategory")}
            >
              Thêm mới
            </Button>
          </div>
          <Table
            dataSource={categories}
            columns={categoryColumns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            className="table"
          />
        </div>

        <div className="table-container">
          <div className="table-header">
            <h3>Loại địa điểm</h3>
            <Button
              icon={<PlusOutlined />}
              className="btn"
              onClick={() => showModal("addType")}
            >
              Thêm mới
            </Button>
          </div>
          <Table
            dataSource={types}
            columns={typeColumns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            className="table"
          />
        </div>
      </div>

      <div className="section">
        <div className="table-container">
          <div className="table-header">
            <h3>Danh sách địa điểm</h3>
            <Button
              icon={<PlusOutlined />}
              className="btn"
              onClick={() => showModal("addPlace")}
            >
              Thêm mới
            </Button>
          </div>
          <Table
            dataSource={places}
            columns={placeColumns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            className="table"
          />
        </div>
      </div>

      <Modal
        title={modalType.includes("edit") ? "Chỉnh sửa" : "Thêm mới"}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          {/* Tên và mô tả */}
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: false, message: "Vui lòng nhập mô tả" }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          {/* Các trường bổ sung cho bảng Place */}
          {modalType === "addPlace" || modalType === "editPlace" ? (
            <>
              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="latitude"
                label="Vĩ độ (Latitude)"
                rules={[{ required: true, message: "Vui lòng nhập vĩ độ" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="longitude"
                label="Kinh độ (Longitude)"
                rules={[{ required: true, message: "Vui lòng nhập kinh độ" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="Số điện thoại liên hệ"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[
                  { required: true, message: "Vui lòng nhập trạng thái" },
                ]}
              >
                <Select placeholder="Chọn trạng thái" allowClear>
                  <Select.Option value="open">Mở cửa</Select.Option>
                  <Select.Option value="closed">Đóng cửa</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="type"
                label="Loại địa điểm"
                rules={[{ required: true, message: "Vui lòng chọn loại" }]}
              >
                <Select placeholder="Chọn loại địa điểm" allowClear>
                  {types.map((type) => (
                    <Select.Option key={type.id} value={type.name}>
                      {type.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="category"
                label="Danh mục địa điểm"
                rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
              >
                <Select placeholder="Chọn danh mục" mode="multiple" allowClear>
                  {categories.map((category) => (
                    <Select.Option key={category.id} value={category.name}>
                      {category.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="imageUrl"
                label="Link ảnh"
                rules={[{ required: true, message: "Vui lòng nhập link ảnh" }]}
              >
                <Input placeholder="Nhập URL ảnh" />
              </Form.Item>
            </>
          ) : null}
        </Form>
      </Modal>
    </Wrapper>
  );
};

export default Place;
