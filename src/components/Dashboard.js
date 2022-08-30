import React, {useState,useEffect} /*,*/from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";


const Dashboard = () => {
  const[name, setName]=useState('');
  const[token, setToken]=useState('');
  const[expire, setExpire]=useState('');
  const[users, setUsers]=useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    refreshToken();
    getUsers();
  }, []);

  const refreshToken = async()=>{
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);      
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
      //console.log(decoded);
    } catch (error) {
      if(error.response){
        navigate("/");
      }
    }
  }

  const axiosJWT=axios.create();

  axiosJWT.interceptors.request.use(async(config)=>{
    const currentDate = new Date();
    if(expire*1000<currentDate.getTime()){
      const response = await axios.get('http://localhost:5000/token');
      config.headers.Authorization=`Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    }
    return config;
  }, (error)=>{
    return Promise.reject(error);
  });

  const getUsers = async()=>{
    const response = await axiosJWT.get('http://localhost:5000/users',{
      headers:{
        Authorization: `bearer ${token}` //You should replace quotes (') to a backtick quotes (`) at your href inside <a> tag like this.
      }
    });
    //console.log(response.data);
    setUsers(response.data);
  }

  return (
    <div className="container">
      <h1 className="mt-5 has-text-right">Welcome Back: {name}</h1>
      {/*<button onClick={getUsers} className="button is-info">Get Users</button>*/}
      <p className="is-size-3">Daftar Users</p>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index)=>(
            <tr key={user.id}>
              <th className="has-text-weight-normal">{index+1}</th>
              <th className="has-text-weight-normal">{user.name}</th>
              <th className="has-text-weight-normal">{user.email}</th>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard