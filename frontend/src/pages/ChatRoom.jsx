import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Storage from '../services/Storage'
import useToast from "../hooks/useToast";
import AuthService from "../services/authService";

const WS_URL = "ws://localhost:8000/ws/chat/"

export default function Home() {
  const [messages, setMessages] = useState([
    { user: 'John', text: 'Hello!', time: '10:00 AM', id: 1 },
    { user: 'Jane', text: 'Hi John!', time: '10:01 AM', id: 2 },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('John');
  const [searchTerm, setSearchTerm] = useState('');

  const { toastInfo, toastError } = useToast()

  const [accessToken, setAccessToken] = useState(() => {
    Storage.getAccessToken()
  })

  const [refreshToken, setRefreshToken] = useState(() => {
    Storage.getRefreshToken()
  })

  useEffect(() => {
    // const socket = new ReconnectingWebSocket(WS_URL + `?token=${accessToken}`)
    const socket = new WebSocket(WS_URL + `?token=${accessToken}`)

    socket.addEventListener('open', () => {
      console.log("Connection Established")
    })
  }, [])

  const navigate = useNavigate()

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages([...messages, { user: username, text: newMessage, time }]);
      setNewMessage('');
    }
  };

  const filteredMessages = messages.filter(message =>
    message.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogOUt = () => {
    const refreshToken = Storage.getRefreshToken()
    AuthService.authLogout(refreshToken).then((response) => {
      if(response.status === 200){
        toastInfo("Logged Out.")
        navigate('/')
        Storage.removeTokenData()
      }
    }).catch(e => {
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
        {filteredMessages.map((message) => (
          <div key={message.id} className="mb-4 p-2 border-b-2 border-b-slate-300">
            <div className="text-sm text-gray-600">{message.user} - {message.time}</div>
            <div className="bg-blue-500 text-white p-2 rounded-lg inline-block">
              {message.text}
            </div>
          </div>
        ))}
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
