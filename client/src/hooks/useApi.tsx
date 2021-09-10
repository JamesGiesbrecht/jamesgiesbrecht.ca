import { useContext } from 'react'
import axios from 'axios'
import { AuthContext } from 'context/Auth'

const useApi: any = () => {
  const api = axios.create()
  const { user } = useContext(AuthContext)

  api.defaults.headers.common.Authorization = user ? `Bearer ${user.token}` : ''

  return api
}

export default useApi
