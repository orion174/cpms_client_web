import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip,
} from "reactstrap";
import { useCallback, useState, useEffect } from "react";

import { apiClient } from "@/core/api/client.ts";

import UserSearchBar from "@/view/page/setting/user/list/components/UserSearchBar.tsx";
import UserDataTable from "@/view/page/setting/user/list/components/UserDataTable.tsx";
import PaginationComponent from "@/components/TableModule/PaginationComponent.tsx";

import { defaultPage } from '@/utils/common.ts';
import { PageResponse } from "@/definition/common.types.ts";
import { ResUserListDTO, defaultUserListParams } from "@/view/page/setting/types.ts";

import team1Image from "@/assets/img/theme/team-1-800x800.jpg";
import team2Image from "@/assets/img/theme/team-2-800x800.jpg";
import team3Image from "@/assets/img/theme/team-3-800x800.jpg";
import team4Image from "@/assets/img/theme/team-4-800x800.jpg";
import angularImage from "@/assets/img/theme/angular.jpg";
import bootstrapIcon from "@/assets/img/icons/common/google.svg";

const API_URL = {
    user_list: `/api/user/list`
};

/* 📁 사용자 데이터 목록 */
const UserList: React.FC = () => {
    const [ listData, setListData ] = useState<PageResponse<ResUserListDTO>>(defaultPage());
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ totalCnt, setTotalCnt ] = useState<number>(0);
    const [ searchParams, setSearchParams ] = useState<ReqUserListDTO>(defaultUserListParams());

    // API 호출 데이터
    const fetchUserList = useCallback(async () => {
        const request = {
            ...searchParams, pageNo: currentPage
        };

        const response
            = await apiClient.post<PageResponse<ResUserListDTO>>(API_URL.user_list, request);

        setListData(response.content);
        setTotalCnt(response.totalElements);
    }, [searchParams, currentPage]);

    useEffect(() => {
        fetchUserList();
    }, [fetchUserList]);

    // 검색 입력 이벤트
    const updateSearchParams = (key: keyof typeof searchParams, value: string) => {
        setSearchParams((prev) => ({ ...prev, [key]: value }));
    };

    // 검색 초기화
    const handleClearSearch = () => {
        setSearchParams(defaultUserListParams());
    };

    return (
        <>
            {/* 사용자 검색 */}
            <UserSearchBar searchParams={searchParams}
                updateSearchParams={updateSearchParams}
                onSearch={fetchUserList}
                onReset={defaultUserListParams}
            />

            {/* 사용자 데이터 테이블 */}
            <UserDataTable listData={listData} />

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