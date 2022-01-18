import React from 'react';
import logo from './../logo.svg';
import {
    BrowserRouter,
    Routes,
    Route,
    useParams,
    Link
  } from "react-router-dom";
  import { Navbar,Nav,Container } from 'react-bootstrap';
  import MyList from './../page/MyList';
  import MyDetail from './../page/MyDetail';

class NavbarList extends React.Component{

    render(){
        return(
            <>
                
                <BrowserRouter>
                        <Navbar bg="primary" variant="dark">
                            <Container>
                            <Navbar.Brand to="/"><img src={logo} className="App-logo" alt="logo" style={{"width" : "20%", "height" : "20%"}} /></Navbar.Brand>
                            <Nav className="me-auto">
                            <Nav.Link as={Link}  to="/">Home</Nav.Link>
                            </Nav>
                            </Container>
                        </Navbar>

                        <Routes>
                            <Route exact path="/"  element={<MyList/>}/>
                            <Route path="/detail/:id" element={<MyDetail/>}/>
                        </Routes>
                </BrowserRouter>
            </>
        )  
    }
}

export default NavbarList;