import React from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const Logout = async()=>{
        try {
            await axios.delete('http://localhost:5000/logout');
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                    <img src="https://bulma.io/images/bulma-logo.png" alt="Logo" width="112" height="28"/>
                    </a>
                
                    <a role="button" href="/" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    </a>
                </div>
        
            <div id="navbarBasicExample" className="navbar-menu">
                {/*<div className="navbar-start">
                    <a className="navbar-item" href="/">
                        Home
                    </a>
                </div>*/}
                <div className="navbar-end">
                    <div className="navbar-item has-dropdown is-hoverable">
                        <p className="navbar-link">
                        More
                        </p>
                
                        <div className="navbar-dropdown">
                        <a className="navbar-item" target="_blank" href="https://id.linkedin.com/in/ridha-akmal">
                            Linkedin
                        </a>
                        <a className="navbar-item" target="_blank" href="https://github.com/RidhaAkmal">
                            Github
                        </a>
                        <hr className="navbar-divider"/>
                        <a className="navbar-item" target="_blank" href="https://github.com/RidhaAkmal/login-register-javascript">
                            Report an issue on repository
                        </a>
                        </div>
                    </div>
                    <div className="navbar-item">
                        <div className="buttons">
                        <button onClick={Logout} className="button is-light">
                            Log Out
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </nav>
    )
}

export default Navbar
