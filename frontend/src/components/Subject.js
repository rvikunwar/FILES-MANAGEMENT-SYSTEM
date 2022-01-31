import React,{useEffect,useState} from 'react'
import './css/subject.css'
import Content from "./Content.js"
import Navbar from './Navbar.js'
import Banner from './Banner.js'
import Summary from './Summary.js'
import {
   useParams,
  } from "react-router-dom";
import axios from 'axios'

function Subject() {
    let { batch,semester,course,subject } = useParams();
    var body={
        "batch":batch,
        "semester":semester,
        "course":course,
        "subject":subject
    }
  
    const [ content, setContent]= useState([])

    useEffect(()=>{
        axios.get("http://localhost:8000/api/subjectdetails/",{
            params:body
        }).then((res)=> {
            setContent(res.data)
            console.log(res.data,"sis")
        })

     

    },[])


    return (
        <div className="subjects">
            <Navbar/>
            <Banner show={true} id={content[0]?.user}/>
                <div className="sub_cont">
                <Summary subdata={content} show={true}/>
                <Content subdata={content}/>
                </div>
            
        </div>
    )
}

export default Subject
