import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.js";
import { useMap } from "react-leaflet";
import TravelIcon from "../assets/images/cat-travel.gif";

const LeafletRoutingMachine = ({ destination }) => {
  const map = useMap();
  const customTravelIcon = L.icon({
    iconUrl: TravelIcon,
    iconSize: [60, 60],
  });

  const [currentLocation, setCurrentLocation] = useState(null);

  let routingControl = null;
  let currentTravellingMarker = null;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);

        // Center map on user's location
        map.setView([latitude, longitude], 13);
      },
      (error) => {
        console.error("Error getting current location", error);
      }
    );

    return () => {
      if (routingControl) {
        map.removeControl(routingControl);
      }
      if (currentTravellingMarker) {
        map.removeLayer(currentTravellingMarker);
      }
    };
  }, [map]);

  useEffect(() => {
    if (!currentLocation) return; // Only add routing if current location is available

    if (destination) {
      currentTravellingMarker = L.marker(
        [currentLocation[0], currentLocation[1]],
        {
          icon: customTravelIcon,
        }
      ).addTo(map);

      // Create a new routing control with updated waypoints
      routingControl = L.Routing.control({
        waypoints: [
          L.latLng(currentLocation[0], currentLocation[1]),
          L.latLng(destination[0], destination[1]),
        ],
        lineOptions: {
          styles: [
            {
              color: "#2780ca",
              weight: 4,
              opacity: 0.8,
            },
          ],
        },
        routeWhileDragging: false,
        geocoder: L.Control.Geocoder.nominatim(),
        addWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: true,
        reverseWaypoints: true,
      })
        .on("routesfound", function (e) {
          e.routes[0].coordinates.forEach((c, i) => {
            setTimeout(() => {
              currentTravellingMarker.setLatLng([c.lat, c.lng]);
            }, 100 * i);
          });
        })
        .addTo(map);
    }

    const handleMapClick = (e) => {
      // Remove previous routing control and marker
      if (routingControl) {
        map.removeControl(routingControl);
      }
      if (currentTravellingMarker) {
        map.removeLayer(currentTravellingMarker);
      }

      currentTravellingMarker = L.marker(
        [currentLocation[0], currentLocation[1]],
        {
          icon: customTravelIcon,
        }
      ).addTo(map);

      // Create a new routing control with updated waypoints
      routingControl = L.Routing.control({
        waypoints: [
          L.latLng(currentLocation[0], currentLocation[1]),
          L.latLng(e.latlng.lat, e.latlng.lng),
        ],
        lineOptions: {
          styles: [
            {
              color: "#2780ca",
              weight: 4,
              opacity: 0.8,
            },
          ],
        },
        routeWhileDragging: false,
        geocoder: L.Control.Geocoder.nominatim(),
        addWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: true,
        reverseWaypoints: true,
      })
        .on("routesfound", function (e) {
          e.routes[0].coordinates.forEach((c, i) => {
            setTimeout(() => {
              currentTravellingMarker.setLatLng([c.lat, c.lng]);
            }, 100 * i);
          });
        })
        .addTo(map);
    };

    // Add map click event listener
    map.on("click", handleMapClick);

    // Clean up click event on unmount
    return () => {
      map.off("click", handleMapClick);
      if (routingControl) {
        map.removeControl(routingControl);
      }
      if (currentTravellingMarker) {
        map.removeLayer(currentTravellingMarker);
      }
    };
  }, [destination, map, currentLocation]);

  return null;
};

export default LeafletRoutingMachine;
