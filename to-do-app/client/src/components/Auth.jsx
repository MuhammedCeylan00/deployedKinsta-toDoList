import { useState } from "react";
import {useCookies} from "react-cookie"
const Auth=()=>{
    const [cookies,setCookie,removeCookie]=useCookies(null);
    const [isLogin,setIsLogin] = useState(true);
    const [error,setError] = useState(null);
    const [email,setEmail]=useState(null);
    const [password,setPassword]=useState(null);
    const [confirmPassword,setConfirmPassword]=useState(null);

    console.log(email,password,confirmPassword)
    console.log("cookie: ",cookies);

    const viewLogin = (status) =>{
        setError(null);
        setIsLogin(status);
    }

    const handleSubmit = async(e,endPoint)=>{
        e.preventDefault();
        if(!isLogin && password!==confirmPassword){
            setError('Make Sure Password match!')
            return
        }

        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endPoint}`,{
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({email,password})
        })

        const data =await response.json();
        console.log("data>>>>: ",data);
        if(data.detail){
            console.log("hata oluştu");
            setError(data.detail)
        }else{
            setCookie('Email', data.email);
            setCookie('AuthToken',data.token)

            window.location.reload();
        }
    }

    return(
        <div className="auth-container">
            <div className="auth-container-box">
                <form>
                    <h2>{isLogin ? 'please login' : 'Please sign up!'}</h2>
                    <input 
                    type="email" 
                    placeholder="Email" 
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                    <input 
                    type="password" 
                    placeholder="password"
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                    {!isLogin &&
                    <input 
                    type="password" 
                    placeholder="confirm password"
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    />}
                    <input type="submit" className="create" onClick={(e)=> handleSubmit(e,isLogin ? 'login' : 'signup')}/>
                   {error && <p>{error}</p> }
                </form>
                <div className="auth-options">
                    <button onClick={()=> viewLogin(false)}
                    style={{backgroundColor : !isLogin ? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}
                    >Sign Up</button>
                    <button onClick={()=> viewLogin(true)}
                    style={{backgroundColor : isLogin ? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}
                    >Login</button>
                </div>
            </div>
        </div>
    );
}

export default Auth