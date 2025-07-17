import { useCallback, useState, useEffect } from "react";
import { CardHeader, Col, Row } from "reactstrap";

import { apiClient } from "@/core/api/client.ts";
import { useSearchParams } from "@/hook/customHook.ts";
import PaginationComponent from "@/components/TableModule/PaginationComponent.tsx";
import UserSearchBar from "@/view/page/setting/user/list/components/UserSearchBar.tsx";
import UserDataTable from "@/view/page/setting/user/list/components/UserDataTable.tsx";
import CreateUserButton from "@/view/page/setting/user/list/components/CreateUserButton.tsx";

import { PageResponse } from "@/definition/common.types.ts";
import { ReqUserListDTO, ResUserListDTO, defaultUserListParams } from "@/definition/user.types.ts";

/* 📁 사용자 데이터 목록 */
const UserList: React.FC = () => {
    const [ userList, setUserList ] = useState<ResUserListDTO[]>([]);
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ totalCnt, setTotalCnt ] = useState<number>(0);
    const [ searchParams, setSearchParams ] = useState<ReqUserListDTO>(defaultUserListParams());
    const { updateSearchParams, resetSearchParams } = useSearchParams(setSearchParams, defaultUserListParams());

    // API 호출 데이터
    const fetchUserList = useCallback(async () => {
        const request = {
            ...searchParams, pageNo: currentPage
        };

        const response
            = await apiClient.post<PageResponse<ResUserListDTO>>(`/api/user/list`, request);

        setUserList(response.content);
        setTotalCnt(response.totalElements);
    }, [searchParams, currentPage]);

    useEffect(() => {
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

export default UserList;