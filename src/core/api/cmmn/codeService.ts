import { apiClient  } from "@/core/api/client.ts";
import type { ResCmmnCodeDTO } from "@/types/cmmn.ts";

export const codeList
    = async (data: string): Promise<ResCmmnCodeDTO[]> => {

    const response
        = await apiClient.get<ResCmmnCodeDTO[]>(
        '/api/code/list'
        , { params: data }
    );

    return response;
};
