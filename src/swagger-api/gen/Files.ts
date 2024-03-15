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

import { CreateUsersStoreDto } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Files<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Files
   * @name FilesControllerUploadFile
   * @request POST:/api/v1/files/upload
   * @secure
   */
  filesControllerUploadFile = (
    data: {
      /** @format binary */
      file?: File;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<any, any>({
      path: `/api/v1/files/upload`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Files
   * @name FilesControllerDownload
   * @request GET:/api/v1/files/{path}
   */
  filesControllerDownload = (path: string, params: RequestParams = {}) =>
    this.http.request<CreateUsersStoreDto, any>({
      path: `/api/v1/files/${path}`,
      method: "GET",
      format: "json",
      ...params,
    });
}
