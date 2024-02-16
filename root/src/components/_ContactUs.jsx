
import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ContactUs = () => {
  return (
    <div style={{backgroundColor:"cadetblue",minHeight:"90vh"}}>
    <Container className='mt-3'>
      <Row>
        <Col md={6}>
          <div className='p-3 border rounded font-monserrat text-center'>
            <h2 className='mt-4'>Contact Us</h2>
            <Form>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formBasicMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter your message" />
              </Form.Group>

              <Button variant="primary m-3" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Col>
        <Col md={6}>
          <div className='p-3 border rounded font-monserrat text-center'>
            <h2 className='p-4'>Headquarters:</h2>
            <p><i className="bi bi-geo-alt"></i> Via Dell'industria, 65 - 01100 Viterbo - Italy</p>
            <p><i className="bi bi-telephone"></i> +39 0761 352198</p>
            <p>Email: privacy@infodent.com</p>
            <hr />
            <h2 className='p-4'>Registered Office:</h2>
            <p><i className="bi bi-geo-alt"></i>C.ne Gianicolense, 68 - 00152 Rome - Italy</p>
            <p><i className=""></i> VAT: IT01612570562</p>
          </div>
         
        
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default ContactUs;

