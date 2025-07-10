import React from 'react';
import { Table } from 'reactstrap';

import TableEmpty from "@/components/TableModule/TableEmpty.tsx";
import { ResUserListDTO } from "@/view/page/setting/types.ts";
import UserDataRow from "@/view/page/setting/user/list/components/UserDataRow.tsx"

interface UserListProps {
    listData: ResUserListDTO[];
};

const UserDataTable: React.FC<UserListProps> = ({ listData }) => {
    console.log("user data", listData);
    return (
        <>
            <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        <th scope="col">소속 업체명</th>
                        <th scope="col">등급</th>
                        <th scope="col">이름</th>
                        <th scope="col">부서</th>
                        <th scope="col">직급</th>
                        <th scope="col">사용유무</th>
                        <th scope="col"/>
                    </tr>
                </thead>
                <tbody>
                    {listData.length > 0
                        ? listData.map((row) => (
                            <UserDataRow key={row.userId} rowData={row} />
                        ))
                        : <TableEmpty colSpan={7} />
                    }

                    {/* 임시 : 빈 행 추가 (10개 채우기) */}
                    {Array.from({ length: Math.max(0, 10 - listData.length) }).map((_, idx) => (
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