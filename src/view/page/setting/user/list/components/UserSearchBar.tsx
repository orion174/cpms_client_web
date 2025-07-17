import { Button, Form, Input, InputGroup } from "reactstrap";

import CpmsCompanySelect from "@/components/SelectModule/CpmsCompanySelect.tsx";
import CpmsAuthSelect from "@/components/SelectModule/CpmsAuthSelect.tsx";
import CmmnUseYnSelect from "@/components/SelectModule/CmmnUseYnSelect.tsx";

import { ReqUserListDTO } from "@/definition/user.types.ts";

interface UserSearchProps {
    searchParams: ReqUserListDTO;
    updateSearchParams: (key: keyof ReqUserListDTO, value: string) => void;
    resetSearchParams: () => void;
    onSearch: () => void;
};

const UserSearchBar:React.FC<UserSearchProps> = ({ searchParams, updateSearchParams, resetSearchParams, onSearch }) => {
    return (
        <>
            <Form inline className="d-flex flex-wrap" style={{ gap: "0.5rem" }} onSubmit={(e) => e.preventDefault()}>
                <InputGroup>
                    <CpmsCompanySelect
                        selectId="searchCompanyId"
                        value={searchParams.searchCompanyId}
                        onChange={(e) => updateSearchParams("searchCompanyId", e.target.value)}
                        classNm="my-custom-select"
                        initText="업체 선택"
                    />
                </InputGroup>
                <InputGroup>
                    <CpmsAuthSelect
                        selectId="searchAuthType"
                        value={searchParams.searchAuthType}
                        onChange={(e) => updateSearchParams("searchAuthType", e.target.value)}
                        classNm="my-custom-select"
                        initText="권한 선택"
                    />
                </InputGroup>
                <InputGroup>
                    <CmmnUseYnSelect
                        selectId="searchUseYn"
                        value={searchParams.searchUseYn}
                        onChange={(e) => updateSearchParams("searchUseYn", e.target.value)}
                        classNm="my-custom-select"
                        initText="상태"
                    />
                </InputGroup>
                <InputGroup className="input-title">
                    <Input
                        id="searchUserNm"
                        type="text"
                        className="my-input-text"
                        placeholder="이름(닉네임) 입력"
                        value={searchParams.searchUserNm}
                        onChange={(e) => updateSearchParams("searchUserNm", e.target.value)}
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

export default UserSearchBar;