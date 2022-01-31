import React,{ useState, useEffect } from 'react'
import './css/lecture.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {  
    Link
  } from "react-router-dom";
import axios from '../axios'
import axios1 from 'axios'

import fileDownload from 'js-file-download'
import path from "path"
import LinearProgress from '@material-ui/core/LinearProgress';

function Lecture({chapter,file_id,description, id, date}) {

    const [loadingPercent, setLoadingPercent] = useState(0)
    const [con,setcon]=useState(false)
    const [fff,setfile]=useState()
    const [idd,]=useState(id)

    const [ file ,setFile ] =useState([])

    useEffect(()=>{
        axios.get("/file/",{
            params: {'subject_content': id},
          }).then((res)=> {
              setFile(res.data)
              console.log(res.data)
          }).catch((err)=>{
              console.log(err,"error")
          })
    },[])
const submmit =()=>{
    const dataform =new FormData();

    if(fff){
        dataform.append("files",fff,fff.name)
        dataform.append("subject_content",idd)

        const options={
            onUploadProgress:(progressEvent)=>{
                const {loaded,total}=progressEvent;
                let percent = Math.floor(loaded*100 /total)
                setLoadingPercent(percent);
               
               
               
            }
          
        };
     axios1.post("http://127.0.0.1:8000/api/file/",dataform,options)
    .then(()=>{

        setTimeout(()=>{
           setLoadingPercent(0)
           setcon(false)
          if( window.confirm("make a refresh for checking file")){
              window.location.href="/upload"
          }
        },1300)
        document.querySelector(".success").style.display="block";
      
       
    })
    .catch((err)=>{
        window.alert("Some error occured", err.message)
    })

}
}


const onDelete = (id) => {
    if(window.confirm("Are you sure to delete")){
        axios.delete(`/subjectdet/${id}/`).then(()=>{
            window.location.href = "/upload"
        })
        
        .catch(()=>{
            window.confirm("Some error occured")
        })
        
    };
    return 0
}


    return (
       
        <div className="lecture" id={`${chapter}`}>
            <p className="heading font-header p-2">{chapter}</p>
            <p className="descp font-text-1 font-semibold text-md mt-2 mb-4 p-2">{description}</p>
                {
                    file.map((a,c)=>(
                <div key={c} className="file_data_2">
                    
                        <div className="p0" >
                            <p className="font-text-1 font-semibold flex justify-start items-center">{ path.basename(a.files).substring(0,40)}</p>
                            <div>
                            <button className="bg-blue-800 text-white w-32 rounded-md" onClick={()=>{
                             if(window.confirm("Are you sure to delete")){
                             axios.delete(`/file/${file_id[file.indexOf(a)]}/`)
                             .then(()=>{
                                 setTimeout(()=>{
                                    window.location.href = "/upload"
                                 },500)
                                
                            })
                             .catch((err)=>{
                                window.alert("Some error occured ",err.message)
                             })
                            
                            }
                           

                        }} >Delete</button>
                         <button className="bg-blue-800 text-white w-32 rounded-md mx-2" onClick={()=>{
                            
                            axios.get(`http://127.0.0.1:8000${a.files}`, {
                                responseType: 'blob',
                              })
                            .then((res)=>{
                                fileDownload(res.data,a.files)
                            })
                            .catch((err)=>console.log(err)) }}>Download</button>
                            </div>
                            </div>
                 
                   
                </div>
                   ))
                    
               }
   
                {(con)?
                 <div className="oneline">
                 <input type="file" id="filee" name="file_1" className="file_1" onChange={(e)=>setfile(e.target.files[0])}/>
                <button  className="file_9" onClick={submmit}>SUBMIT</button>

              
             {(loadingPercent>0)?<LinearProgress variant="determinate" value={loadingPercent} />:<></>}
             <p className="success" style={{"color":"green","display":"none","marginLeft":"10px"}}>File Uploaded successfully</p>
           

           </div>:<></>

                }
                             
                
                <div className="flex justify-between px-2 my-2 items-center">
                    <p className="font-text-1 font-semibold">uploaded on {date}</p>
                    <div className="icons">
                        <Link to={`/upload/edit/${id}/`}>
                             <EditIcon />
                        </Link>
                        <DeleteIcon style={{cursor:"pointer"}} onClick={()=>onDelete(id)}/>
                        <button className="bg-blue-800 text-white w-24  rounded-md mx-2" onClick={()=>{
                            setcon(!con)
                        }}>new file</button>
                        </div>
                </div>
        </div>
    
    )
}

export default Lecture
