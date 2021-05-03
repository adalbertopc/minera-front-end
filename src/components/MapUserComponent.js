import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { useMapbox, seleccionarCarro, seleccionarSona, informacionCarro } from '../hooks/useMapbox';
import { v4 } from 'uuid';

let bloqueadoBtn = true;
let idCarro = '';

export const activarEntrega = (bloqueado, id) => {
	bloqueadoBtn = bloqueado;
	idCarro = id;
	console.log(bloqueado, 'usuario', id);
};

const puntoInicial = {
	lng: -109.02089,
	lat: 27.16125,
	zoom: 15,
};

export const MapUserComponent = () => {
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
		[socket, agregarSona, seleccionarCarro]
	);

	useEffect(
		(ev) => {
			socket.on('sonas-activas', (sonas) => {
				if (!(sonas.lenght === 0 || sonas === null || !sonas)) {
					console.log(sonas, 'desde sonas activas');
					agregarLayers(sonas);
				}
			});
		},
		[socket, agregarLayers]
	);

	// Escuchar los marcadores existentes
	useEffect(() => {
		socket.on('marcadores-activos', async (marcadores) => {
			for (const marcador of marcadores) {
				await seleccionarCarro(true);
				agregarMarcador(marcador, marcador.id);
			}
		});
	}, [socket, agregarMarcador]);

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
	}, [socket, agregarMarcador]);

	const addEntrega = () => {
		console.log('marcar entrega');
		socket.emit('agregar-entrega', idCarro, datos);
		bloqueadoBtn = true;
	};

	const addCarga = () => {
		console.log('Cargado');
	};

	const [datos, setDatos] = useState({
		material: '',
		cantidad: '',
		fecha: new Date(),
	});
	const [datos1, setDatos1] = useState({
		conductor: '',
		tipoCarro: '',
	});
	const handleChange = (e) => {
		setDatos({
			...datos,
			[e.target.name]: e.target.value,
		});
	};

	const guardarCarga = (e) => {
		e.preventDefault();
		datos['id'] = v4();
		console.log(
			'id',
			datos.id,
			'material ',
			datos.material,
			'cantidad ',
			datos.cantidad,
			'fecha',
			datos.fecha
		);
	};

	const addCarro = (e) => {
		if (datos1.conductor.trim().length == 0 || datos1.tipoCarro.trim() == 0) {
			console.log('Falta informacion');
		} else {
			seleccionarCarro(true);
			guardarCarro(e);
			guardarCarga(e);
			console.log('Agregar carro');
		}
	};

	const guardarCarro = (e) => {
		e.preventDefault();
		informacionCarro(datos1);
		console.log('conductor ', datos1.conductor, ' carro ', datos1.tipoCarro);
	};

	const handleChangeCarro = (e) => {
		setDatos1({
			...datos1,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<>
			<div className='info'>
				Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
			</div>

			<div ref={setRef} id='id' />
			<div className='sidebar'>
				<div className='heading'>
					<h1>Routes</h1>
				</div>
				<div id='reports' className='reports'></div>
			</div>

			<button className='btn btn-3' onClick={addEntrega} disabled={bloqueadoBtn}>
				Entrega
			</button>
			<button className='btn btn-2' onClick={addCarga}>
				Carga
			</button>

			<button className='btn btn-2' onClick={addCarro}>
				Poner carro
			</button>

			<div className='formulario'>
				<span>Vehiculo</span>
				<form onSubmit={addCarro}>
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
					<input
						type='text'
						placeholder='Material'
						name='material'
						onChange={handleChange}
					/>
					<input
						type='text'
						placeholder='Cantidad'
						name='cantidad'
						onChange={handleChange}
					/>
					<button>Guardar</button>
				</form>
			</div>
		</>
	);
};
