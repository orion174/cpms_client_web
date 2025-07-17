import { CardHeader, Col, Row } from "reactstrap";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useSearchParams } from "@/hook/customHook.ts";
import { defaultProjectListParams, ReqProjectListDTO, ResProjectListDTO } from "@/definition/project.types.ts";
import { fetchAdminProjectList } from "@/core/api/setting/projectService.ts";
import ProjectSearchBar from "./components/ProejectSearchBar";
import AddButton from "@/view/page/setting/project/list/components/AddButton.tsx";
import ProjectDataTable from "./components/ProjectDataTable";
import PaginationComponent from "@/components/TableModule/PaginationComponent.tsx";

/* 📁 관리 프로젝트 데이터 목록 */
const ProjectList: React.FC = () => {

    const location = useLocation();
    const [ projectList, setProjectList ] = useState<ResProjectListDTO[]>([]);
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ totalCnt, setTotalCnt ] = useState<number>(0);
    const [ searchParams, setSearchParams ] = useState<ReqProjectListDTO>(defaultProjectListParams());
    const { updateSearchParams, resetSearchParams } = useSearchParams(setSearchParams, defaultProjectListParams());

    const fetchProjectList = useCallback(async () => {
        const request = {
            ...searchParams
            , pageNo: currentPage
        };

        const response = await fetchAdminProjectList(request);

        setProjectList(response.content);
        setTotalCnt(response.totalElements);
    }, [searchParams, currentPage]);

    useEffect(() => {
        if (!location.state || location.state.reload) {
            fetchProjectList();
        }
    }, [location.state, fetchProjectList]);

    return (
        <>
            <CardHeader className="border-0">
                <Row className="align-items-center">
                    <Col md="10" className="text-left">
                        {/* 프로젝트 검색 */}
                        <ProjectSearchBar
                            searchParams={searchParams}
                            updateSearchParams={updateSearchParams}
                            resetSearchParams={resetSearchParams}
                            onSearch={fetchProjectList}
                        />
                    </Col>
                    <Col md="2">
                        {/* 프로젝트 추가 모달 버튼 */}
                        <AddButton />
                    </Col>
                </Row>
            </CardHeader>

            {/* 프로젝트 데이터 테이블 */}
            <ProjectDataTable projectList={projectList} />

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

export default ProjectList;