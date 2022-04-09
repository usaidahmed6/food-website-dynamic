import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import { auth, signOut } from '../screen/firebase'
import './header.css'


const Header = () => {
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user=>',)
    })
  }, [])

  const GoToRestaurantPage = () => {
    navigate('/RestaurantSignUp')
  }
  const GoToUserPage = () => {
    navigate('/UserSignUp')
  }
  const onClickLogout = () => {
    signOut(auth).then(() => navigate('/login'))
  }
  return (

    <Navbar bg="light" expand="lg" className='fixed-top'>
      <Container fluid>
        <Navbar.Brand href="#">
          <b className="logo"><i className="fas fa-utensils"></i>food</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to={'/'} className={'text-dark my-4'}>
              <Nav className='mx-4'>Home</Nav>
            </Link>
            <Link to={'/Restaurant'} className={'text-dark my-4'}>
              <Nav className='mx-4'>
              Restaurant
              </Nav>
            </Link>

            <Link to={'/createRestaurant'} className={'text-dark my-4'}>
              <Nav className='mx-4'>
               Create Restaurant
              </Nav>
            </Link>
            <Link to={'/login'} className='mx-4 text-dark my-4'>
            <Nav >
               Login
              </Nav>
            </Link>

          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>



  )
}

export default Header























// <Navbar  bg="light" expand="lg">
    //   <Container fluid>
    //     <Navbar.Brand href="#" bg='dark'>Restaurant Website</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="navbarScroll" />
    //     <Navbar.Collapse id="navbarScroll">
    //       <Nav
    //         className="me-auto my-2 my-lg-0"
    //         style={{ maxHeight: '100px' }}
    //         navbarScroll
    //       >
    //         <Link to={'/Restaurant'}>
    //           <Nav className="me-auto">
    //             <Nav>your restaurant</Nav>
    //           </Nav>
    //         </Link>
    //       </Nav>

    //       <Link to="/login">
    //         <Button variant="outline-success" className='mx-2 my-2'>Login</Button>
    //         <Button variant="outline-success" className='mx-2 my-2' onClick={onClickLogout}>LogOut</Button>
    //       </Link>
    //       {/* <Button variant="outline-success" className=' my-2 mx-2' onClick={GoToUserPage}>SignUp User</Button> */}
    //       <Button variant="outline-success" className='my-2 mx-2' onClick={GoToRestaurantPage}>Create Account </Button>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>