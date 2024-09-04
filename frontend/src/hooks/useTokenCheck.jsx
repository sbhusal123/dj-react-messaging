import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthService from "../services/authService";
import Storage from "../services/Storage";

import useToast from "./useToast";



export default function useTokenCheck(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate()
  const {toastError} = useToast()

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
          if(err.status === 401){
              AuthService.refreshToken(refreshToken).then((resp) => {
                  const newAccessToken = resp.data.access
                  Storage.updateAccessToken(newAccessToken)
                  setIsAuthenticated(true)
                  setLoading(false)
              }).catch((err) => {
                  toastError("Session expired.")
                  Storage.removeTokenData()
                  setIsAuthenticated(false)
                  setLoading(false)
                  navigate('/')
              })
          } else {
              toastError("Session expired.")
              Storage.removeTokenData()
              setIsAuthenticated(false)
              setLoading(false)
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
