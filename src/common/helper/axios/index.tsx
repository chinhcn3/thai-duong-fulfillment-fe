/**
 * NOTEs :
 * - swagger gen and axios always on top
 * - do not circulation import
 * - always import lib directly from index file
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import {serviceOptions} from "../../open-api/swagger.gen";

import { setSessionCookie } from '../cookie'


const defaultConfig: AxiosRequestConfig = {
  timeout: 180000,
  withCredentials: true,
}

export const getErrorStatus = (error: any) =>
  // @ts-ignore
  error?.response?.data?.errors?.[0]?.status || error?.response?.status || ''

export const getErrorCode = (error: any) =>
  // @ts-ignore
  error?.response?.data?.errors?.[0]?.code || error?.code

const addRequestInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const csrfToken = localStorage.getItem('csrfToken')
      if (csrfToken && config.headers) {
        config.headers['X-CSRF-TOKEN'] = csrfToken
        config.headers['Access-Control-Allow-Origin'] = '*'
        config.headers['Accept-Language'] = 'ja-JP,ja-JP;q=0.9,en-US;q=0.8'
      }
      config.paramsSerializer = (params) => {
        return qs.stringify(params, {
          arrayFormat: 'brackets',
        })
      }
      return config
    },
    /* istanbul ignore next */
    async (error) => {
      // show toast
      return Promise.reject(error)
    }
  )
}

const addResponseInterceptors = (axiosInstance: AxiosInstance) => {
  const interceptorId = axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
   // process logic here

      axiosInstance.interceptors.response.eject(interceptorId)
      try {
        addResponseInterceptors(axiosInstance)
        return axiosInstance.request(error.config) // resume api
      } catch (e) {
        addResponseInterceptors(axiosInstance)
        return Promise.reject(error)
      }
    }
  )
}

let instance: AxiosInstance
export const injectInstance = (config: AxiosRequestConfig = defaultConfig) => {
  if (!instance) {
    instance = axios.create(config)
    addRequestInterceptors(instance)
    addResponseInterceptors(instance)
  }
  serviceOptions.axios = instance
  return instance
}

/**
 * api with interceptors
 */
export const apiPjc = injectInstance()
