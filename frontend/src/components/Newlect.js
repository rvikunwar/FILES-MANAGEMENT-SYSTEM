import React, { useState } from 'react'
import './css/newlect.css'
import axios from "../axios"
import TextField from '@material-ui/core/TextField';
import {  toast } from 'react-toastify';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';


function Newlect(props) {
    const history= useHistory()
    const [ formdata, setFormdata ] = useState({"content_details":localStorage.getItem('subject'), description:"", chapter:""})

    const saveFormHandler = () => {
        axios.post("/subjectdet/",formdata).then(()=> {
            toast.success('Data saved successfully')
            history.push("/upload")
        })
        .catch((err)=>{
            toast.error('Something went wrong , retry')
        })
    }
   
    return (
        <div className="newlect" id="newlect">

            <div className="form-style-9 p-16">
                        <ul>
                      
                        <li>
                        <TextField id="bt"
                            className="w-full"
                            name = "chapter"
                            label="Chapter/topic"
                            variant="outlined"   
                            onChange={(e)=>{
                                setFormdata({
                                    ...formdata,
                                    [e.target.name]: e.target.value
                                })
                            }}
                            />
             
                        </li>
                        <li>
                        <TextField id="bt"
                            className="w-full"
                            name = "description"
                            multiline
                            rows={4}
                            label="Description . . ."
                            variant="outlined"   
                            onChange={(e)=>{
                                setFormdata({
                                    ...formdata,
                                    [e.target.name]: e.target.value
                                })
                            }}
                            />
                        </li>
                        
                       
                        <li>
                        <div className="mt-6">
                            <Button variant="contained" 
                            className="w-32 h-10"
                                color="primary"
                                onClick={()=>{
                                    saveFormHandler()
                                }}>
                                Save 
                            </Button>
                        </div>

                        </li>
                        </ul>
              </div>
            
        </div>
    )
}

export default Newlect
