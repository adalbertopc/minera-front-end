import React from 'react';
import { MapComponent } from '../components/MapComponent';
import { SocketProvider } from '../context/SocketContext';
import '../index.css';
export const MapPage = () => {
	return (
		<SocketProvider>
			<MapComponent />
		</SocketProvider>
	);
};
