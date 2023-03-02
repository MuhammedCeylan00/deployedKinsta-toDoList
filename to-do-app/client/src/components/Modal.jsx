import { useState } from "react";
import { useCookies } from "react-cookie";

const Modal=({mode,setshowModal,task,getData})=>{
    const [cookies,setCookie,removeCookie] = useCookies(null);
    const editMode=mode==='edit' ? true : false

    const [data,setData]=useState({
        user_email:editMode ? task.user_email : cookies.Email,
        title:editMode ? task.title : null,
        progress:editMode ? task.progress : 50,
        date:editMode  ?  task.date : new Date()
    });

    const postData =async (e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`,{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(data)
            })
            if(response.status === 200){
                setshowModal(false);
                getData();
            }
        } catch (error) {
            console.error(error);
        }
    }

    const editDate =  async(e) =>{
        e.preventDefault();
        try {
            console.log("buraya istek geldi");
            const response= await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,{
                method:'PUT',
                headers:{ 'Content-Type' :'application/json'},
                body:JSON.stringify(data)
            })
            if(response.status ===200){
                setshowModal(false);
                getData();
            }else{
                console.log("istek başarısız");
            }
        } catch (error) {
            console.error(error);
        }
    }


    const handleChange = (e) => {
        const {name,value} = e.target;
        setData(data => ({
            ...data,
            [name]:value
        }))
        console.log(data);
    }
    return(
        <div className="overlay">
           <div className="modal">
            <div className="form-title-container">
            <h3>Let's {mode} your task.</h3>
            <button onClick={()=>setshowModal(false)}>X</button>
            </div>
            <form>
                <input
                required
                maxLength="30"
                placeholder=" your task goes here"
                name="title"
                value={data.title}
                onChange={handleChange}
                />
                <br/>
                <label for="range">Drag to select your current progress.</label>
                <input
                type="range"
                required
                id="range"
                min="0"
                max="100"
                name="progress"
                value={data.progress}
                onChange={handleChange}
                />
                <input className={mode} type="submit" onClick={editMode ? editDate:postData }/>
            </form>
           </div> 
        </div>
    );
}

export default Modal