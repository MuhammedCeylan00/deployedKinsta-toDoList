import { useState } from "react";
import Modal from "../components/Modal";
import { useCookies } from "react-cookie";

const ListHeader=({listName,getData})=>{

  const [showModel,setShowModal]=useState(false);
    const [cookies,setCookie,removeCookie] = useCookies(null);
    const signOut=()=>{
      removeCookie('Email');
      removeCookie('AuthToken');

      window.location.reload();
    }
    console.log(showModel)

    return(
        <div className="list-header">
          <h1>{listName}</h1>   
          <div className="button-container">
            <button className="create" onClick={()=>setShowModal(true)}>ADD NEW</button>
            <button className="signout" onClick={signOut}>SIGN OUT</button>
          </div>
          {showModel && <Modal mode={"create"} setshowModal={setShowModal} getData={getData}/>}
        </div>
    );
}

export default ListHeader