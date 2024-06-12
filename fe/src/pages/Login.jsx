import React, { useContext, useState } from 'react'
import snackbar from '../utility/snackbar'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { UserContext } from '../context/UserContext';
import { validateLoggedInUser } from '../utility/protectRoutes';



const Login = () => {
    
    validateLoggedInUser()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {setUserInfo}=useContext(UserContext)

    const submit = async () => {
        console.log(username, password);
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username,password}),
            credentials:'include'
        })
        const data = await response.json();

        if (response.status == 200) {
            console.log(data?.userInfo);
            setUserInfo(data?.userInfo)
            snackbar('success', data.message);
            resetForm();
        } else {
            snackbar('error', data.error)
        }
    }
    const resetForm = () => {
        setUsername('');
        setPassword('');
    }


    return (
        <div className="login-container">
            Login
            <div className='signup'>
                <button onClick={snackbar}>hello</button>
                <div className="signup-form">
                    <h2>Signup</h2>
                    <Input type="text" placeholder="User Name" onChange={e => setUsername(e.target.value)} value={username} style={{ width: '500px' }} />
                    <Input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} style={{ width: '500px' }} />
                    <Button type="Submit" onClick={submit} style={{ width: '500px' }}>Login</Button>
                </div>
            </div>
        </div>
    )
}
export default Login;