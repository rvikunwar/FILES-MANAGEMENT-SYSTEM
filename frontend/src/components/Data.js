import React, { useEffect, useState } from 'react'
import './css/data.css'
import axios from 'axios'
import fileDownload from 'js-file-download'
import path from "path"

function Data(props) {

    const [ files, setFiles] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8000/api/subfiles/',{params:{id:props.id}}).then((res)=>{
            setFiles(res.data)
            console.log(res.data)
        })

    },[])


    return ( 
        <div className = "data p-4" id={`${props.title}`}>
       
        <p className = "font-header text-3xl " > { props.title } </p> 
        <p className = "font-text font-large mt-2 mb-4" > { props.description } </p> 
        {
                files.map((a,c)=>(
                <div key={c} className="file_data_22">
                    
                        <div className="p00" >
                            <p className="font-text font-large flex justify-between items-center">{ path.basename(a.files)}</p>
                             <div className="bbb_11">
                             
                         <button onClick={()=>{
                            
                            axios.get(`http://127.0.0.1:8000${a.files}`, {
                                responseType: 'blob',
                              })
                            .then((res)=>{
                                fileDownload(res.data,path.basename(a.files))
                            })
                            .catch(()=>
                            {window.alert("Retry , some error occurred")})
                        }
                        }>Download</button>
                            </div>
                            </div>
                 
                   
                </div>
                   ))
                    
                }

        <p className="font-text text-sm mt-4">Uploaded {props.date} </p>

   </div>
    )
}

export default Data