import React from 'react'
import home from '../assets/home.png'
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <nav>
            <div className="nav-container">
                <Link to="/">
                    <div className="nav-left">
                        <img src={home} alt="" />
                        <h1>Awaas Vishwa</h1>
                    </div>
                </Link>
                <div className="nav-right">
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>SignUp</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;