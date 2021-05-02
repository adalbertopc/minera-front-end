import React from 'react'

import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  grid-template-rows: 110px 300px;
  gap: 40px;

  padding: 0 50px;
  background: ${({theme}) => theme.colors.secondary};
`

const Name = styled.h2`
  display: grid;
  place-items: center;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, .1);
`

const NavS = styled.nav`
  display: grid;

  a {
    display: flex;
    align-items: center;
    color: ${({theme}) => theme.colors.txt};
    text-decoration: none;
    font-weight: bold;
    padding: 7px 14px;
    border-radius: 5px;
    transition: background .3s ease;

    &:hover {
      background: rgba(255, 255, 255, .1);
    }

    span {
      margin-right: 10px;
    }
  }
`

export default function Nav() {
  return (
    <Container>
      <Name>EduardoRL</Name>

      <NavS>
        <div>
          <a href="!#"><span class="material-icons">place</span> Map</a>
        </div>
        <div>
          <a href="!#"><span class="material-icons">account_circle</span> Users</a>
        </div>
        <div>
          <a href="!#"><span class="material-icons">report</span> Congestions</a>
        </div>
        <div>
          <a href="!#"><span class="material-icons">local_shipping</span> Package</a>
        </div>
      </NavS>

    </Container>
  )
}
