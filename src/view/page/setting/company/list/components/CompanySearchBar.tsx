import { Button, Form, Input, InputGroup } from "reactstrap";

import { ReqCompanyListDTO } from "@/definition/company.types.ts";
import CmmnUseYnSelect from "@/components/SelectModule/CmmnUseYnSelect.tsx";

interface CompanySearchProps {
    searchParams: ReqCompanyListDTO;
    updateSearchParams: (key: keyof ReqCompanyListDTO, value: string) => void;
    resetSearchParams: () => void;
    onSearch: () => void;
};

const CompanySearchBar: React.FC<CompanySearchProps> = ({
    searchParams, updateSearchParams, resetSearchParams, onSearch
}) => {
    return (
        <>
            <Form inline className="d-flex flex-wrap" style={{ gap: "0.5rem" }} onSubmit={(e) => e.preventDefault()} >
                <InputGroup>
                    <CmmnUseYnSelect
                        selectId="useYn"
                        value={searchParams.useYn}
                        onChange={(e) => updateSearchParams("useYn", e.target.value)}
                        classNm="my-custom-select"
                        initText="상태"
                    />
                </InputGroup>
                <InputGroup className="input-title">
                    <Input
                        id="companyNm"
                        type="text"
                        className="my-input-text"
                        placeholder="회사명 입력"
                        value={searchParams.companyNm}
                        onChange={(e) => updateSearchParams("companyNm", e.target.value)}
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

export default CompanySearchBar;