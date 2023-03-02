import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader"
import ListItem from "./components/ListItem"
import Auth from "./components/Auth"
import { useCookies } from "react-cookie";


const  App =()=>{
  const [cookies,setCookies,removecookies] =useCookies(null)
  console.log("authcookies: ",cookies);
  const authToken=cookies.AuthToken;
  const userEmail=cookies.Email;
  const [tasks,setTasks]=useState(null);



  const getData=async ()=>{
    try {
      const response=await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
      const json=await response.json();
      console.log(json);
      setTasks(json);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    if(authToken){
      getData()
    }}
    ,[])

  const sortedTasks=tasks?.sort((a,b)=>new Date(a.date)-new Date(b.date))
  console.log("sorted: ",sortedTasks);

  return (
    <div className="App">
      {!authToken && <Auth/>}
      {authToken && <>
     <ListHeader listName={'🌴 Holiday tick list'} getData={getData}/>
     <p className="user-email">Welcome back {userEmail}</p>
     {sortedTasks?.map((task)=><ListItem key={task.id} task={task} getData={getData}/>)}</>}
     <p className="copyright"><a href="https://www.linkedin.com/in/muhammedcyln/"> © Creative coding Muhammed CEYLAN</a></p>
    </div>
  );
}

export default App;
