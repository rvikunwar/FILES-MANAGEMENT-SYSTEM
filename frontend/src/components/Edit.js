import React ,{ useEffect,useState} from 'react'
import "./css/edit.css"
import axios from '../axios'
import {
    useParams
   } from "react-router-dom";
import path from "path"

function Edit(props) {
    let num_1= useParams();
    var g= num_1
    const [ed,seted]=useState({"chapter":"","description":""})

  
    useEffect(()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        axios.get(`/subjectdet/${g.num_1}/`, config)
        .then((res)=>{
           seted(res.data)
        })
           
    },[g.num_1])


const [ff_1,setff_1]=useState()
const [ddd,setddd]=useState([])
    useEffect(()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        axios.get(`/file/`, config)
        .then((res)=>{
           setff_1(res.data)
        })
       var ed_1=[ed]
        if(ff_1){
           var g=[]
            ed_1.map((q)=>{

                ff_1.map((e)=>{
                    if (e["subject_content"]===q.id){
                           g.push(e)
                        
                    }
                    return 0
                                    })

                            return 0
            })
            setddd(g)
        }
           
    },[ed,ff_1])

    return (
        <div className="edit">

                <div className="form-style-9">
                        <ul>
                      
                        <li>
                            <input defaultValue={ed.chapter} id="chh" type="text" 
                            name="field3" className="field-style field-full align-none"
                            placeholder="CHAPTER/TOPIC" />
                        </li>
                        <li>
                             <textarea  defaultValue={ed.description} 
                             id="dds" name="field5" 
                             className="field-style" 
                             placeholder="DESCRIPTION . . ."></textarea>
                        </li>
                      
                        <li className="file_data_1">
                         {   ddd.map((a,c)=>(
                          <div key={c}><p>{path.basename(a["files"])}</p>
                          <button onClick={()=>{
                             
                              axios.delete(`/file/${a["id"]}/`)
                              
                             
                              .catch((err)=>window.alert("Some error occured ",err.message))
                         }} >Delete</button>
                        
                          </div>

                            ))
                                
                         }
                        </li>
                        <li>
                        <a href="/upload">
                        <input type="submit"  defaultValue="SAVE " onClick={()=>{
               
               var body_3={
                   "chapter":document.querySelector("#chh").value,
                   "description":document.querySelector("#dds").value,
                   "content_details":props.ff
                  
               }
               const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };
       console.log(body_3)
   
               axios.put(`subjectdet/${g.num_1}/`,JSON.stringify(body_3),config)
               .then((res)=> console.log(res.data))
                  
   
               } }/>
               </a>
                        </li>
                        </ul>
              </div>
            
        </div>
    )
}

export default Edit
