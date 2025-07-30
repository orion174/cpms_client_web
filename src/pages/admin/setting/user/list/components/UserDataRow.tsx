import { Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import React from "react";

import type { ResUserListDTO } from "@/types/user/userTypes.ts";

interface UserRowProps {
    index: number;
    rowData: ResUserListDTO;
};

const UserDataRow: React.FC<UserRowProps> = ({ rowData, index }) => {

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{getAuthBadge(rowData.authType)}</td>
            <td>{rowData.userNm}</td>
            <td>{rowData.companyNm}</td>
            <td>{rowData.userDept}</td>
            <td>{rowData.userPos}</td>
            <td>{rowData.regDt}</td>
            <td className={rowData.useYn === "Y" ? "text-success" : "text-danger"}>
                {rowData.useYn === "Y" ? "사용" : "정지"}
            </td>
            <td className="text-right">
                <UncontrolledDropdown>
                    <DropdownToggle
                        className="btn-icon-only text-light" size="sm" color="" href="#pablo" role="button"
                        onClick={(e) => e.preventDefault()}
                    >
                        <i className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                            상세조회
                        </DropdownItem>
                        <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                            정보수정
                        </DropdownItem>
                        <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                            {rowData.useYn === "Y" ? "계정정지" : "재활성화"}
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
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
                    <i className="bg-danger" /> 관리자
                </Badge>
            );
        case "USER":
            return (
                <Badge color="" className="badge-dot mr-4">
                    <i className="bg-success" /> 일반회원
                </Badge>
            );
        case "TEMP":
        default:
            return (
                <Badge color="" className="badge-dot mr-4">
                    <i className="bg-info" /> 임시회원
                </Badge>
            );
    }
};

export default UserDataRow;
