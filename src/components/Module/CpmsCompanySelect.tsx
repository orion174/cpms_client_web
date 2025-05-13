import React, { useEffect, useState } from "react";

import { ResCompanyDTO } from "@/definition/common.types.ts";
import { apiClient } from "@/core/api/client.ts";

interface CpmsCompanyProps {
    companyId?: number;
    selectId: string;
    value: number;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    initText: string;
    classNm: string;
}

const CpmsCompanySelect: React.FC<CpmsCompanyProps> = ({
    companyId = 0,
    selectId,
    value,
    onChange,
    initText,
    classNm
}) => {
    const [ options, setOptions ] = useState<ResCompanyDTO[]>([]);

    useEffect(() => {
        const fetchCompanys = async () => {
            try {
                const endPoint = `/api/setting/company/list`;

                const jsonData = {
                    companyId: companyId ?? 0
                }

                const response = await apiClient.post<ResCompanyDTO[]>(endPoint, jsonData);

                setOptions(response)
            } catch (error) {
                console.error("업체 조회 실패: ", error);
            }
        };

        fetchCompanys();
    }, [companyId]);

    return (
        <select id={selectId} value={value} className={classNm} onChange={onChange}>
            <option value="">{initText}</option>

            {options.map((option) => (
                <option key={option.companyId} value={option.companyId}>
                    {option.companyNm}
                </option>
            ))}
        </select>
    );
};

export default CpmsCompanySelect;