import { Col, FormGroup, Input, Row } from "reactstrap";
import React from "react";

import SectionBorder from "@/components/FormModule/SectionBorder.tsx"
import DaumAddressInput from "@/components/FormModule/DaumAddressInput.tsx";
import CpmsAuthSelect from "@/components/SelectModule/CpmsAuthSelect.tsx";

import { ReqCompanyDTO } from "@/pages/admin/setting/company/types.ts";

interface BasicInfoSectionProps {
    reqCompanyDTO: ReqCompanyDTO;
    handleChange: (field: keyof ReqCompanyDTO, value: string | number) => void;
};

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ reqCompanyDTO, handleChange }) => {

    return (
        <>
            <h6 className="heading-small text-muted mb-4">기본 정보</h6>

            <div className="pl-lg-4">
                <Row>
                    <Col lg="4">
                        <FormGroup>
                            <label className="form-control-label">
                                업체 명 <span style={{ color: "red" }}>*</span>
                            </label>

                            <Input className="form-control-alternative" type="text" placeholder="이름을 입력하세요." maxLength={30}
                                value={reqCompanyDTO.companyNm}
                                onChange={(e) => handleChange('companyNm', e.target.value)}
                            />
                        </FormGroup>
                    </Col>

                    <Col lg="4">
                        <FormGroup>
                            <label className="form-control-label">
                                업체 등급 설정<span style={{ color: "red" }}>*</span>
                            </label>

                            <CpmsAuthSelect selectId="authType" classNm="my-custom-select form-control" initText="등급 선택"
                                value={reqCompanyDTO.authType}
                                onChange={(e) => handleChange('authType', e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col lg="4">
                        <FormGroup>
                            <label className="form-control-label">주소</label>
                            {/* 다음 주소 검색 API */}
                            <DaumAddressInput
                                zipCode={reqCompanyDTO.zipCode}
                                address={reqCompanyDTO.address}
                                onChangeZipCode={(zip) => handleChange("zipCode", zip)}
                                onChangeAddress={(addr) => handleChange("address", addr)}
                            />
                        </FormGroup>
                    </Col>

                    <Col lg="6">
                        <FormGroup>
                            <label className="form-control-label">추가 주소</label>

                            <Input type="text" className="form-control-alternative" placeholder="추가 주소를 입력하세요." maxLength={255}
                                value={reqCompanyDTO.extraAddress}
                                onChange={(e) => handleChange('extraAddress', e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col lg="4">
                        <FormGroup>
                            <label className="form-control-label">홈페이지</label>

                            <Input type="text" className="form-control-alternative" placeholder="www.example.com" maxLength={255}
                                value={reqCompanyDTO.homepage}
                                onChange={(e) => handleChange('homepage', e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </div>

            <SectionBorder />
        </>
    );
};

export default BasicInfoSection;