import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

const LeafletGeocoder = () => {
  const map = useMap();
  useEffect(() => {
    // Check if geocoder control already exists
    if (!map.geocoderControlAdded) {
      const geocoder = L.Control.geocoder({
        defaultMarkGeocode: false,
      })
        .on("markgeocode", function (e) {
          const lat_lng = e.geocode.center;
          L.marker(lat_lng).addTo(map).bindPopup(e.geocode.name).openPopup();
          map.fitBounds(e.geocode.bbox);
        })
        .addTo(map);
      // Mark the control as added
      map.geocoderControlAdded = true;
    }
  }, [map]);

  return null;
};

export default LeafletGeocoder;
