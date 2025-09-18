import { apiClient  } from "@/server/api/client.ts";
import type { ResCmmnCodeDTO } from "@/types/cmmn.ts";

export const codeList = async (
    groupCode: string
): Promise<ResCmmnCodeDTO[]> => {
    const response
        = await apiClient.get<ResCmmnCodeDTO[]>(
        '/api/code/list'
            , { params: { groupCode } }
        );

    return response ?? [];
};