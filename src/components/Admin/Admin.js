import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from '../../axios';
import AdminCard from '../AdminCard/AdminCard';
import "./Admin.css"
function Admin() {
    const [users, setUsers] = useState([])
    const [admin, setAdmin] = useState(false)
    useEffect(() => {
        axios.get("/users/getRole",
        {headers:{
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }})
        .then(res=>{
            setAdmin(res.data.admin)
        })
        axios.get("/users")
        .then(res=>{
            setUsers(res.data)
        })
    }, [])
    return (
        <div className="admin__main">
            
            <div className="admin__home"><Link to="/home">Home</Link></div>
            {admin && <div className="admin">
                
            {
                    users.map((data)=>(
                        <AdminCard key={data._id} obj={data} setUsers={setUsers} />
                    ))
            }
            </div>}
            {!admin && "No Admin Authorization"}
        </div>
    )
}

export default Admin
