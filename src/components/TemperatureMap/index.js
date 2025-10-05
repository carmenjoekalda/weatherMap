import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const TemperatureGrid = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    if (!data || data.length === 0) return;

    // temperature scale
    const temps = data.map(d => d.temperature);
    const minT = Math.min(...temps);
    const maxT = Math.max(...temps);

    // color scale
    const getColor = (t) => {
      const x = (t - minT) / (maxT - minT);
      const r = Math.round(255 * x);
      const g = Math.round(255 * (1 - Math.abs(x - 0.5) * 2));
      const b = Math.round(255 * (1 - x));
      return `rgba(${r},${g},${b},0.6)`;
    };
    
    // grid
    const layerGroup = L.layerGroup();
    data.forEach((pt) => {
      const lat = pt.lat;
      const lon = pt.lon;
      const size = 3;
      const bounds = [
        [lat - size / 2, lon - size / 2],
        [lat + size / 2, lon + size / 2],
      ];

      const rect = L.rectangle(bounds, {
        stroke: false,
        fillColor: getColor(pt.temperature),
        fillOpacity: 0.6,
      });

      rect.bindPopup(
        `<b>Lat:</b> ${lat.toFixed(2)}<br/><b>Lon:</b> ${lon.toFixed(2)}<br/><b>Temp:</b> ${pt.temperature}°C`
      );

      rect.addTo(layerGroup);
    });

    layerGroup.addTo(map);

    return () => {
      map.removeLayer(layerGroup);
    };
  }, [data, map]);

  return null;
};

const TemperatureMap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://a5yzb9dv5e.execute-api.us-east-1.amazonaws.com/dev/cities")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
        worldCopyJump={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap & CartoDB"
        />
        <TemperatureGrid data={data} />
      </MapContainer>
    </div>
  );
};

export default TemperatureMap;
