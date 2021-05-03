import React from 'react';
import { MapUserComponent } from '../components/MapUserComponent';
import { SocketProvider } from '../context/SocketContext';
import '../index.css';
export const MapUserPage = () => {
	return (
		<SocketProvider>
			<MapUserComponent />
		</SocketProvider>
	);
};
