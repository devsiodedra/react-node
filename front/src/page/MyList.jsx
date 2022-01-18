import React, {useEffect, useState} from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import {
    Link
  } from "react-router-dom";
import logo from './../logo.svg';
const axios = require('axios');
//class MyList extends React.Component{

const MyList=()=> {
    
    const [data, setData] = useState([]);
    const fetchUsers = async (page) => {
        const response = await axios.get('http://localhost:1337/list');
        setData(response.data.cake);
    };

    useEffect(() => {

        fetchUsers();
        
    }, []);

    
    return (
        <>
          <h1>Cake List</h1>
          <Row>
          {Object.keys(data).map((index, key) => {
              return (
                    <Col key={key}>
                        <Card style={{ width: "18rem" }}>
                            <Card.Img variant="top" src={`${data[index].file_url}`} />
                            <Card.Body>
                                <Card.Title>{data[index].name}</Card.Title>
                                <Card.Text>
                                {data[index].description}
                                </Card.Text>
                                <Button variant="primary" as={Link} to={`/detail/${data[index].id}`} key={data[index].id} >Details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                );
            })}
              
          </Row>
        </>
      ); 
  }
   
  export default MyList;