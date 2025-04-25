import React, { useEffect, useState } from "react";

import { ResCommonCodeDTO } from "@/definition/commonType.ts";
import { apiClient } from "@/server/apiClient";

interface CommonCodeProps  {
    groupId: string;
    selectId: string;
    value: number;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    initText: string;
    classNm: string;
}

const CommonCodeSelect: React.FC<CommonCodeProps> = ({ groupId, selectId, value, onChange, initText, classNm }) => {
    const [options, setOptions] = useState<ResCommonCodeDTO[]>([]);

    // 공통 코드 조회 API 호출
    const fetchComCodeList = async (groupId: string): Promise<ResCommonCodeDTO[]> => {
        const endPoint = `/api/code/list`;

        return apiClient.post<ResCommonCodeDTO[]>(endPoint, {
            groupId: groupId ?? '',
        });
    };

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await fetchComCodeList(groupId);
                setOptions(response);
            } catch (error) {
                console.error('공통코드 조회 실패' + error);
            }
        };

        fetchOptions();
    }, [groupId]);

    return (
        <select
            id={selectId}
            value={value}
            onChange={onChange}
            className={classNm}
        >
            <option value="0">{initText}</option>
            {options.map((option) => (
                <option key={option.codeId} value={option.codeId}>
                    {option.codeNm}
                </option>
            ))}
        </select>
    );
};

export default CommonCodeSelect;