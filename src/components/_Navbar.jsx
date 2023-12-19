import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/zeus2.jpg'
import '../styles/navbar.css'


const _Navbar = () => {
    return (
        <div className='navbar'>
            <div className='container'>

                <div className='logo'>
                    <Link className='link' to='/'><h4>Stocky</h4>
                        <img src={Logo} alt='logo' />
                    </Link>
                </div>
                <div className='nav-links'>
                    <div className='links'>
                        <Link className='link' to='/home'><h6>HOME</h6></Link>
                    </div>
                    <div className='links'>
                        <Link className='link' to='/about'><h6>ANNUNCI</h6></Link>
                    </div>
                    <div className='links'>
                        <Link className='link' to='/contact'><h6>CONTACT</h6></Link>
                    </div>
                    <div className='links'>
                        <Link className='link' to='/login'><h6>Login</h6></Link>
                    </div>
                    <div className='links'>
                        <Link className='link' to='/signin'><h6>Signin</h6></Link>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default _Navbar