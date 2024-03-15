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
  descriptions?: string | null;
}

export interface Store {
  id: number;
  name: string;
  descriptions?: string | null;
}

export interface UpdateStoreDto {
  name?: string;
  descriptions?: string | null;
}

export interface Role {
  /** @example 1 */
  id: number;
  /** @example "Admin" */
  name?: string;
}

export interface Status {
  /** @example 1 */
  id: number;
  /** @example "Active" */
  name?: string;
}

export interface User {
  id: number;
  email: string | null;
  password: string;
  previousPassword: string;
  provider: string;
  socialId: string | null;
  firstName: string | null;
  lastName: string | null;
  role: Role;
  status?: Status;
  user_store: UserStore;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt: string;
}

export interface StoreRole {
  /** @example 1 */
  id: number;
  /** @example "Admin" */
  name?: string;
}

export interface UserStore {
  id: number;
  user: User;
  userId: number;
  store: Store;
  storeId: number;
  store_role?: StoreRole;
  storeRoleId: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt: string;
}

export interface CreateMemberDto {
  /** @example "test1@example.com" */
  email: string;
  password: string;
  roleStoreId: 1 | 2;
}

export interface FileEntity {
  /** @example "cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae" */
  id: string;
  path: string;
}

export interface CreateUserDto {
  /** @example "test1@example.com" */
  email: string | null;
  /** @minLength 6 */
  password?: string;
  /** @example "John" */
  firstName: string | null;
  /** @example "Doe" */
  lastName: string | null;
  photo?: FileEntity | null;
  role: Role;
  status?: Status;
  provider?: string;
  socialId?: string | null;
  hash?: string | null;
}

export interface InfinityPaginationResultTypeSwagger {
  total: number;
  data: string[];
}

export interface UpdateUserDto {
  /** @example "test1@example.com" */
  email?: string | null;
  /** @minLength 6 */
  password?: string;
  /** @example "John" */
  firstName?: string | null;
  /** @example "Doe" */
  lastName?: string | null;
  photo?: FileEntity | null;
  role?: Role;
  status?: Status;
  provider?: string;
  socialId?: string | null;
  hash?: string | null;
}

export interface AuthEmailLoginResponseDto {
  token: string;
  refreshToken: string;
  tokenExpires: string;
  user: User;
  infoTokenStore: object;
}

export interface AuthEmailLoginDto {
  /** @example "test1@example.com" */
  email: string;
  password: string;
}

export interface AuthRegisterLoginDto {
  /** @example "test1@example.com" */
  email: string;
  /** @minLength 6 */
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
  photo?: FileEntity;
  /** @example "John" */
  firstName?: string;
  /** @example "Doe" */
  lastName?: string;
  /** @minLength 6 */
  password?: string;
  oldPassword?: string;
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

export interface CreateTaskDto {
  description: string;
  orderId: number;
  /** @format date-time */
  deadline: string;
  messageTemplateId: number | null;
}

export interface PackageInfoProductsProduct {
  id: number;
  packageInfo: any;
  packageInfoId: number;
  product: Product;
  productId: number;
}

export interface Product {
  id: number;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  store: Store;
  category: Category;
  storeId: number;
  categoryId: number;
  price: number | null;
  retailPrice: number | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt: string;
  packageInfos: any[];
  packageInfoProductProducts: PackageInfoProductsProduct[];
}

export interface Category {
  /** The unique identifier of the category */
  id: number;
  /** name */
  name: string;
  /** des */
  description?: string | null;
  /** The store */
  storeId: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt: string;
  store: Store;
  products?: Product[];
}

export interface UserDto {
  email: string | null;
}
