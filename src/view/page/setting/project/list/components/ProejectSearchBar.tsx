import { Button, Form, Input, InputGroup } from "reactstrap";

import CmmnUseYnSelect from "@/components/SelectModule/CmmnUseYnSelect.tsx";
import CpmsCompanySelect from "@/components/SelectModule/CpmsCompanySelect.tsx";
import { ReqProjectListDTO } from "@/definition/project.types";

interface ProjectSearchProps {
    searchParams: ReqProjectListDTO;
    updateSearchParams: (key: keyof ReqProjectListDTO, value: string) => void;
    resetSearchParams: () => void;
    onSearch: () => void;
};

const ProjectSearchBar: React.FC<ProjectSearchProps> = ({
    searchParams, updateSearchParams, resetSearchParams, onSearch
}) => {
    return (
        <>
            <Form inline className="d-flex flex-wrap" style={{ gap: "0.5rem" }} onSubmit={(e) => e.preventDefault()} >
                <InputGroup>
                    <CpmsCompanySelect
                        selectId="companyId"
                        value={searchParams.companyId}
                        onChange={(e) => updateSearchParams("companyId", e.target.value)}
                        classNm="my-custom-select"
                        initText="업체 선택"
                    />
                </InputGroup>
                <InputGroup>
                    <CmmnUseYnSelect
                        selectId="progressYn"
                        value={searchParams.progressYn}
                        onChange={(e) => updateSearchParams("progressYn", e.target.value)}
                        classNm="my-custom-select"
                        initText="상태 선택"
                    />
                </InputGroup>
                <InputGroup className="input-title">
                    <Input
                        id="projectNm"
                        type="text"
                        className="my-input-text"
                        placeholder="프로젝트명 입력"
                        value={searchParams.projectNm}
                        onChange={(e) => updateSearchParams("projectNm", e.target.value)}
                    />
                </InputGroup>

                <div className="d-flex gap-2">
                    <Button type="button" onClick={onSearch} color="default" className="px-3 py-2">검색</Button>
                    <Button type="button" onClick={resetSearchParams} color="default" outline className="px-3 py-2">초기화</Button>
                </div>
            </Form>
        </>
    );
};

export default ProjectSearchBar;