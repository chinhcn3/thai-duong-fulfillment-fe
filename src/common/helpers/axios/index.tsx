import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'

const defaultConfig: AxiosRequestConfig = {
  baseURL: '/api/v1',
  timeout: 60000,
  withCredentials: true,
}

const addRequestInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      const csrfToken = localStorage.getItem('csrfToken')
      if (csrfToken) {
        config.headers['X-CSRF-TOKEN'] = csrfToken
        config.headers['Access-Control-Allow-Origin'] = '*'
      }
      config.paramsSerializer = (params) => {
        return qs.stringify(params, {
          arrayFormat: 'brackets',
          encode: false,
        })
      }
      return config
    },
    /* istanbul ignore next */
    async (error: any) => {
      // Handle show error toast
      return Promise.reject(error)
    }
  )
}

const addResponseInterceptors = (instance: AxiosInstance) => {
  const interceptorId = instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: any) => {
      // status = 403 => logout
      instance.interceptors.response.eject(interceptorId)
      addResponseInterceptors(instance)
      return Promise.reject(error)
    }
  )
}

let instance: AxiosInstance
export const getAxiosInstance = (config: AxiosRequestConfig = defaultConfig) => {
  if (!instance) {
    instance = axios.create(config)
    addRequestInterceptors(instance)
    addResponseInterceptors(instance)
  }

  return instance
}

/**
 * api with interceptors
 */
export const apiPjc = getAxiosInstance()
