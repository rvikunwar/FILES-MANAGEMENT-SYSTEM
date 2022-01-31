import React,{useState,useEffect} from 'react'
import "./css/form.css"
import MenuItem from '@material-ui/core/MenuItem';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import axios from 'axios' 
import {  toast } from 'react-toastify';
import { useHistory } from 'react-router';


function Form() {

    const [batchData,setBatchData]=useState([])
    const [change,setchange]=useState(1)
    const history = useHistory()
    const [ senddata, setSendData ] = useState({batch: "", course: "", semester: "", subject:""})

    const [formdata, setFormdata ] = useState({batch:[], course: [], semester: [], subject: []})
  
    useEffect(()=>{
        axios.get("http://localhost:8000/api/batchdetails/").then((res)=> {
            setFormdata(res.data)
        })
    },[])

    const saveFormhandler = () => {
        toast.success('Check your content')
        history.push(`/subject/${senddata.batch}/${senddata.semester}/${senddata.course}/${senddata.subject}/`)
    }


    return (
        <div className="forsm  mt-16 px-64 mb-8">
            <p className="di">Content management system</p>
            <p className="font-text font-large mb-4">Check your study materials</p>
            <div className=" flex flex-col">
                <div className=" flex justify-between mb-3">

                <TextField
                    id="outlined-select-currency"
                    select
                    className="w-45"
                    label="Batch"
                    name="batch"
                    value={senddata.batch}
                    onChange={(e)=>{
                        setSendData({
                            ...senddata,
                            [e.target.name]: e.target.value
                        })
                    }}
                    helperText="Select your batch"
                    variant="outlined"
                    >
                    {formdata.batch.map((option) => (
                        <MenuItem key={option.batch} value={option.batch}>
                            {option.batch}
                        </MenuItem>
                    ))}
                    </TextField>


                    
                <TextField
                    id="outlined-select-currency"
                    select
                    className="w-45"
                    label="Course"
                    name="course"
                    value={senddata.course}
                    onChange={(e)=>{
                        setSendData({
                            ...senddata,
                            [e.target.name]: e.target.value
                        })
                    }}
                    helperText="Select your course"
                    variant="outlined"
                    >
                    {formdata.course.map((option) => (
                        <MenuItem key={option.course} value={option.course}>
                        {option.course}
                        </MenuItem>
                    ))}
                    </TextField>
 
                </div>
               
                <div className=" flex justify-between">

                <TextField
                    id="outlined-select-currency"
                    select
                    className="w-45"
                    name="semester"
                    label="Semester"
                    value={senddata.semester}
                    onChange={(e)=>{
                        setSendData({
                            ...senddata,
                            [e.target.name]: e.target.value
                        })
                    }}
                    helperText="Select your semester"
                    variant="outlined"
                    >
                    {formdata.semester.map((option) => (
                        <MenuItem key={option.semester} value={option.semester}>
                        {option.semester}
                        </MenuItem>
                    ))}
                    </TextField>
 
                    
                <TextField
                    id="outlined-select-currency"
                    select
                    className="w-45"
                    label="Subject"
                    name="subject"
                    value={senddata.subject}
                    onChange={(e)=>{
                        setSendData({
                            ...senddata,
                            [e.target.name]: e.target.value
                        })
                    }}
                    helperText="Select your subject"
                    variant="outlined"
                    >
                    {formdata.subject.map((option) => (
                        <MenuItem key={option.subject} value={option.subject}>
                        {option.subject}
                        </MenuItem>
                    ))}
                    </TextField>

                </div>
               
                </div>
            
               <div className="lp">
                        <div className="mt-0">
                            <Button variant="contained" 
                            className="w-32 h-9"
                                color="primary"
                                onClick={()=>{
                                    saveFormhandler()
                                }}>
                                Check data 
                            </Button>
                        </div>
               </div>
        
         
 
            
        </div>
    )
}

export default Form
