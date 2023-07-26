import React, { useState } from 'react';
import "./Footer.css";
import "./FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link  } from 'react-router-dom';

function Footer(props) {
    const [activeNav, setActiveNav] = useState(1);
    return (
        <nav className="wrapper">
          <div><Link to='/' className="nav-link" onClick={() => setActiveNav(1)}>
            <FontAwesomeIcon icon="home" className={activeNav === 1 ? "nav-item active" : "nav-item"}/>
          </Link></div> 
          <div><Link to='/fishing' className="nav-link" onClick={() => setActiveNav(2)}>
            <FontAwesomeIcon icon="fish" className={activeNav === 2 ? "nav-item active" : "nav-item"}/>
            </Link> </div>
          <div><Link to='/Login' className="nav-link" onClick={() => setActiveNav(3)}>
            <FontAwesomeIcon icon="user" className={activeNav === 3 ? "nav-item active" : "nav-item"}/>
            </Link> </div>
        </nav>
      );
}

export default Footer;