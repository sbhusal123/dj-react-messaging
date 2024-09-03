import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthService from "../services/authService";
import Storage from "../services/Storage";

import useToast from "./useToast";



export default function useTokenCheck(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const { toastError } = useToast()

  const navigate = useNavigate()

  const validateToken = useCallback(() => {
      const accessToken = Storage.getAccessToken();

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
          console.log("errror", err)
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
