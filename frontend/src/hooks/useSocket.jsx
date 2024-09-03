import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const SOCKET_BASE_PATH = "ws://localhost:8000/ws/"


export default function useChat(){

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setLoading] = useState(true);
  
    const { toastError } = useToast()
  
    const navigate = useNavigate()
  
    const validateToken = useCallback(() => {
        const accessToken = Storage.getAccessToken();
        const refreshToken = Storage.getRefreshToken();
  
        if(!accessToken){
            navigate('/')
            setIsAuthenticated(false)
            return
        }
  
        AuthService.verifyToken(accessToken).then(data => {
            setIsAuthenticated(true);
            navigate('/chat')
            setLoading(false)
        }).catch(err => {
            AuthService.refreshToken(refreshToken).then(({data}) => {
                Storage.updateAccessToken(data.access);
                setIsAuthenticated(true);
                setLoading(false)
                navigate('/chat')
            }).catch(err => {
                setIsAuthenticated(false);
                setLoading(false)
                Storage.removeTokenData()
                toastError("Logged Out")
                navigate('/')
            })
          })

    }, [])
  
    return {
      isAuthenticated,
      isLoading
    }
    
}