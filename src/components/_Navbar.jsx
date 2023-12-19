import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/zeus2.jpg'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../styles/navbar.css'


const _Navbar = () => {
    const [isHamMenuOpen, setIsHamMenuOpen] = useState(false);
    return (
        <>
            <div className='position-fixed w-100 border bg-light' expand="lg" style={{ zIndex: "9", height: "70px" }}>
                <Container >
                    <div className='d-flex align-items-center justify-content-between py-1' >
                        <div className='logo text-light myCursor'><Link to={"/"}><img className='m-2' src={Logo}/></Link> <i>Infodent Srl</i></div>
                        <div className=""><i className='bi bi-grid-fill m-2' onClick={() => setIsHamMenuOpen(!isHamMenuOpen)} style={{fontSize: "30px"}}></i></div>
                    </div>
                </Container>
            </div>
            <div className="bg-transparent" style={{ height: "59px" }}>
                {/* This is my nabar spacer. It represents the navbar height. */}
            </div>
            {
                isHamMenuOpen ?

                    <div className='d-flex justify-content-end hamMenu bg-light position-absolute w-100 mt-5 pt-2 top-0 ' style={{ overflowY: "scroll", height: "calc(100vh - 59px)" }} >
                        <div className='myScroll w-100' style={{ minHeight: "calc(100vh - 59px)" }}>

                            <div className='pb-5'>
                                <div >
                                    <ul className='pt-4 pe-4 text-end mb-0'>
                                        <Link to={"/login"}><li> <span onClick={()=>{setIsHamMenuOpen(!isHamMenuOpen)}}>login</span> </li></Link>
                                        <Link to={"/signin"}><li> <span onClick={()=>{setIsHamMenuOpen(!isHamMenuOpen)}}>signin</span> </li></Link>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div> :
                    null
            }
        </>
    )
}

export default _Navbar