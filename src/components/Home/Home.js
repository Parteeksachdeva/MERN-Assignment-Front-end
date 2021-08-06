import React, {useEffect, useState} from 'react'
import axios from '../../axios';
import "./Home.css"
import HomeBody from '../HomeBody/HomeBody';
import { ImCross } from 'react-icons/im';
import { BiLogOut } from 'react-icons/bi';
import { Link, useHistory } from 'react-router-dom';
function Home() {
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [admin,setAdmin] = useState(false);
   let history= useHistory()
    useEffect(() => {
        axios.get("/users/getRole",
        {headers:{
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }})
        .then(res=>{
            console.log(res.data.admin)
            setAdmin(res.data.admin)
        })
        axios.get("/users/getuser",
        {headers:{
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }})
        .then(res=>{
            setEmail(res.data)
        })
        axios.get("/items",
        {headers:{
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }})
        .then(res=>{
            let arr=res.data;
            arr.reverse()
            setItems(arr);
        })
    }, [])
    function onSubmit(e){  
        e.preventDefault();
        if(message.trim()===""){
            setError("The Field Can't be Empty");
            return;
        }
        setError("")
        e.target.reset();
        axios.post("/items",{message,email})
        .then(r=>{
            setMessage("");
            axios.get("/items",
            {headers:{
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }})
            .then(res=>{
                let arr=res.data;
                arr.reverse()
                setItems(arr);
            })
        })

    }

    function handleClick(){
        localStorage.removeItem("token");
        history.push("/signin")
    }
    function handleClose(){
        setError("")
    }

    return (
        <div className="home">
            <div className="home__header">
                {admin && <div className="header__admin"><Link to="/admin">Admin</Link></div>}
                <div onClick={handleClick} className="home__logout">
                    <BiLogOut />
                    <p>Logout</p>
                </div>
            </div>
            <form onSubmit={onSubmit} className="home__form">
                <input name="message" placeholder="Enter Anything" onChange={(e)=>{setMessage(e.target.value)}} autoComplete="off" ></input>
                <button type="submit">Submit</button>
            </form>
            { error!=="" &&
            <div className="error">
                <div style={{cursor: "pointer"}} onClick={handleClose}><ImCross/></div>
                <p>{error}</p>
            </div>}
            {
                items.map((data)=>(
                    <HomeBody key={data._id} obj={data} setItems={setItems} />
                ))
            }

        </div>
    )
}

export default Home
