import React, { useState, useEffect } from 'react'
import "./css/uploaded_content.css"
import Lecture from './Lecture.js'
import axios from "../axios"
import TextField from '@material-ui/core/TextField';
import {  toast } from 'react-toastify';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';

function UploadedContent(props) {

    const [ data, setData ] = useState([])

    useEffect(()=>{
        axios.get("/subjectdet/",{
            params: {'subject': props.subjectid},
          }).then((res)=> {
              setData(res.data)
              console.log(res.data)
          }).catch((err)=>{
              console.log(err,"error")
          })
    },[props])

    return (
        <div className="uploaded_content_2">
           { data.map((item ,index)=>(
                    <Lecture key={index} id={item.id} 
                        date={item.date} chapter={item.chapter} 
                        // file={item.file} file_id={item.file_id} 
                        description={item.description}/>
           ))
        }
          
        </div>
    )
}

export default UploadedContent
