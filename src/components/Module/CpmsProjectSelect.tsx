import React, { useEffect, useState } from "react";

import { ResProjectDTO } from "@/definition/common.types.ts";
import { apiClient } from "@/core/api/client.ts";

interface CpmsProjectProps  {
    companyId?: number;
    selectId: string;
    value: number;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    initText: string;
    classNm: string;
}

const CpmsProjectSelect: React.FC<CpmsProjectProps> = ({
    companyId = 0,
    selectId,
    value,
    onChange,
    initText,
    classNm
}) => {
    const [options, setOptions] = useState<ResProjectDTO[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const endPoint = `/api/setting/project/list`;

                const response = await apiClient.post<ResProjectDTO[]>(endPoint, {
                    companyId,
                });

                setOptions(response);
            } catch (error) {
                console.error("프로젝트 목록 조회 실패:", error);
            }
        };

        fetchProjects();
    }, [companyId]);

    return (
        <select id={selectId} value={value} className={classNm} onChange={onChange}>
            <option value="0">{initText}</option>

            {options.map((option) => (
                <option key={option.projectId} value={option.projectId}>
                    {option.projectNm}
                </option>
            ))}
        </select>
    );
};

export default CpmsProjectSelect;
