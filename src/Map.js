import React from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';

const Map = ({ countries, casesType, mapCenter, zoom }) => {
	console.log('mapCenter inside map===', mapCenter);
	function ChangeView({ center, zoom }) {
		const map = useMap();
		map.setView(center, zoom);
		return null;
	}
	return (
		<div className='map'>
			<MapContainer center={mapCenter} zoom={zoom} scrollWheelZoom={false}>
				<ChangeView center={mapCenter} zoom={zoom} />
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				<Marker position={mapCenter}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
};

export default Map;
