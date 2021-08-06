import React from 'react'
import "./HomeBody.css"
import {ImBin} from 'react-icons/im';
import axios from "../../axios"

function HomeBody({obj,setItems}) {
    function handleClick(){
        axios.delete("/items/delete", {
            headers: {
              id: obj._id
            }
        })
        .then(res=>{
            axios.get("/items",
            {headers:{
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }})
            .then(res=>{
                let arr=res.data;
                arr.reverse()
                setItems(arr);
            })
            console.log(res)
        })
    }
    return (
        <div className="homebody">
            <div onClick={handleClick} className="homebody__del"><ImBin/></div>
            <p>{obj.message}</p>
        </div>
    )
}

export default HomeBody
