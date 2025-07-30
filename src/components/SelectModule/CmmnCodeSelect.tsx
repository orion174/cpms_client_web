import React, { useEffect, useState } from "react";

import { codeList } from "@/core/api/cmmn/codeService.ts";
import type { ResCmmnCodeDTO } from "@/types/cmmn.ts";

interface CmmnCodeProps  {
    groupCode: string;
    value: number;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    initText: string;
    classNm: string;
}

const CmmnCodeSelect: React.FC<CmmnCodeProps> = ({
    groupCode = '',
    value,
    onChange,
    initText,
    classNm
}) => {
    const [ options, setOptions ] = useState<ResCmmnCodeDTO[]>([]);

    useEffect(() => {
        const fetchOptions = async (): Promise<void> => {

            const response = await codeList(groupCode);
            setOptions(response);
        };

        fetchOptions();
    }, [groupCode]);

    return (
        <select
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