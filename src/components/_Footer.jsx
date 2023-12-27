import React from 'react'
import '../styles/footer.css'
import Logo from '../assets/zeus2.jpg'
import { FaFacebook, FaTwitter, FaPinterest, FaInstagram } from 'react-icons/fa'

const _Footer = () => {
  return (
    <div className='footer'>
         <img src={Logo} alt="logo" />
         {/* <span>Made with our Stocky</span> */}
         <small className='website-rights'>infodent © 2023</small>

         <div className="footerItem">
          <span className="footerTitle">FOLLOW US</span>
          <div className="footerSocial">
            <i className="footerIcon"><FaFacebook/></i>
            <i className="footerIcon"><FaTwitter /></i>
            <i className="footerIcon">< FaPinterest/></i>
            <i className="footerIcon"><FaInstagram /></i>
          </div>
          </div>
    </div>

    
  )
}

export default _Footer