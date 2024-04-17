import React from 'react'
import '../styles/footer.css'
import Logo from '../assets/zeus2.jpg'

const _Footer = () => {
  return (
    <div className='footer mt-5 pt-5'>
         <img src={Logo} alt="logo" />
         {/* <span>Made with our Stocky</span> */}
         <small className='website-rights'>infodent © 2023</small>

         <div className="footerItem">
          <span className="footerTitle">FOLLOW US</span>
          <div className="footerSocial">
            <i className="footerIcon"><i className="bi bi-facebook"></i></i>
            <i className="footerIcon"><i className="bi bi-instagram"></i></i>
            <i className="footerIcon"><i className="bi bi-linkedin"></i></i>
          </div>
          </div>
    </div>

    
  )
}

export default _Footer