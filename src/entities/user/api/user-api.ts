import { apiInstance } from "@/shared/api";
import { User } from "../model/types";

export const getUsers = () =>
  apiInstance.get<User[]>("/users").then((res) => res.data);

export const getUserById = (id: string) =>
  apiInstance.get<User>(`/users/${id}`).then((res) => res.data);

export const createUser = (data: Omit<User, "id" | "createdAt">) =>
  apiInstance.post<User>("/users", data).then((res) => res.data);

export const updateUser = (id: string, data: Partial<Omit<User, "id">>) =>
  apiInstance.put<User>(`/users/${id}`, data).then((res) => res.data);

export const deleteUser = (id: string) =>
  apiInstance.delete(`/users/${id}`);