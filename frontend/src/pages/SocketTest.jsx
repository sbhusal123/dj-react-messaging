import { useEffect } from "react"
import useTokenRefresh from "../hooks/useTokenRefresh"

import {useNavigate} from 'react-router-dom'


const SOCKET_BASE_PATH = "ws://localhost:8000/ws/chat/"

export default function SocketTest(){

    const {accessToken, handleTokenCheck, isLoading : isTokenBeingChecked} = useTokenRefresh()

    const redirect = useNavigate()

    const handleSuccess = (event) => {
        console.log(event)
    }

    const handleMessageRecieve = (event) => {
        console.log(event)
    }
 
    useEffect(() => {
        handleTokenCheck()
    }, [])

    useEffect(() => {
        if(isTokenBeingChecked){
            return
        }

        if(!accessToken){
            redirect('/')
            return
        }

        const socket = new ReconnectingWebSocket(SOCKET_BASE_PATH+`?token=${accessToken}`)
        socket.addEventListener('open', handleSuccess)
        socket.addEventListener('message', handleMessageRecieve)

        return () => {
            socket.removeEventListener('open', handleSuccess)
            socket.removeEventListener('message', handleMessageRecieve)
            socket.close()
        }
        
    }, [accessToken, isTokenBeingChecked])
    

    return (
        <div className="p-10 bg-red-300 flex flex-row gap-10">
            <button
                className="bg-green-400 px-5 py-2 rounded-lg"
                onClick={() => handleTokenCheck()}
            >
                Click Me
            </button>

            <button
                className="bg-green-400 px-5 py-2 rounded-lg"
                onClick={() => sendMessage()}
            >
                Click Me
            </button>            
        </div>
    )
}