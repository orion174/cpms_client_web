import { Col, FormGroup, Input, Row } from "reactstrap";
import React from "react";

import CpmsCompanySelect from "@/components/SelectModule/CpmsCompanySelect.tsx";
import type { ReqProjectDTO } from "@/types/setting/projectTypes.ts";

interface ProjectModalFormProps {
    formState: ReqProjectDTO;
    handleChange: (field: keyof ReqProjectDTO, value: string | number) => void;
};

const CreateProject: React.FC<ProjectModalFormProps> = ({ formState, handleChange }) => {

    return (
        <div className="modal-body p-0">
            <Row>
                <Col lg="12">
                    <FormGroup>
                        <label className="form-control-label">업체 선택</label>

                        <CpmsCompanySelect
                            value={formState.companyId}
                            onChange={(e) => handleChange("companyId", e.target.value)}
                            initText="업체 선택"
                            classNm="my-custom-select form-control"
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col lg="12">
                    <FormGroup>
                        <label className="form-control-label">프로젝트 명</label>

                        <Input
                            type="text"
                            className="my-input-text"
                            placeholder="프로젝트 명을 입력하세요."
                            maxLength={50}
                            value={formState.projectNm}
                            onChange={(e) => handleChange("projectNm", e.target.value)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col lg="12">
                    <FormGroup>
                        <label className="form-control-label">프로젝트 정보</label>

                        <Input
                            type="textarea"
                            className="my-input-text"
                            style={{ resize: "none" }}
                            maxLength={255}
                            rows={3}
                            placeholder="프로젝트 정보를 입력하세요."
                            value={formState.projectInfo}
                            onChange={(e) => handleChange("projectInfo", e.target.value)}
                        />
                    </FormGroup>
                </Col>
            </Row>
        </div>
    );
};

export default CreateProject;
