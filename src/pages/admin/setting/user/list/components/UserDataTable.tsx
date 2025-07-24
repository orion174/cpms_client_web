import React from 'react';
import { Table } from 'reactstrap';

import TableEmpty from "@/components/TableModule/TableEmpty.tsx";
import UserDataRow from "@/pages/admin/setting/user/list/components/UserDataRow.tsx";

import { ResUserListDTO } from "@/pages/admin/setting/user/types.ts";

interface UserListProps {
    userList: ResUserListDTO[];
};

const UserDataTable: React.FC<UserListProps> = ({ userList }) => {
    return (
        <>
            <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        <th className="col-type">No.</th>
                        <th className="col-type">권한등급</th>
                        <th className="col-type">이름(닉네임)</th>
                        <th className="col-type">소속 업체명</th>
                        <th className="col-type">부서</th>
                        <th className="col-type">직급</th>
                        <th className="col-type">가입일</th>
                        <th className="col-type">상태</th>
                        <th className="col-type" style={{ width: "1px" }}></th>
                    </tr>
                </thead>
                <tbody>
                    {userList.length > 0
                        ? userList.map((row, idx) => (
                            <UserDataRow key={row.userId} index={idx} rowData={row} />
                        ))
                        : <TableEmpty colSpan={9} />
                    }

                    {/* 임시 : 빈 행 추가 (10개 채우기) */}
                    {Array.from({ length: Math.max(0, 10 - userList.length) }).map((_, idx) => (
                        <tr key={`empty-${idx}`}>
                            <td colSpan={9} style={{ height: "48px" }}></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default UserDataTable;