import { Col, FormGroup, Input, Row } from "reactstrap";

import { formatPhoneNumber } from "@/utils/format.ts";
import SectionBorder from "@/components/FormModule/SectionBorder.tsx"
import IdCheckModule from "@/components/CommonModule/IdCheckModule.tsx";
import CpmsAuthSelect from "@/components/SelectModule/CpmsAuthSelect.tsx";

import { ReqUserDTO } from "@/definition/user.types.ts";

interface BasicInfoSectionProps {
    reqUserDTO: ReqUserDTO;
    handleChange: (field: keyof ReqUserDTO, value: string | number) => void;
    isIdVerified: boolean;
    setIsIdVerified: (val: boolean) => void;
};

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
    reqUserDTO, handleChange, isIdVerified, setIsIdVerified
}) => {

    return (
        <>
            <h6 className="heading-small text-muted mb-4">기본 정보</h6>

            <div className="pl-lg-4">
                <Row>
                    <Col lg="4">
                        <FormGroup>
                            <label className="form-control-label">
                                로그인 ID <span style={{ color: "red" }}>*</span>
                            </label>

                            <div className="d-flex" style={{ gap: "1rem" }}>
                                <Input type="text" className="form-control-alternative" placeholder="6글자이상의 아이디를 입력하세요."
                                    disabled={isIdVerified}
                                    value={reqUserDTO.loginId}
                                    onChange={(e) => handleChange('loginId', e.target.value)}
                                />

                                {/* 아이디 중복검사 모듈 */}
                                <IdCheckModule
                                    loginId={reqUserDTO.loginId}
                                    classNm="check-button"
                                    onValid={() => setIsIdVerified(true)}
                                />
                            </div>
                        </FormGroup>
                    </Col>

                    <Col lg="4">
                        <FormGroup>
                            <label className="form-control-label">
                                이름 <span style={{ color: "red" }}>*</span>
                            </label>

                            <Input className="form-control-alternative" type="text" placeholder="이름을 입력하세요." maxLength={20}
                                   value={reqUserDTO.userNm}
                                onChange={(e) => handleChange('userNm', e.target.value)}
                            />
                        </FormGroup>
                    </Col>

                    <Col lg="4">
                        <FormGroup>
                            <label className="form-control-label">
                                시스템 권한 <span style={{ color: "red" }}>*</span>
                            </label>

                            <CpmsAuthSelect selectId="authType" classNm="my-custom-select form-control" initText="권한 선택"
                                value={reqUserDTO.authType}
                                onChange={(e) => handleChange('authType', e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col lg="4">
                        <FormGroup>
                            <label className="form-control-label">휴대폰</label>

                            <Input type="text" className="form-control-alternative" placeholder="010-1234-5678"
                                   value={formatPhoneNumber(reqUserDTO.userPhone)}
                               onChange={(e) => handleChange('userPhone', e.target.value.replace(/[^\d]/g, '').slice(0, 11))}
                            />
                        </FormGroup>
                    </Col>

                    <Col lg="4">
                        <FormGroup>
                            <label className="form-control-label">이메일</label>

                            <Input type="email" className="form-control-alternative" placeholder="jesse@example.com" maxLength={255}
                                value={reqUserDTO.userEmail}
                                onChange={(e) => handleChange('userEmail', e.target.value)}
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