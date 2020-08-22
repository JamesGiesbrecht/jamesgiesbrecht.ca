import React from 'react'
import { Container, Toolbar } from '@material-ui/core'
import NavBar from './NavBar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <Toolbar />
      <Container>
        {children}
      </Container>
      <Footer />
    </>
  )
}

export default Layout
