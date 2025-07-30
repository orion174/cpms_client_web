import { Col, FormGroup, Input, Row } from "reactstrap";

import CpmsCompanySelect from "@/components/SelectModule/CpmsCompanySelect.tsx";
import SectionBorder from "@/components/FormModule/SectionBorder.tsx";

import type { ReqUserDTO } from "@/types/user/userTypes.ts";

interface CompanyInfoSectionProps {
    reqUserDTO: ReqUserDTO;
    handleChange: (field: keyof ReqUserDTO, value: string | number) => void;
};

const CompanyInfoSection: React.FC<CompanyInfoSectionProps> = ({ reqUserDTO, handleChange }) => {

    return (
        <>
            <h6 className="heading-small text-muted mb-4">소속 회사 정보</h6>

            <div className="pl-lg-4">
                <Row>
                    <Col lg="4">
                        <FormGroup>
                            <label className="form-control-label">
                                소속업체 <span style={{ color: "red" }}>*</span>
                            </label>

                            <CpmsCompanySelect
                                classNm="my-custom-select form-control"
                                initText="회사 선택"
                                value={reqUserDTO.companyId}
                                onChange={(e) => handleChange('companyId', e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg="4">
                        <FormGroup>
                            <label className="form-control-label">부서</label>

                            <Input
                                type="text"
                                className="form-control-alternative"
                                placeholder="부서명을 입력하세요."
                                maxLength={30}
                                value={reqUserDTO.userDept}
                                onChange={(e) => handleChange('userDept', e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg="4">
                        <FormGroup>
                            <label className="form-control-label">직급</label>

                            <Input
                                type="text"
                                className="form-control-alternative"
                                placeholder="직급을 입력하세요."
                                maxLength={30}
                                value={reqUserDTO.userPos}
                                onChange={(e) => handleChange('userPos', e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </div>

            <SectionBorder />
        </>
    );
};

export default CompanyInfoSection;