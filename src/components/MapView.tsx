"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

const MapView: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="w-full h-[500px]">
      <MapContainer
        center={[7.12, -73.12]} // Centro aproximado de Bucaramanga
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Capa base del mapa */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Marcadores dinámicos */}
        {data.map((item, index) => (
          <Marker
            key={index}
            position={[
              parseFloat(item.latitud), 
              parseFloat(item.longitud)
            ]}
            icon={new Icon({
              iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png", // Ícono personalizado
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            {/* Popup con detalles de cada IPS */}
            <Popup>
              <div className="glassmorphism p-2 rounded">
                <strong>{item.nombre_ips_ese}</strong>
                <br />
                <strong>Beds:</strong> {item.camas_hab}
                <br />
                <strong>ICU Beds:</strong> {item.camas_uci}
                <br />
                <strong>Doctors:</strong> {item.med_gener}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
