import { apiClient } from "@/core/api/client.ts";
import { ReqUserDTO } from "@/definition/user.types.ts";

export const saveUser = async (data: ReqUserDTO): Promise<void> => {
    await apiClient.post(`/api/user/create`, data);
};

export const updateUser = async (data: ReqUserDTO): Promise<void> => {
    await apiClient.post(`/api/user/update`, data);
};