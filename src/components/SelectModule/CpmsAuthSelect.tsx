import React, { useEffect, useState } from "react";

import { cpmsAuthList } from "@/server/api/auth/service";
import type { ResAuthDTO } from "@/types/auth/types";

interface AuthSelectProps {
    value: string;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    initText: string;
    classNm: string;
};

const CpmsAuthSelect: React.FC<AuthSelectProps> = ({
    value,
    onChange,
    initText,
    classNm
}) => {
    const [ authCode, setAuthCode ] = useState<ResAuthDTO[]>([]);

    useEffect((): void => {
        const fetchOptions
            = async (): Promise<void> => {
                const response = await cpmsAuthList();
                setAuthCode(response ?? []);
            };

        fetchOptions();
    }, []); // 처음 마운트 될때만 호출


    return (
        <>
            <select
                value={value}
                className={classNm}
                onChange={onChange}
            >
                <option value="">{initText}</option>

                {authCode.map((option) => (
                    <option key={option.authType} value={option.authType}>
                        {option.authNm}
                    </option>
                ))}
            </select>
        </>
    );
};

export default CpmsAuthSelect;