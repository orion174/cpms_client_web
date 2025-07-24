import {
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button
} from "reactstrap";

import CmmnCodeSelect from "@/components/SelectModule/CmmnCodeSelect.tsx"
import CpmsCompanySelect from "@/components/SelectModule/CpmsCompanySelect.tsx";
import LitePicker from "@/components/CmmnModule/LitePicker.tsx";

import type { ReqSupportListDTO } from "../../types";

interface Props {
    authType: string;
    searchParams: ReqSupportListDTO;
    updateSearchParams: (key: keyof ReqSupportListDTO, value: string) => void;
    resetSearchParams: () => void;
    onSearch: () => void;
};

const SupportSearchBar: React.FC<Props> = ({
    authType,
    searchParams,
    updateSearchParams,
    resetSearchParams,
    onSearch,
}) => {
    return (
        <Form inline className="d-flex flex-wrap" style={{ gap: "0.5rem" }}>
            {authType == "ADMIN" && (
                <InputGroup>
                    <CpmsCompanySelect
                        value={searchParams.searchCompanyId}
                        onChange={(e) => updateSearchParams("searchCompanyId", e.target.value)}
                        classNm="my-custom-select"
                        initText="업체 선택"
                    />
                </InputGroup>
            )}
            <InputGroup>
                <CmmnCodeSelect
                    groupCode="10"
                    value={searchParams.searchRequestCd}
                    onChange={(e) => updateSearchParams("searchRequestCd", e.target.value)}
                    classNm="my-custom-select"
                    initText="요청 선택"
                />
            </InputGroup>

            <InputGroup>
                <CmmnCodeSelect
                    groupCode="20"
                    value={searchParams.searchStatusCd}
                    onChange={(e) => updateSearchParams("searchStatusCd", e.target.value)}
                    classNm="my-custom-select"
                    initText="처리상태 선택"
                />
            </InputGroup>

            <InputGroup className="input-group-dynamic-2date">
                <LitePicker
                    inputId="searchDate"
                    singleMode={false}
                    placeholder="등록일 범위 선택"
                    onDateChange={(startDate, endDate) => {
                        updateSearchParams("searchStartDt", startDate);
                        updateSearchParams("searchEndDt", endDate || "");
                    }}
                />
                <InputGroupAddon addonType="append">
                    <InputGroupText>
                        <i className="ni ni-calendar-grid-58 text-primary" />
                    </InputGroupText>
                </InputGroupAddon>
            </InputGroup>

            <InputGroup className="input-title">
                <Input
                    id="searchTitle"
                    type="text"
                    className="my-input-text"
                    placeholder="문의 제목 입력"
                    value={searchParams.searchTitle}
                    onChange={(e) => updateSearchParams("searchTitle", e.target.value)}
                />
            </InputGroup>

            <div className="d-flex gap-2">
                <Button onClick={onSearch} color="primary">
                    검색
                </Button>
                <Button onClick={resetSearchParams} color="primary" outline>
                    초기화
                </Button>
            </div>
        </Form>
    );
};

export default SupportSearchBar;
