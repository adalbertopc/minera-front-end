import { useRef, useState, useEffect, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { v4 } from 'uuid';
import { Subject } from 'rxjs';
import * as turf from '@turf/turf';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import polyline from '@mapbox/polyline';
import { activarEntrega } from '../pages/MapUserPage';

mapboxgl.accessToken =
	'pk.eyJ1Ijoia2xlcml0aCIsImEiOiJja2dzOHdteDkwM2tnMndxMWhycnY3Ymh3In0.Zis8hP6HuwcywtgUhfeZoQ';

let selecCarro = false;
let selecSona = false;
let selectUsuario = false;
let infoCarro = {};

export const seleccionarUsuario = (selec) => {
	selectUsuario = selec;
};

export const seleccionarCarro = (select) => {
	selecCarro = select;
};

export const seleccionarSona = (select) => {
	selecSona = select;
};

export const informacionCarro = (info) => {
	infoCarro = info;
};

export const useMapbox = (puntoInicial) => {
	// Referencia al DIV del mapa
	const mapaDiv = useRef();
	const setRef = useCallback((node) => {
		mapaDiv.current = node;
	}, []);

	// Referencia los marcadores
	const marcadores = useRef({});

	let obstacle = null;
	let directions = null;
	let idCarro = '';

	// Observables de Rxjs
	const movimientoMarcador = useRef(new Subject());
	const nuevoMarcador = useRef(new Subject());
	const nuevaSona = useRef(new Subject());
	const sonaInfo = useRef(new Subject());

	// Mapa y coords
	const mapa = useRef();
	const [coords, setCoords] = useState(puntoInicial);

	let carros = [];

	let clearances = {
		type: 'FeatureCollection',
		features: [
			// Se pueden poner mas obstaculos
		],
	};

	// función para agregar sona
	const agregarSona = useCallback((ev, sonaa) => {
		if (selecSona) {
			let sona = {};
			if (sonaa) {
				clearances.features.push(sonaa);
			} else {
				const { lng, lat } = ev.lngLat || ev;
				console.log(lng, lat);

				sona = {
					id: v4(),
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [lng, lat],
					},
					properties: {
						clearance: "13' 1",
					},
				};

				let objSona = {
					id: sona.id,
					cordenadas: [lng, lat],
				};
				sonaInfo.current.next(objSona);
				console.log('OBJSONA', objSona);
				clearances.features.push(sona);
			}

			console.log(clearances.features, 'desde el metodo');
			obstacle = turf.buffer(clearances, 0.03);

			// aqui va el cs
			let cs = {
				id: `clearances`,
				type: 'fill',
				source: {
					type: 'geojson',
					data: obstacle,
				},
				layout: {},
				paint: {
					'fill-color': '#f03b20',
					'fill-opacity': 0.3,
					'fill-outline-color': '#f03b20',
				},
			};

			if (mapa.current?.getLayer(cs.id)) {
				mapa.current.removeLayer(cs.id);
				mapa.current.removeSource(cs.id);
				for (let i = 0; i <= 2; i++) {
					if (mapa.current?.getSource('route' + i)) {
						mapa.current.removeLayer('route' + i);
						mapa.current.removeSource('route' + i);
					}
				}
				mapa.current?.addLayer(cs);
				nuevaSona.current.next(sona);
				addSourceYLayer(mapa);
			} else {
				mapa.current?.addLayer(cs);
				nuevaSona.current.next(sona);
				addSourceYLayer(mapa);
			}
			selecSona = false;
		}
	}, []);

	function agregarLayers(sonas) {
		console.log('Zonas agregar layers', sonas);
		mapa.current.on('load', () => {
			clearances.features = sonas;
			obstacle = turf.buffer(clearances, 0.03);
			let cs = {
				id: `clearances`,
				type: 'fill',
				source: {
					type: 'geojson',
					data: obstacle,
				},
				layout: {},
				paint: {
					'fill-color': '#f03b20',
					'fill-opacity': 0.3,
					'fill-outline-color': '#f03b20',
				},
			};
			if (mapa.current?.getLayer(cs.id)) {
				console.log('si existe');
				mapa.current.removeLayer(cs.id);
				mapa.current.removeSource(cs.id);
				for (let i = 0; i <= 2; i++) {
					if (mapa.current?.getSource('route' + i)) {
						mapa.current.removeLayer('route' + i);
						mapa.current.removeSource('route' + i);
					}
				}
				mapa.current?.addLayer(cs);
				addSourceYLayer(mapa);
			} else {
				mapa.current?.addLayer(cs);
				addSourceYLayer(mapa);
			}
		});
	}

	function addSourceYLayer(mapa) {
		//Cree orígenes y capas para las rutas devueltas.
		//Habrá un máximo de 3 resultados de la API Directions.
		//Usamos un bucle para crear las fuentes y capas.

		for (let i = 0; i <= 2; i++) {
			mapa.current.addSource('route' + i, {
				type: 'geojson',
				data: {
					type: 'Feature',
				},
			});

			mapa.current.addLayer({
				id: 'route' + i,
				type: 'line',
				source: 'route' + i,
				layout: {
					'line-join': 'round',
					'line-cap': 'round',
				},
				paint: {
					'line-color': '#cccccc',
					'line-opacity': 0.5,
					'line-width': 13,
					'line-blur': 0.5,
				},
			});
		}
	}

	// función para agregar marcadores
	const agregarMarcador = useCallback((ev, id) => {
		if (selecCarro) {
			const { lng, lat } = ev.lngLat || ev;

			const marker = new mapboxgl.Marker();
			marker.id = id ?? v4();

			marker.setLngLat([lng, lat]).addTo(mapa.current).setDraggable(true);

			// Asignamos al objeto de marcadores
			marcadores.current[marker.id] = marker;

			if (!id) {
				let infoMarcador = {
					id: marker.id,
					conductor: infoCarro.conductor,
					tipoCarro: infoCarro.tipoCarro,
					lng,
					lat,
				};
				nuevoMarcador.current.next(infoMarcador);
				carros.unshift(infoMarcador);
				console.log(carros, '------->><<');
			} else {
				carros.unshift(ev);
				console.log(carros, '------->><<');
			}

			// escuchar movimientos del marcador
			marker.on('drag', ({ target }) => {
				const { id } = target;
				const { lng, lat } = target.getLngLat();
				//console.log(lng.toFixed(4), lat.toFixed(5));
				idCarro = id;
				movimientoMarcador.current.next({ id, lng, lat });
			});
			selecCarro = false;
		}
	}, []);

	// Funcion para actualizar la ubicación del marcador
	const actualizarPosicion = useCallback(({ id, lng, lat }) => {
		marcadores.current[id].setLngLat([lng, lat]);
	}, []);

	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapaDiv.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [puntoInicial.lng, puntoInicial.lat],
			zoom: puntoInicial.zoom,
		});

		if (!selectUsuario) {
			var nav = new mapboxgl.NavigationControl();

			directions = new MapboxDirections({
				accessToken: mapboxgl.accessToken,
				unit: 'metric',
				profile: 'mapbox/driving',
				alternatives: 'false',
				geometries: 'geojson',
			});

			map.scrollZoom.enable();
			map.addControl(directions, 'top-left');
		}

		mapa.current = map;
	}, [puntoInicial]);

	useEffect(() => {
		directions?.on('route', (e) => {
			let reports = document.getElementById('reports');
			reports.innerHTML = '';
			let report = reports.appendChild(document.createElement('div'));
			let routes = e.route;

			//Hide all routes by setting the opacity to zero.
			for (let i = 0; i < 3; i++) {
				mapa.current.setLayoutProperty('route' + i, 'visibility', 'none');
			}

			routes.forEach(function (route, i) {
				route.id = i;
			});

			routes.forEach((e) => {
				//Make each route visible, by setting the opacity to 50%.
				mapa.current?.setLayoutProperty('route' + e.id, 'visibility', 'visible');

				//Get GeoJson LineString feature of route
				var routeLine = polyline.toGeoJSON(e.geometry);

				console.log(routeLine.coordinates, ' routeline');
				if (routeLine.coordinates.length === 2) {
					console.log('Serca del destino');
					console.log(routeLine.coordinates[0], '--', routeLine.coordinates[1]);
					if (routeLine.coordinates[0][0] === routeLine.coordinates[1][0]) {
						console.log('ya llego');
						console.log('carro:', idCarro);
						activarEntrega(false, idCarro);
					}
				}

				//Update the data for the route, updating the visual.
				if (!(mapa.current?.getSource('route' + e.id) === null)) {
					mapa.current?.getSource('route' + e.id).setData(routeLine);

					var detail = '';
					var collision = '';
					var emoji = '';
					var clear = turf.booleanDisjoint(obstacle, routeLine);

					if (clear === true) {
						collision = 'is good!';
						detail = 'does not go';
						emoji = '✔️';
						report.className = 'item';
						mapa.current?.setPaintProperty(
							'route' + e.id,
							'line-color',
							'#74c476'
						);
					} else {
						collision = 'is bad.';
						detail = 'goes';
						emoji = '⚠️';
						report.className = 'item warning';
						mapa.current?.setPaintProperty(
							'route' + e.id,
							'line-color',
							'#de2d26'
						);
					}

					//Add a new report section to the sidebar.
					// Assign a unique `id` to the report.
					report.id = 'report-' + e.id;

					// Add the response to the individual report created above.
					var heading = report.appendChild(document.createElement('h3'));

					// Set the class type based on clear value.
					if (clear === true) {
						heading.className = 'title';
					} else {
						heading.className = 'warning';
					}

					heading.innerHTML = emoji + ' Route ' + (e.id + 1) + ' ' + collision;

					// Add details to the individual report.
					var details = report.appendChild(document.createElement('div'));
					details.innerHTML = 'This route ' + detail + ' through an avoidance area.';
					report.appendChild(document.createElement('hr'));
				}
			});
		});
	});

	// Cuando se mueve el mapa
	useEffect(() => {
		mapa.current?.on('move', () => {
			const { lng, lat } = mapa.current.getCenter();
			setCoords({
				lng: lng.toFixed(4),
				lat: lat.toFixed(4),
				zoom: mapa.current.getZoom().toFixed(2),
			});
		});
	}, []);

	// Agregar marcadores cuando hago click
	useEffect(() => {
		mapa.current?.on('click', agregarMarcador);
	}, [agregarMarcador]);

	useEffect(() => {
		mapa.current?.on('click', agregarSona);
	}, [agregarSona]);

	return {
		agregarMarcador,
		actualizarPosicion,
		coords,
		marcadores,
		nuevoMarcador$: nuevoMarcador.current,
		movimientoMarcador$: movimientoMarcador.current,
		setRef,
		sonaInfo$: sonaInfo.current,
		agregarSona,
		nuevaSona$: nuevaSona.current,
		agregarLayers,
	};
};
