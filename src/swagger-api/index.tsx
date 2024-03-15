import { HttpClient } from "@/swagger-api/gen/http-client";
import { axiosClient } from "./axios";

import { Auth } from "@/swagger-api/gen/Auth";

import { Files } from "@/swagger-api/gen/Files";

import { Users } from "@/swagger-api/gen/Users";

export * from "./gen/data-contracts";

const httpClient = new HttpClient();
httpClient.instance = axiosClient;

export const AuthService = new Auth(httpClient);
export const FilesService = new Files(httpClient);
export const UsersService = new Users(httpClient);
