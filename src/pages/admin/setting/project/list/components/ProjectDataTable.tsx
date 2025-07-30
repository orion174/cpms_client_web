import React from 'react';
import { Table } from 'reactstrap';

import TableEmpty from "@/components/TableModule/TableEmpty.tsx";
import ProjectDataRow from './ProjectDataRow.tsx';

import type { ResProjectListDTO } from "@/types/admin/projectTypes.ts";

interface ProjectListProps {
    projectList: ResProjectListDTO[];
};

const UserDataTable: React.FC<ProjectListProps> = ({ projectList }) => {
    return (
        <>
            <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        <th className="col-type">No.</th>
                        <th className="col-type">회사 명</th>
                        <th className="col-type">프로젝트 명</th>
                        <th className="col-type">프로젝트 정보</th>
                        <th className="col-type">등록일</th>
                        <th className="col-type">상태</th>
                        <th className="col-type" style={{ width: "1px" }}></th>
                    </tr>
                </thead>
                <tbody>
                    {projectList.length > 0
                        ? projectList.map((row, idx) => (
                            <ProjectDataRow key={row.projectId} index={idx} rowData={row} />
                        ))
                        : <TableEmpty colSpan={7} />
                    }

                    {/* 임시 : 빈 행 추가 (10개 채우기) */}
                    {Array.from({ length: Math.max(0, 10 - projectList.length) }).map((_, idx) => (
                        <tr key={`empty-${idx}`}>
                            <td colSpan={7} style={{ height: "48px" }}></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default UserDataTable;