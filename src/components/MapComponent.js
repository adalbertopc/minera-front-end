import React, { useContext, useEffect, useState } from 'react';

import { SocketContext } from '../context/SocketContext';
import {
	useMapbox,
	seleccionarCarro,
	seleccionarSona,
	seleccionarUsuario,
	informacionCarro,
} from '../hooks/useMapbox';

import { agregarZona, mostrarZonas } from '../helpers/fetchCongestion';

const puntoInicial = {
	lng: -109.02089,
	lat: 27.16125,
	zoom: 15,
};

let descripcion = '';

export const MapComponent = () => {
	useEffect(() => {
		seleccionarUsuario(true);
	}, [seleccionarUsuario]);

	const {
		agregarSona,
		agregarLayers,
		nuevaSona$,
		setRef,
		coords,
		nuevoMarcador$,
		movimientoMarcador$,
		agregarMarcador,
		actualizarPosicion,
		sonaInfo$,
	} = useMapbox(puntoInicial);
	const { socket } = useContext(SocketContext);

	//Agregar nueva sona
	useEffect(() => {
		nuevaSona$.subscribe((sona) => {
			socket.emit('sona-nueva', sona);
		});
	}, [nuevaSona$, socket]);

	useEffect(
		(ev) => {
			socket.on('sona-nueva', async (sona) => {
				await seleccionarSona(true);
				agregarSona(ev, sona);
			});
		},
		[socket, agregarSona, seleccionarSona]
	);

	useEffect(() => {
		socket.on('sonas-activas', (sonas) => {
			console.log('zonas', sonas);
			if (!(sonas === null || sonas.length == 0 || !sonas)) {
				console.log(sonas, 'desde sonas activas');
				agregarLayers(sonas);
			}

			return () => {};
		});
	}, [socket, agregarLayers]);

	// Escuchar los marcadores existentes
	useEffect(() => {
		socket.on('marcadores-activos', async (marcadores) => {
			if (!(marcadores === [] || marcadores === null || marcadores.length === 0)) {
				for (const marcador of marcadores) {
					await seleccionarCarro(true);
					agregarMarcador(marcador, marcador.id);
				}
				console.log('si hay', marcadores);
			}
		});
	}, [socket, agregarMarcador, seleccionarCarro]);

	// Nuevo marcador
	useEffect(() => {
		nuevoMarcador$.subscribe((marcador) => {
			console.log(marcador, '--------');
			socket.emit('marcador-nuevo', marcador);
		});
	}, [nuevoMarcador$, socket]);

	// Movimiento de Marcador
	useEffect(() => {
		movimientoMarcador$.subscribe((marcador) => {
			socket.emit('marcador-actualizado', marcador);
		});
	}, [socket, movimientoMarcador$]);

	// Mover marcador mediante sockets
	useEffect(() => {
		socket.on('marcador-actualizado', (marcador) => {
			actualizarPosicion(marcador);
		});
	}, [socket, actualizarPosicion]);

	// Escuchar nuevos marcadores
	useEffect(() => {
		socket.on('marcador-nuevo', async (marcador) => {
			await seleccionarCarro(true);
			agregarMarcador(marcador, marcador.id);
		});
	}, [socket, agregarMarcador, seleccionarCarro]);

	useEffect(() => {
		sonaInfo$.subscribe((sona) => {
			let objZona = {
				id: sona.id,
				description: descripcion,
				coords: sona.cordenadas,
				date: datosSona.fecha,
			};
			console.log(objZona, datosSona.descripcion);
			agregarZona(objZona);
			//socket.emit("info-sona", objSona);
		});
	}, [sonaInfo$, agregarZona]);

	const addSona = (e) => {
		if (datosSona.descripcion.trim() == '' || datosSona.descripcion.trim().length == 0) {
			console.log('Falta informacion');
		} else {
			seleccionarSona(true);
			guardarSona(e);
		}

		console.log(datosSona.descripcion, datosSona.fecha);
	};

	const addCarro = () => {
		if (datos.conductor.trim().length == 0 || datos.tipoCarro.trim() == 0) {
			console.log('Falta informacion');
		} else {
			seleccionarCarro(true);
			console.log('Agregar carro');
		}
	};

	const [datos, setDatos] = useState({
		conductor: '',
		tipoCarro: '',
	});

	const [datosSona, setDatosSona] = useState({
		descripcion: '',
		fecha: new Date(),
	});

	const handleChangeCarro = (e) => {
		setDatos({
			...datos,
			[e.target.name]: e.target.value,
		});
	};

	const handleChangeSona = (e) => {
		setDatosSona({
			...datosSona,
			[e.target.name]: e.target.value,
		});
	};

	const guardarCarro = (e) => {
		e.preventDefault();
		informacionCarro(datos);
		console.log('conductor ', datos.conductor, ' carro ', datos.tipoCarro);
	};

	const guardarSona = (e) => {
		e.preventDefault();
		descripcion = datosSona.descripcion;
		console.log('descripcion', datosSona.descripcion, 'fecha', datosSona.fecha);
	};

	return (
		<>
			<div className='info'>
				Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
			</div>

			<div ref={setRef} id='id' />

			<button className='btn bt-1' onClick={addSona}>
				Poner Zona
			</button>
			<button className='btn btn-2' onClick={addCarro}>
				Poner carro
			</button>

			<div className='formulario'>
				<span>Vehiculo</span>
				<form onSubmit={guardarCarro}>
					<input
						placeholder='Conductor'
						name='conductor'
						onChange={handleChangeCarro}
					/>
					<input
						placeholder='Tipo carro'
						name='tipoCarro'
						onChange={handleChangeCarro}
					/>

					<button>Guardar</button>
				</form>
			</div>

			<div className='formulario form-2'>
				<span>Zona</span>
				<form onSubmit={addSona}>
					<input
						placeholder='Descripcion'
						name='descripcion'
						onChange={handleChangeSona}
					/>

					<button>Guardar</button>
				</form>
			</div>
		</>
	);
};
