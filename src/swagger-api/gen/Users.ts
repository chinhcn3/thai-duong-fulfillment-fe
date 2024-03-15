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
  CreateMemberDto,
  CreateUserDto,
  CreateUsersStoreDto,
  InfinityPaginationResultTypeSwagger,
  UpdateUserDto,
  User,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Users<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerFindAllMembers
   * @request GET:/api/v1/users/members
   * @secure
   */
  usersControllerFindAllMembers = (params: RequestParams = {}) =>
    this.http.request<User[], any>({
      path: `/api/v1/users/members`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerCreateMember
   * @request POST:/api/v1/users/create_member
   * @secure
   */
  usersControllerCreateMember = (data: CreateMemberDto, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/v1/users/create_member`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerDeleteMember
   * @request DELETE:/api/v1/users/delete_member/{id}
   * @secure
   */
  usersControllerDeleteMember = (id: number, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/v1/users/delete_member/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerCreate
   * @request POST:/api/v1/users
   * @secure
   */
  usersControllerCreate = (data: CreateUserDto, params: RequestParams = {}) =>
    this.http.request<User, any>({
      path: `/api/v1/users`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerFindAll
   * @request GET:/api/v1/users
   * @secure
   */
  usersControllerFindAll = (
    query?: {
      page?: number;
      limit?: number;
      filters?: string | null;
      sort?: string | null;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<InfinityPaginationResultTypeSwagger, any>({
      path: `/api/v1/users`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerFindOne
   * @request GET:/api/v1/users/{id}
   * @secure
   */
  usersControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.http.request<CreateUsersStoreDto, any>({
      path: `/api/v1/users/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerUpdate
   * @request PATCH:/api/v1/users/{id}
   * @secure
   */
  usersControllerUpdate = (id: number, data: UpdateUserDto, params: RequestParams = {}) =>
    this.http.request<User, any>({
      path: `/api/v1/users/${id}`,
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
   * @tags Users
   * @name UsersControllerRemove
   * @request DELETE:/api/v1/users/{id}
   * @secure
   */
  usersControllerRemove = (id: number, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/v1/users/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
