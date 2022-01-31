import React, { useState,useEffect } from 'react'
import "./css/banner.css"
import {
    Redirect,
    Link
} from "react-router-dom";

import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import axios from "../axios"
import axios_1 from "axios"

import { data } from 'autoprefixer';
import Para from './para';



function Banner({ logout, isAuthenticated ,profo,sub,succ,fun, show, id, setSubjectid=()=>null}) {
   
   
    const [redirect, setRedirect] = useState(false);

    

    const [ formdata, setFormdata ] =useState({id:"", name:"", position:"", college:""})
    const [ subjects, setSubject ]= useState([])

    useEffect(()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }

        axios.get(`/createprofile/`,{config}).then((res)=>{
            if(res.data.length>0){
                setFormdata({
                    ...formdata,
                    ...res.data[0]
                })

            }
            else{
                setFormdata({
                    ...formdata,
                })
            }
        })

        if(show === true){
            console.log(id)
            axios_1.get(`http://localhost:8000/api/createprofile/`,{params:{id}}).then((res)=>{
                if(res.data.length>0){
                    setFormdata({
                        ...formdata,
                        ...res.data[0]
                    })

                }
                else{
                    setFormdata({
                        ...formdata,
                    })
                }
            })
        }

        axios.get("/contentrestriction/",{config}).then((res)=>{
            var data=[]
            res.data.map((res)=>{
                data.push({subject: res.subject, id: res.id})
            })
            setSubject(data)
        })
    },[id,isAuthenticated])
  
     
     
    const logout_user = () => {
        logout();
        setRedirect(true);
    };

    const authLinks = () => (

        <button className = "w-40 bg-green-800 transition duration-200 rounded-sm hover:bg-green-700 p-1 mr-2 font-text font-meduim"
        onClick = { logout_user } > Logout </button>

    );
const [num ,setnum]=useState(-1)
    useEffect(()=>{
        if(fun){
    fun(num)
        }
},[num,fun])
    return (

      
        <div className = {`banner ${ succ && 'size'} bg-purple-800`} >
           
         
            <div className = "prof_details">
                <p className = "a prof_name font-text text-3xl font-medium" > {formdata.name} </p> 
                <p className = "a prof_title font-text text-4xl mb-2 mt-3 font-medium" > {formdata.position} </p> 
                <p className = "a college font-text text-3xl font-medium" > {formdata.college} </p> 
            </div>
           
      
       { (!show)?<div className = "subjects_det">
            <p onClick={()=>{
                   setnum(-1)
                }} className = "subject font-text font-meduim"> ALL </p> 

                {subjects.map((subject,index)=>(
                    <div key={index} onClick={()=>{setSubjectid(subject.id)}}>
                        <Para subject={subject.subject} id={subject.id} />  
                    </div>
           ))}
        </div>:null
    }
         { (!show)?
            <div className = "link pt-2" >

                <Link to = "/upload/addnew" >
                    <button className="w-40 bg-green-800 transition duration-200 rounded-sm hover:bg-green-700 p-1 mr-2 font-text font-meduim" > 
                        Add new subject </button> 
                </Link> 

                <Link to = {`/upload/editbanner/${num}`} >
                <button className = "w-40 bg-green-800 transition duration-200 rounded-sm hover:bg-green-700 p-1 mr-2 font-text font-meduim" > Customize </button> 
                </Link>

                <Link to = "/upload/newtopic" >
                    <button className = "w-40 bg-green-800 mt-3 transition duration-200 rounded-sm hover:bg-green-700 p-1 mr-2 font-text font-meduim" > Add new topic </button>
                </Link>
        
             {
            isAuthenticated ? authLinks() : < > </>
            } 
            </div>:
            <></>
        } 
            {
            redirect ? <Redirect to = '/' /> : < > </>
            }
         
            </div>  
           
              )
       
    }

    const mapStateToProps = (state)=>({
        isAuthenticated:state.auth.isAuthenticated
    })
    export default connect(mapStateToProps, { logout })(Banner)
