import React, { useEffect, useState } from "react";

import { apiClient  } from "@/core/api/client.ts";
import { ResCommonCodeDTO } from "@/definition/common.types.ts";

interface CommonCodeProps  {
    groupCode: string;
    selectId: string;
    value: number;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    initText: string;
    classNm: string;
}

const CommonCodeSelect: React.FC<CommonCodeProps> = ({ groupCode, selectId, value, onChange, initText, classNm }) => {
    const [ options, setOptions ] = useState<ResCommonCodeDTO[]>([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const endPoint =  `/api/code/list`;

                const response = await apiClient.post<ResCommonCodeDTO[]>(endPoint, {
                    groupCode: groupCode ?? '',
                });

                setOptions(response);
            } catch (error) {
                console.error('공통코드 조회 실패:', error);
            }
        };

        fetchOptions();
    }, [groupCode]);

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