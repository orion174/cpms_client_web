import React from "react";
import { Badge } from "reactstrap";

import { ResCompanyListDTO } from "@/pages/admin/setting/company/types.ts";

interface CompanyDataProps {
    index: number;
    rowData: ResCompanyListDTO;
};

const CompanyDataRow: React.FC<CompanyDataProps> = ({ rowData, index }) => {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{getAuthBadge(rowData.authType)}</td>
            <td>{rowData.companyNm}</td>
            <td>{rowData.address}</td>
            <td>{rowData.regDt}</td>
            <td className={rowData.useYn === "Y" ? "text-success" : "text-danger"}>
                {rowData.useYn === "Y" ? "사용" : "정지"}
            </td>
        </tr>
    );
};

// TODO 공통코드 기능 고도화 개발 후, 하드코딩 제거하기
const getAuthBadge = (authType: string) => {
    switch (authType) {
        case "ADMIN":
            return (
                <Badge color="" className="badge-dot mr-4">
                    <i className="bg-danger" /> 관리업체
                </Badge>
            );
        case "USER":
            return (
                <Badge color="" className="badge-dot mr-4">
                    <i className="bg-info" /> 회원업체
                </Badge>
            );
        case "TEMP":
        default:
            return (
                <Badge color="" className="badge-dot mr-4">
                    <i className="bg-gray" /> 임시그룹
                </Badge>
            );
    }
};

export default CompanyDataRow;
