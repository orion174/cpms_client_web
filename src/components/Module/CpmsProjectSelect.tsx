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
    const [ options, setOptions ] = useState<ResProjectDTO[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const endPoint = `/api/setting/project/list`;
                const jsonData = {
                    companyId: companyId ?? 0
                }

                const response = await apiClient.post<ResProjectDTO[]>(endPoint, jsonData);

                setOptions(response);

            } catch (error) {
                console.error("프로젝트 목록 조회 실패:", error);
            }
        };

        fetchProjects();
    }, [companyId]);

    // 옵션이 하나만 있을 경우 자동 선택
    useEffect(() => {
        if (options.length === 1) {
            const fakeEvent = {
                target: { value: options[0].projectId.toString() }
            } as React.ChangeEvent<HTMLSelectElement>;

            onChange(fakeEvent);
        }
    }, [options, onChange]);

    return (
        <select id={selectId} value={value} className={classNm} onChange={onChange}>
            <option value="">{initText}</option>

            {options.map((option) => (
                <option key={option.projectId} value={option.projectId}>
                    {option.projectNm}
                </option>
            ))}
        </select>
    );
};

export default CpmsProjectSelect;
