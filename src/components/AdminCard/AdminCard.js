import React from 'react'
import "./AdminCard.css"
import {BsPersonFill} from 'react-icons/bs';
import {AiOutlineMail} from 'react-icons/ai';
import {FaBirthdayCake} from 'react-icons/fa';
import {ImBin} from 'react-icons/im';
import {RiAdminFill} from 'react-icons/ri';
import axios from "../../axios"
function AdminCard({obj,setUsers}) {
    function handleClick(){
        axios.delete("/users/delete", {
            headers: {
              id: obj._id
            }
        })
        .then(res=>{
            axios.get("/users")
            .then(res=>{
                setUsers(res.data)
            })
            console.log(res)
        })
    }
    return (
        <div className="admincard">
            <div onClick={handleClick} className="admincard__del"><ImBin/></div>
            <div className="admincard__row">
                <BsPersonFill/>
                <p>{`${obj.firstname} ${obj.lastname}`}</p>
            </div>
            <div className="admincard__row">
                <AiOutlineMail/>
                <p>{obj.email}</p>
            </div>
            <div className="admincard__row">
                <FaBirthdayCake/>
                <p>{obj.birthday}</p>
            </div>  
            <div className="admincard__row">
                <RiAdminFill/>
                {obj?.admin ? <p>Admin</p> :<p>User</p>}
            </div>        
        </div>
    )
}

export default AdminCard
