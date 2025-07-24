import React, { useEffect, useState } from "react";
import { apiClient } from "@/core/api/client.ts";
import type { ResProjectDTO } from "@/types/cmmn.ts";

interface CpmsProjectProps  {
    companyId?: number;
    selectId?: string;
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
    const [ hasAutoSelected, setHasAutoSelected ] = useState(false);

    useEffect(() => {
        const fetchProjects = async (): Promise<void> => {
            const jsonData = {
                companyId: companyId ?? 0
            };

            const response
                = await apiClient.post<ResProjectDTO[]>('/api/setting/project/list', jsonData);

            setOptions(response);
        };

        fetchProjects();
    }, [companyId]);

    // 옵션이 하나만 있을 경우 자동 선택
    useEffect(() => {
        if (options.length === 1 && !hasAutoSelected) {
            const fakeEvent = {
                target: { value: options[0].projectId.toString() }
            } as React.ChangeEvent<HTMLSelectElement>;

            onChange(fakeEvent);
            setHasAutoSelected(true);
        }
    }, [options, onChange]);

    return (
        <select
            id={selectId}
            value={value}
            className={classNm}
            onChange={onChange}
        >
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
