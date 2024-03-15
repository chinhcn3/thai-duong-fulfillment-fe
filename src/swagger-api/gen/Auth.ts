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

import {
  AuthConfirmEmailDto,
  AuthEmailLoginDto,
  AuthEmailLoginResponseDto,
  AuthForgotPasswordDto,
  AuthRegisterLoginDto,
  AuthResetPasswordDto,
  AuthUpdateDto,
  CreateUsersStoreDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Auth<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerLogin
   * @request POST:/api/v1/auth/email/login
   */
  authControllerLogin = (data: AuthEmailLoginDto, params: RequestParams = {}) =>
    this.http.request<AuthEmailLoginResponseDto, any>({
      path: `/api/v1/auth/email/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerRegister
   * @request POST:/api/v1/auth/email/register
   */
  authControllerRegister = (data: AuthRegisterLoginDto, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/v1/auth/email/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerConfirmEmail
   * @request POST:/api/v1/auth/email/confirm
   */
  authControllerConfirmEmail = (data: AuthConfirmEmailDto, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/v1/auth/email/confirm`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerForgotPassword
   * @request POST:/api/v1/auth/forgot/password
   */
  authControllerForgotPassword = (data: AuthForgotPasswordDto, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/v1/auth/forgot/password`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerResetPassword
   * @request POST:/api/v1/auth/reset/password
   */
  authControllerResetPassword = (data: AuthResetPasswordDto, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/v1/auth/reset/password`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerMe
   * @request GET:/api/v1/auth/me
   * @secure
   */
  authControllerMe = (params: RequestParams = {}) =>
    this.http.request<CreateUsersStoreDto, any>({
      path: `/api/v1/auth/me`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerUpdate
   * @request PATCH:/api/v1/auth/me
   * @secure
   */
  authControllerUpdate = (data: AuthUpdateDto, params: RequestParams = {}) =>
    this.http.request<CreateUsersStoreDto, any>({
      path: `/api/v1/auth/me`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerDelete
   * @request DELETE:/api/v1/auth/me
   * @secure
   */
  authControllerDelete = (params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/v1/auth/me`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerRefresh
   * @request POST:/api/v1/auth/refresh
   * @secure
   */
  authControllerRefresh = (params: RequestParams = {}) =>
    this.http.request<CreateUsersStoreDto, any>({
      path: `/api/v1/auth/refresh`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerLogout
   * @request POST:/api/v1/auth/logout
   * @secure
   */
  authControllerLogout = (params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/v1/auth/logout`,
      method: "POST",
      secure: true,
      ...params,
    });
}
