import Wrapper from "../assets/wrappers/Map";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import CurrentLocationIcon from "../assets/images/current-location-icon.png";
import MarkerIcon from "../assets/images/marker-icon.png";
import MarkerClusterGroup from "react-leaflet-cluster";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import useGeoLocation from "../utils/useGeoLocation";
import { useRef } from "react";
import LeafletGeocoder from "../utils/LeafletGeocoder";
import LeafletRoutingMachine from "../utils/LeafletRoutingMachine";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/tourist-attractions");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Map = () => {
  const { data } = useLoaderData();
  const HCMCityCoordinates = [10.769444, 106.681944];
  const zoomLevel = 13;
  const mapRef = useRef();

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

  return (
    <Wrapper>
      <MapContainer center={HCMCityCoordinates} zoom={zoomLevel} ref={mapRef}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LeafletGeocoder />
        <LeafletRoutingMachine />
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
        >
          {data.touristAttractions.map((marker) => (
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

      <div className="current-location-btn">
        <button className="btn" onClick={showMyLocation}>
          Hiện vị trí hiện tại
        </button>
      </div>
    </Wrapper>
  );
};

export default Map;
