import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { AuthContext } from '../auth/AuthContext';
import { types } from '../constants/types';
import { deleteCookie } from '../helpers/deleteCookie';

const Container = styled.div`
	display: grid;
	grid-template-rows: 110px 1fr 100px;
	gap: 40px;

	padding: 0 50px 40px 50px;
	background: ${({ theme }) => theme.colors.secondary};
`;

const Name = styled.h2`
	display: grid;
	place-items: center;
	color: white;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const NavS = styled.nav`
	display: grid;
	height: 300px;

	a {
		display: flex;
		align-items: center;
		color: ${({ theme }) => theme.colors.txt};
		text-decoration: none;
		font-weight: bold;
		padding: 7px 14px;
		border-radius: 5px;
		transition: background 0.3s ease;

		&:hover {
			background: rgba(255, 255, 255, 0.1);
		}

		span {
			margin-right: 10px;
		}
	}
`;

const BtnLogout = styled.button`
	font: bold 16px poppins;
	margin: 55px 30px 0 30px;
	background: ${({ theme }) => theme.colors.primary};
	border: none;
	color: white;
	border-radius: 10px;
	transition: background 0.3s ease;
	cursor: pointer;

	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		background: ${({ theme }) => theme.hov.primary};
	}

	span {
		font-size: 20px;
		margin-right: 5px;
	}
`;

export default function Nav() {
	const { auth, dispatch } = useContext(AuthContext);

	const handleLogut = () => {
		dispatch(types.logout, {});
		deleteCookie('token');
		window.location.replace('/login');
	};

	return (
		<Container>
			<Name>{auth.user.username}</Name>

			<NavS>
				<div>
					<Link to='/'>
						<span class='material-icons'>place</span> Map
					</Link>
				</div>
				<div>
					<Link to='/users'>
						<span class='material-icons'>account_circle</span> Users
					</Link>
				</div>
				<div>
					<Link to='/congestions'>
						<span class='material-icons'>report</span> Congestions
					</Link>
				</div>
				<div>
					<Link to='/user-map'>
						<span class='material-icons'>local_shipping</span> Package
					</Link>
				</div>
			</NavS>

			<BtnLogout onClick={handleLogut}>
				<span class='material-icons'>logout</span>
				logout
			</BtnLogout>
		</Container>
	);
}
