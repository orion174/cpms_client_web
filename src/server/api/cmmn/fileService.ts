import { rawAPI } from "@/server/api/client";

export const cmmnDownloadFile = async (
    content: string, // 비지니스 분리
    fileId: number | string
): Promise<Blob> => {
    const url = `/api/${content}/file/${fileId}/download`;

    const response
        = await rawAPI.get(url, { responseType: "blob" });

    return response.data;
};