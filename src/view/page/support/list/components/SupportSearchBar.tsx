import {
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button
} from "reactstrap";

import CommonCodeSelect from "@/components/Module/CommonCodeSelect.tsx"
import CpmsCompanySelect from "@/components/Module/CpmsCompanySelect.tsx";
import LitePicker from "@/components/Module/LitePicker.tsx";

interface SearchParams {
    searchCompanyId: number;
    searchRequestCd: number;
    searchStatusCd: number;
    searchStartDt: string;
    searchEndDt: string;
    searchTitle: string;
}

interface Props {
    authType: string;
    searchParams: SearchParams;
    updateSearchParams: (key: keyof SearchParams, value: string) => void;
    onSearch: () => void;
    onReset: () => void;
}

const SupportSearchBar: React.FC<Props> = ({
    authType,
    searchParams,
    updateSearchParams,
    onSearch,
    onReset,
}) => {
    return (
        <Form inline className="d-flex flex-wrap" style={{ gap: "0.5rem" }}>
            {authType !== "USER" && (
                <InputGroup>
                    <CpmsCompanySelect
                        selectId="searchCompanyId"
                        value={searchParams.searchCompanyId}
                        onChange={(e) => updateSearchParams("searchCompanyId", e.target.value)}
                        classNm="my-input-text form-control"
                        initText="업체 선택"
                    />
                </InputGroup>
            )}
            <InputGroup>
                <CommonCodeSelect
                    groupCode="10"
                    selectId="searchRequestCd"
                    value={searchParams.searchRequestCd}
                    onChange={(e) => updateSearchParams("searchRequestCd", e.target.value)}
                    classNm="my-input-text form-control"
                    initText="요청 선택"
                />
            </InputGroup>
            <InputGroup>
                <CommonCodeSelect
                    groupCode="20"
                    selectId="searchStatusCd"
                    value={searchParams.searchStatusCd}
                    onChange={(e) => updateSearchParams("searchStatusCd", e.target.value)}
                    classNm="my-input-text form-control"
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
            <InputGroup>
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
                <Button onClick={onSearch} color="primary">검색</Button>
                <Button onClick={onReset} color="primary" outline>초기화</Button>
            </div>
        </Form>
    );
};

export default SupportSearchBar;
