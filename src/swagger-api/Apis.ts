/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateStoreDto {
  name: string;
  descriptions: object;
}

export interface UpdateStoreDto {
  name?: string;
  descriptions?: object;
}

export interface FileEntity {
  /** @example "cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae" */
  id: string;
}

export interface Role {
  /** @example 1 */
  id: number;
  /** @example "Admin" */
  name: string;
}

export interface Status {
  /** @example 1 */
  id: number;
  /** @example "Active" */
  name: string;
}

export interface CreateUserDto {
  /** @example "test1@example.com" */
  email: object;
  password: string;
  /** @example "John" */
  firstName: object;
  /** @example "Doe" */
  lastName: object;
  photo: FileEntity;
  role: Role;
  status: Status;
}

export interface UpdateUserDto {
  /** @example "test1@example.com" */
  email?: object;
  password?: string;
  /** @example "John" */
  firstName?: object;
  /** @example "Doe" */
  lastName?: object;
  photo?: FileEntity;
  role?: Role;
  status?: Status;
}

export interface AuthEmailLoginDto {
  /** @example "test1@example.com" */
  email: string;
  password: string;
}

export interface AuthRegisterLoginDto {
  /** @example "test1@example.com" */
  email: string;
  password: string;
  /** @example "John" */
  firstName: string;
  /** @example "Doe" */
  lastName: string;
}

export interface AuthConfirmEmailDto {
  hash: string;
}

export interface AuthForgotPasswordDto {
  email: string;
}

export interface AuthResetPasswordDto {
  password: string;
  hash: string;
}

export interface AuthUpdateDto {
  photo: FileEntity;
  /** @example "John" */
  firstName: string;
  /** @example "Doe" */
  lastName: string;
  password: string;
  oldPassword: string;
}

export type CreateUsersStoreDto = object;

export type UpdateUsersStoreDto = object;

export interface AuthFacebookLoginDto {
  /** @example "abc" */
  accessToken: string;
}

export interface AuthGoogleLoginDto {
  /** @example "abc" */
  idToken: string;
}

export interface AuthTwitterLoginDto {
  /** @example "abc" */
  accessTokenKey: string;
  /** @example "abc" */
  accessTokenSecret: string;
}

export interface AuthAppleLoginDto {
  /** @example "abc" */
  idToken: string;
  firstName?: string;
  lastName?: string;
}

export type CreateStoreRoleDto = object;

export type UpdateStoreRoleDto = object;

export type CreateTaskDto = object;

export interface UserDto {
  email: object;
}

export type Store = object;

export type Couple = object;

export interface TaskDto {
  id: number;
  name: string;
  descriptions: object;
  status: object;
  userId: number;
  storeId: number;
  user: UserDto;
  store: Store;
  couple: Couple;
  coupleId: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface TaskResponseDto {
  tasks: TaskDto[];
  total: number;
}

export type UpdateTaskDto = object;

export type CreateOrderDto = object;

export type UpdateOrderDto = object;

export type CreateProductDto = object;

export type UpdateProductDto = object;

export type CreatePackageDto = object;

export type UpdatePackageDto = object;

export type CreateCoupleDto = object;

export type UpdateCoupleDto = object;

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title API
 * @version 1.0
 * @contact
 *
 * API docs
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Home
   * @name HomeControllerAppInfo
   * @request GET:/
   */
  homeControllerAppInfo = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: "GET",
      ...params,
    });

  api = {
    /**
     * No description
     *
     * @tags Stores
     * @name StoresControllerCreate
     * @request POST:/api/v1/stores
     * @secure
     */
    storesControllerCreate: (data: CreateStoreDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/stores`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Stores
     * @name StoresControllerFindAll
     * @request GET:/api/v1/stores
     * @secure
     */
    storesControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/stores`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Stores
     * @name StoresControllerFindOne
     * @request GET:/api/v1/stores/{id}
     * @secure
     */
    storesControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/stores/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Stores
     * @name StoresControllerUpdate
     * @request PATCH:/api/v1/stores/{id}
     * @secure
     */
    storesControllerUpdate: (id: string, data: UpdateStoreDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/stores/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Stores
     * @name StoresControllerRemove
     * @request DELETE:/api/v1/stores/{id}
     * @secure
     */
    storesControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/stores/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerCreate
     * @request POST:/api/v1/users
     * @secure
     */
    usersControllerCreate: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/users`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerFindAll
     * @request GET:/api/v1/users
     * @secure
     */
    usersControllerFindAll: (
      query?: {
        page?: number;
        limit?: number;
        filters?: string;
        sort?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/users`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerFindOne
     * @request GET:/api/v1/users/{id}
     * @secure
     */
    usersControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/users/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerUpdate
     * @request PATCH:/api/v1/users/{id}
     * @secure
     */
    usersControllerUpdate: (id: number, data: UpdateUserDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/users/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerRemove
     * @request DELETE:/api/v1/users/{id}
     * @secure
     */
    usersControllerRemove: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/users/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Files
     * @name FilesControllerUploadFile
     * @request POST:/api/v1/files/upload
     * @secure
     */
    filesControllerUploadFile: (
      data: {
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/files/upload`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Files
     * @name FilesControllerDownload
     * @request GET:/api/v1/files/{path}
     */
    filesControllerDownload: (path: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/files/${path}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogin
     * @request POST:/api/v1/auth/email/login
     */
    authControllerLogin: (data: AuthEmailLoginDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/email/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRegister
     * @request POST:/api/v1/auth/email/register
     */
    authControllerRegister: (data: AuthRegisterLoginDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/email/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerConfirmEmail
     * @request POST:/api/v1/auth/email/confirm
     */
    authControllerConfirmEmail: (data: AuthConfirmEmailDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/email/confirm`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerForgotPassword
     * @request POST:/api/v1/auth/forgot/password
     */
    authControllerForgotPassword: (data: AuthForgotPasswordDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/forgot/password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerResetPassword
     * @request POST:/api/v1/auth/reset/password
     */
    authControllerResetPassword: (data: AuthResetPasswordDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/reset/password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerMe
     * @request GET:/api/v1/auth/me
     * @secure
     */
    authControllerMe: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/me`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerUpdate
     * @request PATCH:/api/v1/auth/me
     * @secure
     */
    authControllerUpdate: (data: AuthUpdateDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/me`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerDelete
     * @request DELETE:/api/v1/auth/me
     * @secure
     */
    authControllerDelete: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/me`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRefresh
     * @request POST:/api/v1/auth/refresh
     * @secure
     */
    authControllerRefresh: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/refresh`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogout
     * @request POST:/api/v1/auth/logout
     * @secure
     */
    authControllerLogout: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersStoresControllerCreate
     * @request POST:/api/users-stores
     */
    usersStoresControllerCreate: (data: CreateUsersStoreDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users-stores`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersStoresControllerFindAll
     * @request GET:/api/users-stores
     */
    usersStoresControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users-stores`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersStoresControllerFindOne
     * @request GET:/api/users-stores/{id}
     */
    usersStoresControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users-stores/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersStoresControllerUpdate
     * @request PATCH:/api/users-stores/{id}
     */
    usersStoresControllerUpdate: (id: string, data: UpdateUsersStoreDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users-stores/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersStoresControllerRemove
     * @request DELETE:/api/users-stores/{id}
     */
    usersStoresControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users-stores/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthFacebookControllerLogin
     * @request POST:/api/v1/auth/facebook/login
     */
    authFacebookControllerLogin: (data: AuthFacebookLoginDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/facebook/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthGoogleControllerLogin
     * @request POST:/api/v1/auth/google/login
     */
    authGoogleControllerLogin: (data: AuthGoogleLoginDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/google/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthTwitterControllerLogin
     * @request POST:/api/v1/auth/twitter/login
     */
    authTwitterControllerLogin: (data: AuthTwitterLoginDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/twitter/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthAppleControllerLogin
     * @request POST:/api/v1/auth/apple/login
     */
    authAppleControllerLogin: (data: AuthAppleLoginDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/apple/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name StoreRolesControllerCreate
     * @request POST:/api/store-roles
     */
    storeRolesControllerCreate: (data: CreateStoreRoleDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/store-roles`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name StoreRolesControllerFindAll
     * @request GET:/api/store-roles
     */
    storeRolesControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/store-roles`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name StoreRolesControllerFindOne
     * @request GET:/api/store-roles/{id}
     */
    storeRolesControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/store-roles/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name StoreRolesControllerUpdate
     * @request PATCH:/api/store-roles/{id}
     */
    storeRolesControllerUpdate: (id: string, data: UpdateStoreRoleDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/store-roles/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name StoreRolesControllerRemove
     * @request DELETE:/api/store-roles/{id}
     */
    storeRolesControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/store-roles/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @name TasksControllerCreate
     * @request POST:/api/v1/tasks
     */
    tasksControllerCreate: (data: CreateTaskDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/tasks`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name TasksControllerFindAll
     * @request GET:/api/v1/tasks
     */
    tasksControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/tasks`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name TasksControllerFindTasks
     * @summary Get all task
     * @request GET:/api/v1/tasks/filters
     */
    tasksControllerFindTasks: (
      query: {
        storeId: number;
        limit: number;
        page: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<TaskResponseDto, any>({
        path: `/api/v1/tasks/filters`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name TasksControllerFindOne
     * @request GET:/api/v1/tasks/{id}
     */
    tasksControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/tasks/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name TasksControllerUpdate
     * @request PATCH:/api/v1/tasks/{id}
     */
    tasksControllerUpdate: (id: string, data: UpdateTaskDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/tasks/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name TasksControllerRemove
     * @request DELETE:/api/v1/tasks/{id}
     */
    tasksControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/tasks/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @name OrdersControllerCreate
     * @request POST:/api/orders
     */
    ordersControllerCreate: (data: CreateOrderDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/orders`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name OrdersControllerFindAll
     * @request GET:/api/orders
     */
    ordersControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/orders`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name OrdersControllerFindOne
     * @request GET:/api/orders/{id}
     */
    ordersControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/orders/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name OrdersControllerUpdate
     * @request PATCH:/api/orders/{id}
     */
    ordersControllerUpdate: (id: string, data: UpdateOrderDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/orders/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name OrdersControllerRemove
     * @request DELETE:/api/orders/{id}
     */
    ordersControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/orders/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @name ProductsControllerCreate
     * @request POST:/api/v1/products
     */
    productsControllerCreate: (data: CreateProductDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/products`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name ProductsControllerFindAll
     * @request GET:/api/v1/products
     */
    productsControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/products`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name ProductsControllerFindOne
     * @request GET:/api/v1/products/{id}
     */
    productsControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/products/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name ProductsControllerUpdate
     * @request PATCH:/api/v1/products/{id}
     */
    productsControllerUpdate: (id: string, data: UpdateProductDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/products/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name ProductsControllerRemove
     * @request DELETE:/api/v1/products/{id}
     */
    productsControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/products/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @name PackagesControllerCreate
     * @request POST:/api/packages
     */
    packagesControllerCreate: (data: CreatePackageDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/packages`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name PackagesControllerFindAll
     * @request GET:/api/packages
     */
    packagesControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/packages`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name PackagesControllerFindOne
     * @request GET:/api/packages/{id}
     */
    packagesControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/packages/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name PackagesControllerUpdate
     * @request PATCH:/api/packages/{id}
     */
    packagesControllerUpdate: (id: string, data: UpdatePackageDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/packages/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name PackagesControllerRemove
     * @request DELETE:/api/packages/{id}
     */
    packagesControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/packages/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @name CouplesControllerCreate
     * @request POST:/api/couples
     */
    couplesControllerCreate: (data: CreateCoupleDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/couples`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name CouplesControllerFindAll
     * @request GET:/api/couples
     */
    couplesControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/couples`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name CouplesControllerFindOne
     * @request GET:/api/couples/{id}
     */
    couplesControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/couples/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name CouplesControllerUpdate
     * @request PATCH:/api/couples/{id}
     */
    couplesControllerUpdate: (id: string, data: UpdateCoupleDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/couples/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name CouplesControllerRemove
     * @request DELETE:/api/couples/{id}
     */
    couplesControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/couples/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
}
