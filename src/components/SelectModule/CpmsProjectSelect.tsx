import React, { useEffect, useState } from "react";

import { projectList } from "@/server/api/setting/projectService.ts";
import type { ResProjectListDTO } from "@/types/setting/projectTypes.ts";

interface CpmsProjectProps  {
    companyId?: number;
    value: number;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    initText: string;
    classNm: string;
}

const CpmsProjectSelect: React.FC<CpmsProjectProps> = ({
    companyId = 0,
    value,
    onChange,
    initText,
    classNm
}) => {
    const [ options, setOptions ] = useState<ResProjectListDTO[]>([]);
    const [ hasAutoSelected, setHasAutoSelected ] = useState(false);

    useEffect(():void => {
        const fetchProjects = async (): Promise<void> => {
            const response = await projectList(companyId);
            setOptions(response ?? []);
        };

        fetchProjects();
    }, [companyId]);

    // 옵션이 하나만 있을 경우 자동 선택
    useEffect((): void => {
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
