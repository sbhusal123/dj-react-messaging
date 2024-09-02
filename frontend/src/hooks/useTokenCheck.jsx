import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthService from "../services/authService";
import Storage from "../services/localStorage";

import useToast from "./useToast";



export default function useTokenCheck(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const { toastError } = useToast()

  const navigate = useNavigate()

  const validateToken = useCallback(() => {
      const accessToken = Storage.getAccessToken();
      const refreshToken = Storage.getRefreshToken();
      const isRefreshTokenPresent = Storage.isRefreshTokenPresent();

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
          if(isRefreshTokenPresent){
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
          } else {
            setIsAuthenticated(false);
            setLoading(false)
            Storage.removeTokenData()
            toastError("Logged Out")
            navigate('/')
          }
      })
  }, [])

  useEffect(() => {
    validateToken()
  }, [])

  return {
    isAuthenticated,
    isLoading
  }
}
