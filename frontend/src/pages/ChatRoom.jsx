import { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Storage from '../services/Storage'
import useToast from "../hooks/useToast";
import AuthService from "../services/authService";
import ChatService from "../services/chatService";



const WS_URL = "ws://localhost:8000/ws/chat/"

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const messagesEndRef = useRef(null);

  const username = Storage.getUsername()

  const [searchTerm, setSearchTerm] = useState("");

  const { toastInfo, toastError } = useToast()

  const [accessToken, setAccessToken] = useState(() => {
    return Storage.getAccessToken()
  })

  const [refreshToken, setRefreshToken] = useState(() => {
      return Storage.getRefreshToken()
  })

  const loadMessages = async () => {
    if(accessToken === undefined){
      return
    }
    try {
        const messageResponse = await ChatService.retrieveMessages()
        setMessages(messageResponse.data)
    } catch(err) {
        if(err.status === 401){
          try {
              const token = await AuthService.refreshToken(refreshToken)
              const newAccessToken = token.data.refresh
              Storage.updateAccessToken(newAccessToken)
              setAccessToken(accessToken)
              await loadMessages()
          } catch (err1){
              console.log("Session expired")
              Storage.removeTokenData()
              toastError("Session Expired")
              navigate('/')
          }
        }
        Storage.removeTokenData()
        console.log("Session expired")
        toastError("Session Expired")
        navigate('/')
    }
  }

  const handleSocketRecieve = (event) => {
    const incoming = JSON.parse(event.data);
    const eventType = incoming?.type;
    const eventData = incoming?.data;
    if(eventType === "user_connect") {
        console.log("user connect event",eventData)
        if(username !== eventData.username){
          toastInfo(`User ${eventData.username} online.`)
        }
    } else if(eventType === "user_disconnect") {
      console.log("user disconnect event::", eventData)
        toastError(`User ${eventData.username} offline.`)
    } else if(eventType === "chat_message") {
      console.log("incoming message event::", eventData)
      setMessages((messages) => {
        return [...messages, eventData]
      })
    }
  }

  // scroll to bottom of message content window
  useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages])

  const handleSocketClose = (event) => {
    console.log("websocket close::",event)
  }

  const handleSocketOpen = (event) => {
    console.log("websocket open::",event)
  }

  const handleSocketError = (event) => {
    console.log("websocket error::",event)
  }

  useEffect(() => {
    if(accessToken === undefined){
      return
    }
    const socket = new ReconnectingWebSocket(WS_URL + `?token=${accessToken}`)

    socket.addEventListener('open', handleSocketOpen)
    socket.addEventListener('message', handleSocketRecieve)
    socket.addEventListener('close', handleSocketClose)
    socket.addEventListener('error', handleSocketError)
    loadMessages().then(() => {})

    return () => {
      socket.removeEventListener('open', handleSocketOpen)
      socket.removeEventListener('message', handleSocketRecieve)
      socket.removeEventListener('close', handleSocketClose)
      socket.removeEventListener('error', handleSocketError)
      socket.close()
    }
  }, [])

  const navigate = useNavigate()

  const handleSendMessage = async () => {
    if(newMessage.replace(/ /g,'') === ""){
        toastError("Message cant be blank..")
        return
    }
    try {
        await ChatService.sendMessage(newMessage)
    } catch(err) {
        console.log("Error sending message:::", err)
        if(err.status === 401){
          try {
              const token = await AuthService.refreshToken(refreshToken)
              const newAccessToken = token.data.access
              console.log("Got a new refresh Token:::", token)
              Storage.updateAccessToken(newAccessToken)
              setAccessToken(accessToken)

              await ChatService.sendMessage(newMessage)

              console.log("New message retrieved successfully")
          } catch (err1){
              console.log("Error getting refresh token::", err1)
              Storage.removeTokenData()
              toastError("Session Expired")
              navigate('/')
          }
        } else {
          Storage.removeTokenData()
          toastError("Something went wrong..")
          navigate('/')
        }
    }
    setNewMessage("")
  };

  useEffect(() => {
    const filteredMsg = messages.filter(message => {
      return message.message.toLowerCase().includes(searchTerm.toLowerCase())
    });
    setFilteredMessages(filteredMsg)
  }, [searchTerm])


  const handleLogOUt = () => {
    const refreshToken = Storage.getRefreshToken()
    AuthService.authLogout(refreshToken).then((response) => {
      if(response.status === 200){
        toastInfo("Logged Out.")
        navigate('/')
        Storage.removeTokenData()
      }
    }).catch(e => {
      navigate('/')
      Storage.removeTokenData()
      toastError("Something went wrong.")
    })

  }

  return (
    <div className="flex flex-col h-screen p-6 bg-gray-100">
      <div className="flex-0.2 bg-white px-5 flex items-center">
        <div className="relative w-full">
          <div className="flex sm:flex-row w-full">
            <div className="flex-0.8 w-4/5">
              <input 
                type="text" 
                className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Search messages..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            <div className="ml-10">
              <button
                className="bg-blue-400 px-5 py-2 text-white rounded-md hover:bg-white hover:text-blue-400 hover:border-blue-400"
                onClick={handleLogOUt}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-0.9 overflow-y-auto bg-white p-4 rounded-lg shadow-md h-screen">
        {searchTerm !== ""  ? filteredMessages.map((message) => (
          <div key={message.id} className="mb-4 p-2 border-b-2 border-b-slate-300">
            <div className="text-sm text-gray-600">{message.user.username} - {new Date(message.timestamp).toDateString()}</div>
            <div className="bg-blue-500 text-white p-2 rounded-lg inline-block">
              {message.message}
            </div>
          </div>
        )) : messages.map((message) => (
          <div key={message.id} className="mb-4 p-2 border-b-2 border-b-slate-300">
            <div className="text-sm text-gray-600">{message.user.username} - {new Date(message.timestamp).toDateString()}</div>
            <div className="bg-blue-500 text-white p-2 rounded-lg inline-block">
              {message.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4">
        <input
          type="text" 
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Type a message..." 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button 
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
