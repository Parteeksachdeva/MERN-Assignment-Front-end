import React,{useState} from 'react'
import axios from '../../axios';
import { Link, useHistory } from 'react-router-dom';
import "./Signup.css"
import { ImCross } from 'react-icons/im';
function Signup() {
    let history = useHistory()
    const [userInfo,setUserInfo]=useState({
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        repassword:"",
        birthday:"",
    })
    const [error,setError] = useState("");
    const handleValidation=(e)=>{
        e.preventDefault();
        e.target.reportValidity();
    }
    function handleChange(e){
        setUserInfo({...userInfo,[e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault();
        if(userInfo.password!==userInfo.repassword) setError("Passwords don't match")
        else{
            axios.post("/users/signup",userInfo)
            .then(res=>{
                if(res.data.success)
                history.push("/signin")
                else {
                    setError(res.data?.message);
                }
            })
            .catch(err=>{
                setError(err.data?.message);
                console.log(err);
            })
        }
    }
    function handleClick(){
        setError("")
    }
    return (
        <div className="signup">
            <h1>Sign Up</h1>
           <form onSubmit={handleSubmit}>
                <input name="firstname" placeholder="FirstName" onChange={handleChange} required onBlur={handleValidation} />
                <input name="lastname" placeholder="LastName"  onChange={handleChange} required onBlur={handleValidation}/>    
                <input type="email" name="email" placeholder="Email" onChange={handleChange} pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}" required onBlur={handleValidation}/>
                <input name="password" placeholder="Password" minlength="6" type="password" onChange={handleChange} required onBlur={handleValidation}/>
                <input name="repassword" placeholder="Retype-Password" type="password" onChange={handleChange} required onBlur={handleValidation}/>
                <input name="birthday" type="date" onChange={handleChange} required onBlur={handleValidation}></input>
                <button type="submit">Sign Up</button>
           </form>
           {error && 
            <div className="signup__error">
            <div style={{cursor: "pointer"}} onClick={handleClick}><ImCross/></div>
            <p>{error}</p>
        </div>}
        <p>Already Registered? <Link to="/signin">Signin</Link></p>
        </div>
    )
}


export default Signup
