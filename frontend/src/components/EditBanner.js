import React ,{useEffect,useState} from 'react'
import "./css/editbanner.css"
import {
    useParams,
    useHistory
   } from "react-router-dom";
import axios from "../axios"


function EditBanner(props) {

    const history = useHistory()
    let numm= useParams();

    const [st,setpro]=useState({"subeject":"","semester":"","course":"","batch":""})


    const [ formdata, setFormdata ] =useState({id:"", name:"", position:"", college:""})

    useEffect(()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }

        axios.get(`/createprofile/`,{config}).then((res)=>{
            console.log(res.data[0])
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
    },[])

    const saveFormHandler = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }

        if(formdata.id === ""){
            axios.post(`/createprofile/`, formdata ,{config}).then((res)=>{
                setFormdata({
                    ...formdata,
                    ...res
                })
                history.push('/upload')
            })
        } else {
            axios.put(`/createprofile/${formdata.id}/`, formdata ,{config}).then((res)=>{
                setFormdata({
                    ...formdata,
                    ...res
                })
                history.push('/upload')

            })
        }

    }

    // useEffect(()=>{
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `JWT ${localStorage.getItem('access')}`,
    //             'Accept': 'application/json'
    //         }
    //     }
    
    //     axios.get(`/contentrestriction/${numm.numm}`,config).then((res_1)=>{
    //                 setpro(res_1.data)
    //     })
    // },[numm.numm])

    return (
      
        <div className="editbanner">
              <div className="banner_1">
                    <div className="prof_details_1">

                        <input value={formdata.name}
                                name="name"
                                onChange={(e)=>{
                                    setFormdata({
                                        ...formdata,
                                        [e.target.name]: e.target.value
                                    })
                                }} 
                                placeholder="Enter your name" id="nnn" 
                                className="a_1 prof_name_1 
                                h-10 pl-4 font-text text-xl font-medium"/>

                        <input value={formdata.position} 
                                name="position"
                                onChange={(e)=>{
                                    setFormdata({
                                        ...formdata,
                                        [e.target.name]: e.target.value
                                    })
                                }} 
                                id="ppp" placeholder="Position" className="a_1 prof_title_1
                                    h-14 pl-4 font-text text-2xl font-medium"/>

                        <input value={formdata.college}  
                                name="college"
                                onChange={(e)=>{
                                    setFormdata({
                                        ...formdata,
                                        [e.target.name]: e.target.value
                                    })
                                }}                        
                                id="cco" placeholder="College" 
                                className="a_1 college_1 text-lg
                                h-10 pl-4 font-text font-medium" />

                    </div>

                    {(numm.numm !=-1)? 
            <div  className="subjects_det_1">
                  <div className="po">
                        <input type="text" defaultValue={st.subject} id="suv" className="subject_1"/>  

                        <div className="batchdata">
                            <input defaultValue={st.batch} id="btch" type="text" className="s_1" />   
                            <input defaultValue={st.semester} id="ss" type="text" className="s_1" /> 
                            <input defaultValue={st.course} id="cc" type="text" className="s_1" /> 
                        </div>
                     
                             <button className="add_new_2" onClick={()=>{
                                 if(window.confirm("Are you sure you want to delete")){
                                  axios.delete(`/contentrestriction/${numm.numm}`)
                                  .then(()=>{
                                      history.push('/upload')
                                  })
                              
                                  .catch((err)=>window.alert("Some error occured",err))
                                }
                             }}>DELETE THE SUBJECT</button>
               
                     </div>
                    
            </div>: <></>
                    
               
                }

            <div className="link_1">
                <button onClick={saveFormHandler} className="add_new_1">SAVE</button>
                
                    {/* <button onClick={()=>{
                             const config = {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                                    'Accept': 'application/json'
                                }
                            }; 
               var body={
                   "batch":document.querySelector("#btch").value,
                   
                   "course":document.querySelector("#cc").value,
                   "semester":document.querySelector("#ss").value,
                   "subject":document.querySelector("#suv").value,
                   "user":props.proid
                }
                var body_1={
                    "name":document.querySelector("#nnn").value,
                    "position":document.querySelector("#ppp").value,
                    "college":document.querySelector("#cco").value,
                 }
                    axios.put(`/profile/${props.proid}`,JSON.stringify(body_1),config).then((res)=> {
                        history.push("/upload")
                    })

                    axios.put(`/contentrestriction/${numm.numm}`,JSON.stringify(body),config).then((res)=> {
                        history.push("/upload")
                    })
              
                  
   
               }

                        } className="add_new_1">SAVE DATA</button> */}
             
                
                </div>
            </div>
        </div>
   
    )
}

export default EditBanner
