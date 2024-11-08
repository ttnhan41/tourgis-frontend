import Wrapper from "../assets/wrappers/AdminDashboard";
import { MdPlace } from "react-icons/md";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";
import { FaPlaceOfWorship } from "react-icons/fa";


const Dashboard = ({onSeeAll}) => {
    // dữ liệu mẫu cho bảng địa điểm và người dùng gần đây, sau này sẽ thay bằng data từ API
    const recentUsers = [
        { id: 1, name: "Nguyễn Ngọc Thanh Sang", email: "sang@gmail.com", dateAdded: "2024-11-01" },
        { id: 2, name: "Trần Trọng Nhân", email: "nhan@gmail.com", dateAdded: "2024-11-01" },
    ];

    const recentPlaces = [
        { id: 1, name: "Suối tiên", type: "khu du lịch", dateAdded: "2024-11-01" },
        { id: 2, name: "Hồ đá Làng đại học", type: "khu du lịch", dateAdded: "2024-11-01" },
    ];

    return (
        <Wrapper>
            <div className="statistics">
                <div className="box">
                    <div className="displayed-data">
                        <h2>01</h2>
                        <div className="type">Người dùng hiện có</div>
                    </div>
                    <FaUserCheck className="icon" />
                </div>
                <div className="box">
                    <div className="displayed-data">
                        <h2>01</h2>
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
                            {recentUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
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
                            {recentPlaces.map((place) => (
                                <tr key={place.id}>
                                    <td>{place.id}</td>
                                    <td>{place.name}</td>
                                    <td>{place.type}</td>
                                    <td>{place.dateAdded}</td>
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