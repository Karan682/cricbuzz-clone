import React from 'react'
import Layouts from '../../components/Layouts/layout';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../style/Authstyle.css";


const Register = () => {

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [phone,setPhone] = useState("")
    const [address,setAddress] = useState("")
    const [answer,setAnswer] = useState("")
    const Navigate = useNavigate()

//form function
const handleSubmit = async (e) =>{
  e.preventDefault();
  try{
    const res = await axios.post('/api/v1/auth/register',{name,email,password,phone,address,answer});
    if(res && res.data.success){
      toast.success(res.data.message)
      Navigate("/login");
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
        <h1 className='title'>Register</h1>
          <div className="form-group">
            <label >Name</label>
            <input
              type="text"
              value={name}
              onChange ={(e) => setName(e.target.value)}
              className="form-control" 
              placeholder="Enter Name"
              required
            />
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
          <label >Phone</label>
            <input
              type="number"
              value={phone}
              onChange ={(e) => setPhone(e.target.value)}
              className="form-control" 
              placeholder="Enter Phone"
              required
            />
             <label >Address</label>
            <input
              type="text"
              value={address}
              onChange ={(e) => setAddress(e.target.value)}
              className="form-control" 
              placeholder="Enter Address"
              required
            />
            <label >Answer</label>
            <input
              type="text"
              value={answer}
              onChange ={(e) => setAnswer(e.target.value)}
              className="form-control" 
              placeholder="What Is Your Favorite Sports?"
              required
            />
            <br/>
            
          <button type="submit" className="btn btn-success">
            Register
          </button>
        </form>
      </div>
    </Layouts>
  );
}

export default Register