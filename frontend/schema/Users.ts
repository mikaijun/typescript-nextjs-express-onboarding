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

import { User, UserCreationParams, ValidateErrorJSON } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Users<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name GetUser
   * @request GET:/users/{userId}
   */
  getUser = (userId: number, params: RequestParams = {}) =>
    this.request<User | null, any>({
      path: `/users/${userId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @name CreateUser
   * @request POST:/users
   */
  createUser = (data: UserCreationParams, params: RequestParams = {}) =>
    this.request<void, ValidateErrorJSON>({
      path: `/users`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
