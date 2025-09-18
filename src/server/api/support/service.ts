import { apiClient } from "@/server/api/client";
import { ReqSupportListDTO, ResSupportListDTO, ResSupportViewDTO } from "@/types/support/types";

// 문의 목록 API
export const fetchSupportListApi = async (
    reqDTO: ReqSupportListDTO
): Promise<ResSupportListDTO | null> => {
    const url = '/api/support/list';
    const response = await apiClient.get<ResSupportListDTO>(url, { params: reqDTO });

    return response;
};

// 문의 저장 API
export const saveSupportRequestApi = (
    reqFormData: FormData
): void => {
    const url = '/api/support/insert';
    apiClient.postForm(url, reqFormData);
};

// 문의글 처리상태 업데이트 API
export const updateStatusApi = async (
    supportRequestId: number
): Promise<void> => {
    const url = `/api/support/update/${supportRequestId}/status`;
    await apiClient.patch<void>(url);
};

// 문의 상세 조회 API
export const fetchSupportViewApi = async (
    supportRequestId: number
): Promise<ResSupportViewDTO | null> => {
    const url = '/api/support/view';

    return await apiClient.get<ResSupportViewDTO>(
        url, { params: { supportRequestId } }
    );
};

// 문의 응답글 삭제 API
export const deleteSupportResponseApi = async (
    supportRequestId: number
): Promise<void> => {
    const url = '/api/support/delete-response';
    await apiClient.post(url, { supportRequestId });
};

// 문의 답변 저장(수정) API
export const saveSupportResponseApi = async (
    reqFormData: FormData, editMode: boolean
): Promise<void> => {
    const url = editMode
        ? `/api/support/update-response`
        : `/api/support/insert-response`;

    await apiClient.postForm(url, reqFormData);
};

// 문의 첨부파일 삭제 API
export const deleteSupportFileApi = async (
    supportFileId: number
): Promise<void> => {
    const url = `/api/support/file/${supportFileId}/delete`;
    await apiClient.post(url);
};
