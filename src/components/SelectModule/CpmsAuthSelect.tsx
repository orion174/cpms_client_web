import React from "react";

interface AuthSelectProps {
    value: string;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    initText: string;
    classNm: string;
};

// TODO 관리자 기능 고도화 하여, 공통코드로 관리되게 개발하기
const authCode = [
    { codeId: "ADMIN", codeNm: "관리자" },
    { codeId: "USER", codeNm: "일반" },
    { codeId: "TEMP", codeNm: "임시" }
];

const CpmsAuthSelect: React.FC<AuthSelectProps> = ({
    value,
    onChange,
    initText,
    classNm
}) => {
    return (
        <>
            <select
                value={value}
                className={classNm}
                onChange={onChange}
            >
                <option value="">{initText}</option>

                {authCode.map((option) => (
                    <option key={option.codeId} value={option.codeId}>
                        {option.codeNm}
                    </option>
                ))}
            </select>
        </>
    );
};

export default CpmsAuthSelect;