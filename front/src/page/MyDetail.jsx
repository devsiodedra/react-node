import React, {useEffect, useState} from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import {
    useParams 
  } from "react-router-dom";
import logo from './../logo.svg';
const axios = require('axios');
//class MyList extends React.Component{

const MyDetail=()=> {
    let params = useParams({});
    const [data, setData] = useState();
    const fetchUsers = async (page) => {
        const response = await axios.get(`http://localhost:1337/listOne/${params.id}`);
        setData(response.data.cake);
    };

    useEffect(() => {

        fetchUsers();
        
    }, [setData]);

    return (
        <Container fluid>
          <h1>Cake Details</h1>
          <Row>
                    <Col md={12} >
                        <Card >
                        <Col xs={12} sm={12} md={12}>
                            <Card.Img variant="center" src={data ? data.file_url :logo} style={{ width: "18rem" }} />
                        </Col>
                            
                            <Card.Body>
                                <Card.Title>{data ? data.name : ''}</Card.Title>
                                <Card.Text>
                                {data ? data.description : ''}
                                </Card.Text>
                                
                            </Card.Body>
                        </Card>
                    </Col>
          </Row>
        </Container>
      ); 
  }
   
  export default MyDetail;