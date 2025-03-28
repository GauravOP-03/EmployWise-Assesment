import axios from "axios";
import { User } from "@/types";
const base_url = "https://reqres.in/api";

export const fetchUser = (page: number) =>
  axios.get(`${base_url}/users?page=${page}`);

export const deleteUser = (id: number) =>
  axios.delete(`${base_url}/users/${id}`);

export const updateUser = (
  id: string | undefined,
  updatedData: Partial<User>
) => axios.put(`${base_url}/users/${id}`, updatedData);
