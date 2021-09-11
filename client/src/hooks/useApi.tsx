import { useContext, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from 'context/Auth'

const api = axios.create()

const useApi: any = () => {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      const getToken = async () => {
        api.defaults.headers.common.Authorization = `Bearer ${await user.getIdToken()}`
      }
      getToken()
    } else {
      api.defaults.headers.common.Authorization = ''
    }
  }, [user])

  return api
}

export default useApi
