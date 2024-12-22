import Wrapper from "../assets/wrappers/AdminDashboard";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { MdPlace } from "react-icons/md";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";
import { FaPlaceOfWorship } from "react-icons/fa";
import { useState, useEffect } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const Dashboard = ({ onSeeAll }) => {

    const [users, setUsers] = useState([]);
    const [places, setPlaces] = useState([]);
    const [usersCount, setUsersCount] = useState(0);
    const [placesCount, setPlacesCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Gọi API để lấy dữ liệu người dùng
                const usersResponse = await customFetch.get("/users/");
                const users = usersResponse.data.users || [];
                setUsers(users);
                setUsersCount(users.length);

                // Gọi API để lấy dữ liệu địa điểm
                const placesResponse = await customFetch.get("/tourist-attractions/");
                const places = placesResponse.data.touristAttractions || [];
                setPlaces(places);
                setPlacesCount(places.length);

            } catch (error) {
                toast.error(error?.response?.data?.msg || "Lỗi khi tải dữ liệu");
            }
        };
        fetchData();
    }, []);

    return (
        <Wrapper>
            <div className="statistics">
                <div className="box">
                    <div className="displayed-data">
                        <h2>{usersCount}</h2>
                        <div className="type">Người dùng hiện có</div>
                    </div>
                    <FaUserCheck className="icon" />
                </div>
                <div className="box">
                    <div className="displayed-data">
                        <h2>{placesCount}</h2>
                        <div className="type">Địa điểm có sẵn</div>
                        <br />
                    </div>
                    <MdPlace className="icon" />
                </div>
                <div className="box">
                    <div className="displayed-data">
                        <h2>01</h2>
                        <div className="type">Địa điểm được thêm gần đây</div>
                    </div>
                    <FaPlaceOfWorship className="icon" />
                </div>
                <div className="box">
                    <div className="displayed-data">
                        <h2>01</h2>
                        <div className="type">Người dùng thêm gần đây</div>
                    </div>
                    <FaUserPlus className="icon" />
                </div>
            </div>

            {/* Container chứa 2 bảng */}
            <div className="dashboard-tables">
                {/* Bảng thông tin Người dùng được thêm vào gần đây */}
                <div className="recent-table">
                    <div className="table-header">
                        <h3>Người dùng được thêm gần đây</h3>
                        <button className="btn" onClick={() => onSeeAll("user")}>Xem thêm</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date Added</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="name-column">{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.dateAdded}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Bảng thông tin Địa điểm được thêm vào gần đây */}
                <div className="recent-table">
                    <div className="table-header">
                        <h3>Địa điểm được thêm gần đây</h3>
                        <button className="btn" onClick={() => onSeeAll("place")}>Xem thêm</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Place Name</th>
                                <th>Type</th>
                                <th>Date Added</th>
                            </tr>
                        </thead>
                        <tbody>
                            {places.map((place, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{place.name}</td>
                                    <td>{place.type.name}</td>
                                    <td>{new Date(place.updatedAt).toLocaleDateString("vi-VN")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Wrapper>
    )
};

export default Dashboard;