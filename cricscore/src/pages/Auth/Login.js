import React from 'react'
import Layouts from '../../components/Layouts/layout';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import "../../style/Authstyle.css";
import { useAuth } from '../../context/auth';


const Login = () => {

    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const [auth,setAuth] = useAuth();
    const location = useLocation();

//form function
const handleSubmit = async (e) =>{
  e.preventDefault();
  try{
    const res = await axios.post('/api/v1/auth/login',{email,password});
    if(res && res.data.success){
      toast.success(res.data.message)
      setAuth({
        ...auth,
        user : res.data.user,
        token : res.data.token,
      })
      localStorage.setItem ("auth", JSON.stringify(res.data));
      navigate(location.state ||"/");
    }else{
      toast.error(res.data.message)
    }
  }catch(error){
    console.log(error)
    toast.error('something went wrong')
  }
};

  return (
    <Layouts>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h1 className='title'>Login</h1>
          <div className="form-group">
            <label >Email</label>
            <input
              type="email"
              value={email}
              onChange ={(e) => setEmail(e.target.value)}
              className="form-control" 
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group">
            <label >Password</label>
            <input
              type="password"
              value={password}
              onChange ={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
            <br/>
            <div classNmae="mb-3">
            <button type="button" className="btn btn-success" onClick={()=>{navigate('/forgot-password')}}>
            Forgot Password
          </button>
            </div>
            <br/>
          <button type="submit" className="btn btn-success">
            Login
          </button>
        </form>
      </div>
    </Layouts>
  )
}

export default Login