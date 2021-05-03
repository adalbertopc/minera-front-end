import React, {useContext} from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { AuthContext } from '../auth/AuthContext';

const Container = styled.div`
	display: grid;
	grid-template-rows: 110px 1fr 100px;
	gap: 40px;

	padding: 0 50px 40px 50px;
	background: ${({ theme }) => theme.colors.secondary};
`;

const User = styled.div`
	display: flex;
	flex-direction: column;
	justify-content:  center;
	align-items: center;
	
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);

	h2 {
		font-size: 28px;
		color: white;
	}

	span {
		color: white;
		font-size: 10px;
	}
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
  background: ${({theme}) => theme.colors.primary};
  border: none;
  color: white;
  border-radius: 10px;
  transition: background 0.3s ease, opacity 0.3s ease;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

	opacity: .5;
  
  &:hover {
    background: ${({theme}) => theme.hov.primary};
		opacity: 1;
  }

  span {
    font-size: 20px;
    margin-right: 5px;
  }

`

export default function Nav() {

  const {auth} = useContext(AuthContext)

	return (
		<Container>
			<User>
				<h2>{auth.user.username}</h2>
				<span>{auth.user.userType}</span>
			</User>

			<NavS>
				<div>
					<Link to='/hola'>
						<span className='material-icons'>place</span> Map
					</Link>
				</div>
				<div>
					<Link to='/users'>
						<span className='material-icons'>account_circle</span> Users
					</Link>
				</div>
				<div>
					<Link to='/congestions'>
						<span className='material-icons'>report</span> Congestions
					</Link>
				</div>
				<div>
					<a href='!#'>
						<span className='material-icons'>local_shipping</span> Package
					</a>
				</div>
			</NavS>

      <BtnLogout>
        <span className="material-icons">logout</span>
        logout
      </BtnLogout>
		</Container>
	);
}
