import React from "react";
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { ResUserListDTO } from "@/view/page/setting/types.ts";

interface UserRowProps {
    rowData: ResUserListDTO;
};

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
                    <i className="bg-info" /> 임시계정
                </Badge>
            );
    }
};

const UserDataRow: React.FC<UserRowProps> = ({ rowData }) => {
    return (
        <tr>
            <td>{rowData.companyNm}</td>
            <td>{getAuthBadge(rowData.authType)}</td>
            <td>{rowData.userNm}</td>
            <td>{rowData.userDept}</td>
            <td>{rowData.userPos}</td>
            <td>{rowData.useYn === "Y" ? "사용" : "미사용"}</td>
            <td className="text-right">
                <UncontrolledDropdown>
                    <DropdownToggle
                        className="btn-icon-only text-light"
                        href="#pablo"
                        role="button"
                        size="sm"
                        color=""
                        onClick={(e) => e.preventDefault()}
                    >
                        <i className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
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
                            계정정지
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </td>
        </tr>
    );
};

export default UserDataRow;
