import React from 'react'; 
import Nav from './Nav'

import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;

  display: grid;
  grid-template-columns: 300px 1fr;
`

const Content = styled.div`
  background: ${({theme})  => theme.colors.secondary2};
`

export default function dashboard() {
  return (
    <Container>
      <Nav />
      <Content>
        content
      </Content>
    </Container>
  )
}
