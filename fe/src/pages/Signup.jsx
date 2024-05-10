import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import snackbar from "../utility/snackbar";

// const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// // const requestOptions = {
// //     method: "POST",
// //     headers: myHeaders,
// //     body: raw,
// //     redirect: "follow"
// //   };

const Signup=()=>{
    const [name,setName]= useState('')
    const [phone,setPhone]= useState('')
    const [email,setEmail]=useState('')
    const [username, setUsername]=useState('')
    const [password,setPassword]=useState('')

    const submit = async () =>{
        console.log(name,email,phone,username,password);
        const body = {name,phone,email,username,password};
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/signup`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(body)
        })
        const data = await response.json();
        
        if(response.status == 201){
            snackbar('success','User Created !!');
            resetForm();
        }else{
            snackbar('error',data.error)
        }
        // fetch("localhost:8080/api/v1/auth/signup", requestOptions)
        // .then((response) => response.text())
        // .then((result) => console.log(result))
        // .catch((error) => console.error(error));
        // setName('');
        // setPhone('');
        // setEmail('');
        // setUsername('');
        // setPassword('');
    }

    const resetForm =()=>{
        setName('');
        setPhone('');
        setEmail('');
        setUsername('');
        setPassword('');
    }

return (
    <div className="signup">
        <button onClick={snackbar}>hello</button>
        <div className="signup-form">
        <h2>SignUp</h2>
        <Input type="name" placeholder="Full Name"  onChange={e=> setName(e.target.value)} value={name} style={{ width: '500px' }} />
        <Input type="email" placeholder="Email"  onChange={e=> setEmail(e.target.value)} value={email} required style={{ width: '500px' }}/>
        <Input type="number" placeholder="Phone" onChange ={e=>setPhone(e.target.value)} value={phone} required style={{ width: '500px' }} />
        <Input type="text" placeholder="User Name" onChange={e=> setUsername(e.target.value)} value={username} style={{ width: '500px' }}/>
        <Input type="password" placeholder="Password" onChange={e=> setPassword(e.target.value)} vaue ={password} style={{ width: '500px' }}/>
        <Button type="Submit" onClick={submit} style={{ width: '500px' }}>Submit</Button>
    </div>
    </div>
)
}
export default Signup;