import Wrapper from "../assets/wrappers/Map";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import SearchIcon from "../assets/images/search-icon.png";
import CurrentLocationIcon from "../assets/images/current-location-icon.png";
import MarkerIcon from "../assets/images/marker-icon.png";
import MarkerClusterGroup from "react-leaflet-cluster";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useLoaderData, useNavigate } from "react-router-dom";
import useGeoLocation from "../utils/useGeoLocation";
import { useRef, useState } from "react";
import LeafletGeocoder from "../utils/LeafletGeocoder";
import LeafletRoutingMachine from "../utils/LeafletRoutingMachine";
import toNonAccentVietnamese from "../utils/toNonAccentVietnamese";
import { BsBookmarkStarFill } from "react-icons/bs";

export const loader = async () => {
  try {
    const [locations, validateResult] = await Promise.all([
      customFetch.get("/tourist-attractions").then((res) => res.data),
      customFetch.get("/auth/validate").then((res) => res.data),
    ]);
    let allData = [locations, validateResult];
    if (validateResult.isAuthenticated) {
      const { data } = await customFetch.get("/users/current-user");
      allData.push(data);
    }
    return allData;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Map = () => {
  const allData = useLoaderData();
  const { touristAttractions } = allData[0];
  const { isAuthenticated } = allData[1];
  let userData = { name: "anonymous", locationBookmarks: [] };
  if (isAuthenticated) {
    const { user } = allData[2];
    userData = user;
  }

  const HCMCityCoordinates = [10.769444, 106.681944];
  const zoomLevel = 13;
  const mapRef = useRef();
  const navigate = useNavigate();

  const customCurrentLocationIcon = new Icon({
    iconUrl: CurrentLocationIcon,
    iconSize: [30, 30],
  });

  const customDestinationIcon = new Icon({
    iconUrl: MarkerIcon,
    iconSize: [40, 40],
  });

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

  const myLocation = useGeoLocation();

  const showMyLocation = () => {
    if (myLocation.loaded && !myLocation.error) {
      mapRef.current.flyTo(
        [myLocation.coordinates.latitude, myLocation.coordinates.longitude],
        zoomLevel,
        { animate: true, duration: 2 }
      );
    } else {
      alert(myLocation.error.message);
    }
  };

  const [selectedLocation, setSelectedLocation] = useState(null);

  const showDestinationLocation = (coords) => {
    if (coords) {
      mapRef.current.flyTo(coords, zoomLevel, {
        animate: true,
        duration: 2,
      });
    } else {
      alert("Không tìm thấy vị trí");
    }
  };

  const [bookmarks, setBookmarks] = useState(
    userData.locationBookmarks.map((location) => location._id)
  );

  const toggleBookmark = async (locationId) => {
    try {
      const updatedBookmarks = bookmarks.includes(locationId)
        ? bookmarks.filter((id) => id !== locationId) // Remove from bookmarks
        : [...bookmarks, locationId]; // Add to bookmarks
      setBookmarks(updatedBookmarks);

      await customFetch.post("/tourist-attractions/addLocationToBookmark", {
        id: locationId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);

  let filteredLocations = showOnlyBookmarks
    ? touristAttractions.filter((location) => bookmarks.includes(location._id))
    : touristAttractions;

  filteredLocations = filteredLocations.filter((location) =>
    toNonAccentVietnamese(location.name.toLowerCase()).includes(
      toNonAccentVietnamese(searchQuery.toLowerCase())
    )
  );

  return (
    <Wrapper>
      <div className="map-and-list">
        <MapContainer center={HCMCityCoordinates} zoom={zoomLevel} ref={mapRef}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LeafletGeocoder />
          <LeafletRoutingMachine destination={selectedLocation} />
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createCustomClusterIcon}
          >
            {touristAttractions.map((marker) => (
              <Marker
                key={marker._id}
                position={[
                  marker.coordinates.latitude,
                  marker.coordinates.longitude,
                ]}
                icon={customDestinationIcon}
              >
                <Popup>
                  <h4>{marker.name}</h4>
                  <p>
                    <b>Mô tả</b>: {marker.description}
                  </p>
                  <p>
                    <b>Loại địa điểm</b>: {marker.type.name}
                  </p>
                  <p>
                    <b>Địa chỉ</b>: {marker.address}
                  </p>
                  <p>
                    <b>Số điện thoại</b>: {marker.phoneNumber}
                  </p>
                  <img
                    src={marker.imageUrl}
                    alt="tourist attraction"
                    className="img tourist-attraction-img"
                  />
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>

          {myLocation.loaded && !myLocation.error && (
            <Marker
              position={[
                myLocation.coordinates.latitude,
                myLocation.coordinates.longitude,
              ]}
              icon={customCurrentLocationIcon}
            ></Marker>
          )}
        </MapContainer>

        <div className="location-list">
          <div className="search-container">
            <input
              type="text"
              placeholder="Tìm kiếm địa điểm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar"
            />
            <img src={SearchIcon} className="img search-icon-img" />
          </div>
          {isAuthenticated ? (
            <div className="filter-container">
              <p>Bộ lọc:</p>
              <label className="filter-box">
                <input
                  type="checkbox"
                  checked={showOnlyBookmarks}
                  onChange={(e) => setShowOnlyBookmarks(e.target.checked)}
                />
                Đã đánh dấu
              </label>
            </div>
          ) : null}

          {filteredLocations.map((location) => (
            <div key={location._id} className="location-box">
              <img
                src={location.imageUrl}
                alt="tourist attraction"
                className="img tourist-attraction-img"
              />
              <div className="header-location">
                <h4 className="location-name">{location.name}</h4>
                {isAuthenticated ? (
                  <BsBookmarkStarFill
                    className={
                      bookmarks.includes(location._id)
                        ? "bookmark"
                        : "colorless-bookmark"
                    }
                    onClick={() => toggleBookmark(location._id)}
                  />
                ) : null}
              </div>
              <p>
                <b>Mô tả</b>: {location.description}
              </p>
              <p>
                <b>Loại địa điểm</b>: {location.type.name}
              </p>
              <p>
                <b>Địa chỉ</b>: {location.address}
              </p>
              <p>
                <b>Số điện thoại</b>: {location.phoneNumber}
              </p>

              <div className="btn-list">
                <button
                  className="btn"
                  onClick={() =>
                    showDestinationLocation([
                      location.coordinates.latitude,
                      location.coordinates.longitude,
                    ])
                  }
                >
                  Hiện vị trí
                </button>
                <button
                  className="btn"
                  onClick={() =>
                    setSelectedLocation([
                      location.coordinates.latitude,
                      location.coordinates.longitude,
                    ])
                  }
                >
                  Chỉ dẫn
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="btn-list">
        <button className="btn" onClick={() => navigate("/")}>
          Về trang chủ
        </button>
        <button className="btn" onClick={showMyLocation}>
          Hiện vị trí hiện tại
        </button>
      </div>
    </Wrapper>
  );
};

export default Map;
