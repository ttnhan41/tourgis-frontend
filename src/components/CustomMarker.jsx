import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import markerIcon from "../assets/images/marker-icon.png";

const CustomMarker = ({
  position,
  destinationImage,
  name,
  description,
  type,
  address,
  phoneNumber,
}) => {
  const customDestinationIcon = L.divIcon({
    html: `
      <div style="position: relative; width: 50px; height: 60px;">
        <img src="${markerIcon}" alt="Marker Icon" style="width: 100%; height: 100%;" />
        <div style="
          position: absolute;
          top: 10px;
          left: 10px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid white;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);">
          <img src="${destinationImage}" alt="Destination" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
      </div>
    `,
    className: "custom-marker-wrapper",
    iconSize: [50, 60],
    iconAnchor: [25, 60], // Centered at the bottom of the marker
    popupAnchor: [0, -60], // Popup appears above the marker
  });

  return (
    <Marker position={position} icon={customDestinationIcon}>
      <Popup>
        <h4>{name}</h4>
        <p>
          <b>Mô tả</b>: {description}
        </p>
        <p>
          <b>Loại địa điểm</b>: {type}
        </p>
        <p>
          <b>Địa chỉ</b>: {address}
        </p>
        <p>
          <b>Số điện thoại</b>: {phoneNumber}
        </p>
        <img
          src={destinationImage}
          alt="tourist attraction"
          className="img tourist-attraction-img"
        />
      </Popup>
    </Marker>
  );
};

export default CustomMarker;
