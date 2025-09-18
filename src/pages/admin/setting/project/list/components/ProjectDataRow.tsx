import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import React from "react";

import type { ResProjectListDTO } from "@/types/setting/projectTypes.ts";

interface ProjectDataProps {
    index: number;
    rowData: ResProjectListDTO;
};

const UserDataRow: React.FC<ProjectDataProps> = ({ rowData, index }) => {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{rowData.companyNm}</td>
            <td>{rowData.projectNm}</td>
            <td>{rowData.projectInfo}</td>
            <td>{rowData.regDt}</td>
            <td className={rowData.progressYn === "Y" ? "text-success" : "text-danger"}>
                {rowData.progressYn === "Y" ? "진행" : "중단"}
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
                            {rowData.progressYn === "Y" ? "중단" : "진행"}
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </td>
        </tr>
    );
};

export default UserDataRow;
