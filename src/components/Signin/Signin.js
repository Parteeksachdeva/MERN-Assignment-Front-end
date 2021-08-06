import React,{ useState } from 'react'
import axios from '../../axios';
import { Link, useHistory } from 'react-router-dom';
import "./Signin.css"
import { ImCross } from 'react-icons/im';
function Signin() {
    let history = useHistory()
    const [userInfo,setUserInfo]=useState({
        email:"",
        password:""
    })
    const [error,setError] =useState("");
    function handleChange(e){
        setUserInfo({...userInfo,[e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault();
        axios.post("/users/signin",{email:userInfo.email,password:userInfo.password})
        .then(res=>{
            localStorage.setItem('token', res.data.token);
            history.push("/home")
        })
        .catch(err=>{
            setError("Email And Password Doesn't Match");
            console.log(err);
        })
    }
    function handleClose(){
        setError("")
    }
    return (
        <div className="signin">
            <h1>Sign In</h1>
           <form onSubmit={handleSubmit}>
               <input type="email" name="email" placeholder="Email" onChange={handleChange} pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}" />
               <input name="password" minlength="6" placeholder="Password" type="password" onChange={handleChange} />
               <button type="submit">Sign In</button>
           </form>
           { error!=="" &&
            <div className="signin__error">
                <div style={{cursor: "pointer"}} onClick={handleClose}><ImCross/></div>
                <p>{error}</p>
            </div>}
            <p>New User? <Link to="/signup">Signup</Link></p>
        </div>
    )
}

export default Signin
