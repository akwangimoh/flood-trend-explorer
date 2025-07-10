import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import 'leaflet/dist/leaflet.css';

function ZoomToState({ feature }) {
  const map = useMap();

  useEffect(() => {
    if (feature) {
      const bounds = feature.geometry.coordinates.reduce((acc, polygon) => {
        return acc.concat(polygon[0].map(coord => [coord[1], coord[0]]));
      }, []);

      map.fitBounds(bounds);
    }
  }, [feature, map]);

  return null;
}

function App() {
  const [statesData, setStatesData] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    fetch('/data/nigeria-states.geojson')
      .then(res => res.json())
      .then(data => setStatesData(data))
      .catch(err => console.error('Failed to load GeoJSON', err));
  }, []);

  const stateOptions =
    statesData?.features.map((feature, i) => ({
      value: i,
      label: feature.properties.shapeName || feature.properties.NAME_1 || `State ${i}`,
    })) || [];

  const handleChange = (selectedOption) => {
    const feature = statesData.features[selectedOption.value];
    setSelectedState(feature);
  };

  return (
    <div>
      <div style={{ padding: '10px', width: '300px' }}>
        <Select options={stateOptions} onChange={handleChange} placeholder="Select a State..." />
      </div>

      <MapContainer
        center={[9.0820, 8.6753]}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: '90vh', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {statesData && <GeoJSON data={statesData} />}
        {selectedState && <ZoomToState feature={selectedState} />}
      </MapContainer>
    </div>
  );
}

export default App;
