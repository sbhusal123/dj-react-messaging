import { useState } from "react"
import { FaEye } from "react-icons/fa"

import { useNavigate } from 'react-router-dom'

import useToast from './../hooks/useToast'

import AuthService from '../services/authService'



export default function Register(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const {toastError, toastInfo} = useToast()
  
    const handleClick = () => {
        if(username === "" || password === "" || rePassword === ""){
            toastError("Fields cannot be empty")
            return
        } else {
            if(password !== rePassword){
                toastError("Password Doesnt Match")
                return
            } else {
                AuthService.registerUser(username, password).then((data) => {
                    toastInfo("User created")
                    navigate("/")
                }).catch((error) => {
                    if(error?.response?.data){
                        const errorKey = Object.keys(error.response.data)
                        if(errorKey.length > 0){
                            toastError(error.response.data[errorKey[0]][0])
                        } else {
                            toastError("Something went wrong.")
                        }
                    }
                })
            }
        }
    }
  
    return (
      <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:w-1/3 max-w-sm">
        <p className="text-center text-blue-500 text-xl mb-5">Register</p>

            <div className="my-4">
                <span className="text-left text-blue-400">Username</span>
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.replace(/ /g,''))}
                />
            </div>

            <div className="my-4">
                <span className="text-left text-blue-400 mb-2">Password</span>
                <div className="relative">
                    <input
                        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value.replace(/ /g,''))}
                    />
                    <span className="absolute right-2 top-3 cursor-pointer">
                    <FaEye onClick={(val) => setShowPassword(!showPassword)}/>
                    </span>
                </div>
            </div>

        <div className="my-4">
            <span className="text-left text-blue-400">Retype Password</span>
            <div className="relative">
                    <input
                        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value.replace(/ /g,''))}
                    />
                    <span className="absolute right-2 top-3 cursor-pointer">
                        <FaEye onClick={(val) => setShowPassword(!showPassword)}/>
                    </span>
                </div>
        </div>
          
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
              onClick={() => handleClick()}
            >
              Register
            </button>
          </div>

          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
              onClick={() => navigate('/')}
            >
              Back To Login
            </button>
          </div>          
        </div>
      </section>
    );
}