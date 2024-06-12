import React, { useContext } from 'react'
import home from '../assets/home.png'
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
    const {userInfo,setUserInfo} = useContext(UserContext)

    const logout =() =>{
        fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/logout`,{credentials:'include'}) 
        setUserInfo();
    }

    console.log(userInfo)

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
                    {
                        userInfo == undefined ?
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </>
                        :<>
                            {/* <p>Welcome {userInfo.name}!</p> */}
                            <Link to="/list-property">List Property</Link>
                            <Link to="/profile">Profile</Link>
                            <Link onClick={logout}>Logout</Link>
                        </>
                        
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;