export type ResponseData<T> = {
  data: T;
  statusCode: number;
  message: string;
};

// export type AxiosResponse<ResponseData<T>>
