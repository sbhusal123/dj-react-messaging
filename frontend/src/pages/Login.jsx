import React, { useState } from "react";

import {useNavigate} from 'react-router-dom'
import AuthService from "../services/authService";
import Storage from "../services/localStorage";
import useTokenCheck from "../hooks/useTokenCheck";

import useToast from "../hooks/useToast";


const Login = () => {

  const navigate = useNavigate()

  const {toastError, toastInfo} = useToast()

  useTokenCheck()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)

  const handleClick = () => {
      AuthService.authLogin(username, password).then(resp => {
          if(resp.status === 200){
              const data = resp.data
              if(remember){
                  Storage.storeTokens(data)
              } else {
                  delete data.refresh
                  Storage.storeTokens(data)
              }
              toastInfo("Logged In")
              navigate('/chat')
          }
      }).catch(err => {
          if(err.status === 401){
              toastError("Invalid Credentials")
          } else {
              toastError("Something went wrong")
          }
      })
  }

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
            <input className="mr-1" type="checkbox" onChange={(e) => {
              setRemember(e.target.checked)
            }}/>
            <span className="">Remember Me</span>
          </label>
        </div>
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
            onClick={() => handleClick()}
          >
            Login
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don&apos;t have an account?{" "}
          <p
            className="text-red-600 hover:underline hover:underline-offset-4 inline"
            onClick={() => {
              navigate('/register')
            }}
          >
            Register
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;