import { apiClient } from "@/core/api/client.ts";
import type { ReqUserDTO } from "@/pages/admin/setting/user/types.ts";

export const saveUser = async (data: ReqUserDTO): Promise<void> => {
    await apiClient.post(`/api/user/create`, data);
};