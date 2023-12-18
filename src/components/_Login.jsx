import React,{useState} from 'react'
import {Link,useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Login = () => {
    const [email, setEmail] = useState('')
    const [pssw, setPssw] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        // e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:5050/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, pssw }),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                if (data.status === 'success') {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    navigate('/home');
                }
            } else {
                throw new Error('eror during login');
            }
        } catch (error) {
            console.error('error di fetching', error);
        }
    };
    


  return (
    <div className='d-flex align-content-center bg-seconary vh-100 '>
        <div className='bg-white p-3 rounded w-25 '>
        <h2>Login</h2>
       
        <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control placeholder="Email"aria-label="Email"aria-describedby="basic-addon1"
                          
                            onChange={(e) => setEmail(e.target.value)}  
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control type='password' placeholder="Password"aria-label="Password"aria-describedby="basic-addon1"
                        
                            onChange={(e) => setPssw(e.target.value)}  
                        />
                    </InputGroup>
                  <Link to='/home'>  <button type="submit" className="btn btn-primary">Login</button></Link>
           
        </Form>
        <p>Already have a account</p>

        </div>
    </div>
  )
}

export default Login