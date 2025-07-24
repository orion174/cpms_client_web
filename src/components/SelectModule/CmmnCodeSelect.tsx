import React, { useEffect, useState } from "react";

import { apiClient  } from "@/core/api/client.ts";
import type { ResCommonCodeDTO } from "@/types/cmmn.ts";

interface CommonCodeProps  {
    groupCode: string;
    selectId?: string;
    value: number;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    initText: string;
    classNm: string;
}

const CmmnCodeSelect: React.FC<CommonCodeProps> = ({
    groupCode,
    selectId,
    value,
    onChange,
    initText,
    classNm
}) => {
    const [ options, setOptions ] = useState<ResCommonCodeDTO[]>([]);

    useEffect(() => {
        const fetchOptions = async (): Promise<void> => {
            const jsonData = {
                groupCode: groupCode ?? '',
            };

            const response
                = await apiClient.post<ResCommonCodeDTO[]>('/api/code/list', jsonData);

            setOptions(response);
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

export default CmmnCodeSelect;