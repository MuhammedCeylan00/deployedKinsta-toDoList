import TickIcon from "../components/TickIcon"
import ProgressBar from "../components/ProgressBar"
import Modal from "../components/Modal"
import { useState } from "react";
const ListItem = ({ task,getData }) => {
    const [showModel,setShowModel]=useState(false);

    const deleteItem=async ()=>{
        try {
            const response= await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,{
                method:"DELETE"
            })
            if(response.status === 200){
                getData();
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <li className="list-item">
            <div className="info-container">
                <TickIcon />
                <p className="task-title">{task.title}</p>
                <ProgressBar progress={task.progress}/>
            </div>
            <div className="button-container">
                <button className="edit" onClick={()=>setShowModel(true)}>EDIT</button>
                <button className="delete" onClick={deleteItem}>DELETE</button>
            </div>
            {showModel && <Modal mode={"edit"} setshowModal={setShowModel} task={task} getData={getData}/>}
        </li>
    );
}

export default ListItem