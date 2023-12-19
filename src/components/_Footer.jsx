import React from 'react'
import '../styles/footer.css'
import Logo from '../assets/zeus2.jpg'

const _Footer = () => {
  return (
    <div className='footer'>
         <img src={Logo} alt="logo" />
      <span>Made with our Stocky</span>
    </div>
  )
}

export default _Footer