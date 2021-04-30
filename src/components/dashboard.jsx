import React from 'react'; 

import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;

  display: grid;
  grid-template-areas: "header header" "nav content";
  grid-template-columns: 80px 1fr;
  grid-template-rows: 80px 1fr;
`

const Header = styled.header`
  grid-area: header;
  background: blue;
`

const Nav = styled.div`
  grid-area: nav;
  background: red;
  height: 100%;
`

const Content = styled.div`
  grid-area: content;
  background: yellow;
  height: 100%;
`

export default function dashboard() {
  return (
    <Container>
      <Header>
        header
      </Header>
      <Nav>
        nav
      </Nav>
      <Content>
        content
      </Content>
    </Container>
  )
}
