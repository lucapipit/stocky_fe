import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Home = () => {
  return (
    <div>
      <div className='d-flex align-items-center justify-content-center' style={{ height: "90vh" }}>
        <Link to={"/store"}>
          <Button variant="primary">Store</Button>
        </Link>
      </div>
    </div>
  )
}

export default Home