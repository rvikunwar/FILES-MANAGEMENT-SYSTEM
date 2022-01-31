import React,{useEffect,useState} from 'react'
import "./css/upload.css"
import Navbar from './Navbar.js'
import Banner from './Banner.js'
import Summary from './Summary.js'
import UploadedContent from './UploadedContent.js'
import {
   Switch,
    Route,
   
} from "react-router-dom";
import Addnew from "./Addnew.js"
import Edit from './Edit.js'
import Newlect from './Newlect.js'
import EditBanner from './EditBanner.js'
import axios from '../axios'
import 'react-toastify/dist/ReactToastify.css';


function Upload(props) {
   

    const [data_2,setdata_2]=useState([{"name":"","positon":"","college":""}])

        useEffect(()=>{
                    const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Accept': 'application/json'
                        }
                                    }
            
                    axios.get("/profile/",config).then((res)=>{
                        console.log(res,"fafa")
                            setdata_2([res.data])
                            })

                
                       
                        },[])



    const [data_3,setdata_3]=useState([])

    useEffect(()=>{
      
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            }
        
            axios.get("/contentrestriction/",config).then((res_1)=>{
                        setdata_3(res_1.data)
            })

            return () => {
            }

},[])



const [sub, setsub]=useState([])
useEffect(()=>{
     var subb=[]
     data_3.map((d)=>{
         subb.push({"subject":d["subject"],"id":d["id"]})
         return 0
     })
     setsub(subb)

     return () => {
    }
},[data_3])



const [subjectt,setsubjectt]=useState([])
useEffect(()=>{
 
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }
    
        axios.get("/subjectdet/",config).then((res_1)=>{
                    setsubjectt(res_1.data)
                  
        })
          
        return () => {
        }

},[])

const [d,setdt]=useState(-1)
function dt(p){
    setdt(p)
}



const [file,setfile]=useState([{"file":"null"}])
useEffect(()=>{

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }
    axios.get("/file/",config).then((res_1)=>{
        if (res_1.data){
                setfile(res_1.data)
        }
         
    })
      
    return () => {
    }

},[])


const [chapter,setchapter]=useState([])
const [ifr,setifr]=useState([])
const [sc,setsc]=useState([])

useEffect(()=>{
    var b=[]
    var c=[]
    var e=[]
        subjectt.map((de)=>{
  
            b.push(de.chapter)
           
            e.push(de.content_details)
            if (d===de.content_details){
                c.push(de.id)
            }
            else if(d===-1){
                c.push(de.id)
            }
            return 0
        })
setchapter(b.reverse())
setifr(c.reverse())
setsc(e.reverse())
},[subjectt,d])

    const [ content, setContent]= useState([])
    const [subjectid ,setSubject]= useState()

    useEffect(()=>{
        axios.get("http://localhost:8000/api/subjectdet/",{
            params:{'subject': String(subjectid)}
        }).then((res)=> {
            setContent(res.data)
        })

    },[subjectid])


    return (
        <div className = "upload" >
        <Navbar/>
       


        <Switch>
            <Route exact path = "/upload">
            <Banner profo={data_2} sub={sub} fun ={dt} setSubjectid={setSubject}/>
                <div className = "uploaded_content">
                    <Summary chap={chapter} di={ifr} fc_1={d} sc={sc} subdata={content} show={true}/>
                    <UploadedContent fc={d} subject={subjectt} files={file} subjectid ={subjectid }/>
                </div> 
            
            </Route>

        <Route path = "/upload/editbanner/:numm" >
                    <EditBanner fc_1={d} proid={data_2[0].user} profo_1={data_2} />
            
        </Route >



        <Route path = "/upload/addnew/">
        <Banner profo={data_2} sub={sub} fun ={dt}/>
            <div className = "uploaded_content">
                <Addnew />
            </div>  
        </Route>



        <Route path = "/upload/edit/:num_1/" >
        <Banner profo={data_2} sub={sub} fun ={dt}/>
            <div className = "uploaded_content" >
            <Edit ff={d}/>
            </div> 
        </Route >



        <Route path = "/upload/newtopic" >
        <Banner profo={data_2} sub={sub} fun ={dt}/>
            <div className = "uploaded_content" >
                <Newlect fc={d} />
            </div>  
        </Route >


        </Switch> 
        </div >

    )
}

export default Upload