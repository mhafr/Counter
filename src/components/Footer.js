import React from 'react'
import { ImFacebook, ImTwitter, ImInstagram } from "react-icons/im";

const Footer = () => {
  return (
    <div className='footer-container'>
        <ImFacebook className='social-icon'/>
        <ImTwitter className='social-icon'/>
        <ImInstagram className='social-icon'/>
    </div>
  )
}

export default Footer