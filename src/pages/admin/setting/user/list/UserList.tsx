import { CardHeader, Col, Row } from "reactstrap";
import { useCallback, useState, useEffect } from "react";

import { useSearchParams } from "@/hooks/customHook.ts";

import PaginationComponent from "@/components/TableModule/PaginationComponent.tsx";
import UserSearchBar from "@/pages/admin/setting/user/list/components/UserSearchBar.tsx";
import UserDataTable from "@/pages/admin/setting/user/list/components/UserDataTable.tsx";
import CreateUserButton from "@/pages/admin/setting/user/list/components/CreateUserButton.tsx";

import { adminUserList } from "@/server/api/user/userService.ts";
import type { ReqUserListDTO, ResUserListDTO } from "@/types/user/userTypes.ts";

/* 📁 사용자 데이터 목록 */
const UserList: React.FC = () => {
    const [ userList, setUserList ] = useState<ResUserListDTO[]>([]);
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ totalCnt, setTotalCnt ] = useState<number>(0);
    const [ searchParams, setSearchParams ] = useState<ReqUserListDTO>(defaultUserListParams());
    const { updateSearchParams, resetSearchParams } = useSearchParams(setSearchParams, defaultUserListParams());

    const fetchUserList = useCallback(async (): Promise<void> => {
        const request = {
            ...searchParams,
            pageNo: currentPage
        };

        const response = await adminUserList(request);

        setUserList(response.content);
        setTotalCnt(response.totalElements);

    }, [searchParams, currentPage]);

    useEffect((): void => {
        fetchUserList();
    }, [fetchUserList]);

    return (
        <>
            <CardHeader className="border-0">
                <Row className="align-items-center">
                    <Col md="10" className="text-left">
                        {/* 사용자 검색 */}
                        <UserSearchBar
                            searchParams={searchParams}
                            updateSearchParams={updateSearchParams}
                            resetSearchParams={resetSearchParams}
                            onSearch={fetchUserList}
                        />
                    </Col>
                    <Col md="2">
                        {/* 계정 생성 */}
                        <CreateUserButton />
                    </Col>
                </Row>
            </CardHeader>

            {/* 사용자 데이터 테이블 */}
            <UserDataTable userList={userList} />

            {/* 페이징 */}
            <PaginationComponent
                totalCnt={totalCnt}
                currentPage={currentPage}
                pageSize={10}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </>
    );
};

const defaultUserListParams = (): ReqUserListDTO => ({
    pageNo: 1,
    pageSize: 10,
    searchCompanyId: 0,
    searchAuthType: "",
    searchUseYn: "",
    searchUserNm: "",
});

export default UserList;