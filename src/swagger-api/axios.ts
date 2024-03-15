import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import qs from "qs";

import { isAxiosKeepException, isAxiosSilent } from "./helper";
import Cookies from "js-cookie";
import _ from "lodash";
import { message } from "antd";
import { parse } from "cookie";
import { IncomingMessage } from "http";

const isServer = () => {
  const isServer = typeof window === "undefined";
  return isServer;
};
export type ResponseData<T> = {
  data: T;
  statusCode: number;
  message: string;
};
const defaultConfig: AxiosRequestConfig<any> = {
  timeout: 60000,
  withCredentials: true,
  baseURL: isServer() ? process.env.APP_BE : undefined,
};

const getErrorCode = (error: Types.ExtAxiosError) =>
  error?.response?.data?.statusCode || error?.response?.status || 200;

const getErrorMsg = (error: Types.ExtAxiosError) =>
  error?.response?.data?.message || error?.response?.status;

const addRequestInterceptors = (
  instance: AxiosInstance,
  req?: IncomingMessage
) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
      if (!isServer()) {
        const token = Cookies.get("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        const csrfToken = Cookies.get("csrfToken");
        if (csrfToken) {
          config.headers["csrfToken"] = csrfToken;
        }
        const storeId = Cookies.get("storeid");
        if (storeId) {
          config.headers["storeId"] = storeId;
        }
      } else {
        const cookies = parse(config.headers["Cookie"] || "");

        const token = cookies.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        if (cookies?.storeid) {
          config.headers["storeId"] = cookies?.storeid;
        }
        if (cookies?.csrfToken) {
          config.headers["csrfToken"] = cookies?.csrfToken;
        }
      }
      (config as any).paramsSerializer = (params: any) => {
        return qs.stringify(params, {
          arrayFormat: "brackets",
          encode: false,
        });
      };
      return config;
    },
    (error: any) => {
      console.error(getErrorMsg(error));
      return Promise.reject(error);
    }
  );
};

let deletePromise: any = null;
const getDeletePromise = (instance: AxiosInstance) => {
  if (!deletePromise) {
    deletePromise = instance.post("/api/v1/auth/logout").finally(() => {
      setTimeout(() => {
        deletePromise = null;
      }, 500);
    });
  }
  return deletePromise;
};
const onDeleteToken = async (instance: AxiosInstance) => {
  try {
    await getDeletePromise(instance); // delete token
  } catch (e2) {
    // console.error('Error on logout', e2)
  } finally {
    // clearSessionCookie()
  }
};

let refreshPromise: Types.Nullable<Promise<{ data: any }>>;
const getRefreshPromise = async (instance: AxiosInstance) => {
  if (refreshPromise) return refreshPromise;
  refreshPromise = instance.post("/api/v1/auth/refresh").finally(() => {
    setTimeout(() => {
      refreshPromise = null;
    }, 500);
  });
  return refreshPromise;
};

const addResponseInterceptors = (instance: AxiosInstance) => {
  const interceptorId = instance.interceptors.response.use(
    (response: AxiosResponse<ResponseData<any>>) => {
      if (
        response.config.url?.includes("/auth/email/login") &&
        response.data.data.token
      ) {
        // Lưu token vào localStorage hoặc Redux store
        Cookies.set("token", response.data.data.token, {
          expires: 1,
        });

        if (!_.isEmpty(response.data.data.infoTokenStore)) {
          Cookies.set("csrfToken", response.data.data.infoTokenStore?.token, {
            expires: 1,
          });
          Cookies.set("storeid", response.data.data.infoTokenStore?.store?.id, {
            expires: 1,
          });
        }
      }

      return response;
    },
    async (error) => {
      if (
        ![401, 403].includes(getErrorCode(error)) &&
        isAxiosKeepException(error.config)
      ) {
        return Promise.reject(error);
      }
      if (!isAxiosSilent(error.config) || !isAxiosKeepException(error.config)) {
        const errorMsg = getErrorMsg(error);
        !isServer() && message.error(errorMsg);
      }
      instance.interceptors.response.eject(interceptorId);
      !isServer() && localStorage.removeItem("csrfToken");
      try {
        // await getRefreshPromise(instance); // refresh token
        // return instance.request(error.config); // resume api
      } catch (e) {
        console.warn("Error on refresh token, going to logout", e);
        onDeleteToken(instance);
      } finally {
        addResponseInterceptors(instance);
        // getRouter().reload()
      }
    }
  );
};

export const createAxiosClient = (
  config: AxiosRequestConfig = defaultConfig
) => {
  const instance = axios.create(config);
  addRequestInterceptors(instance);
  addResponseInterceptors(instance);
  return instance;
};

/**
 * api with interceptors
 */
export const axiosClient = createAxiosClient();
