import React from "react";

interface AuthSelectProps {
    selectId: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    initText: string;
    classNm: string;
};

const CpmsAuthSelect: React.FC<AuthSelectProps> = ({ selectId, value, onChange, initText, classNm }) => {
    // TODO 관리자 기능 고도화 하여, 공통코드로 관리되게 개발하기
    const authCode = [
        { codeId: "ADMIN", codeNm: "관리자" },
        { codeId: "USER", codeNm: "일반" },
        { codeId: "TEMP", codeNm: "임시" }
    ];

    return (
        <>
            <select id={selectId} value={value} className={classNm} onChange={onChange}>
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