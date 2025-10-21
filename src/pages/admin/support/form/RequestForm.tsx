import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, InputGroupText, InputGroupAddon, InputGroup } from "reactstrap";
import { useState, useRef } from "react";

import useModalHook from "@/hooks/useModal";
import { useCancelNavigation } from "@/hooks/customHook";

import SmartEditor, { SmartEditorHandle } from "@/components/CmmnModule/SmartEditor";
import LitePicker from "@/components/CmmnModule/LitePicker";
import Empty from "@/layout/StatusArea/Empty";
import CmmnCodeSelect from "@/components/SelectModule/CmmnCodeSelect";
import CpmsCompanySelect from "@/components/SelectModule/CpmsCompanySelect";
import CpmsProjectSelect from "@/components/SelectModule/CpmsProjectSelect";
import RequestFile from "./components/RequestFile";

import { saveSupportRequestApi } from "@/server/api/support/service";
import type { FileItem, NewFileItem } from "@/types/cmmn";
import type { ReqSupportDTO } from "@/types/support/types";

const RequestForm: React.FC = () => {
    const { openCustomModal } = useModalHook();
    const confirmCancel = useCancelNavigation(true);

    const searchParams = new URLSearchParams(location.search);
    const formType = searchParams.get('formType') ?? 'insert';

    const [ formData, setFormData ] = useState<ReqSupportDTO>(getInitSupport());
    const [ fileList, setFileList ] = useState<FileItem[]>([]);

    const editorRef = useRef<SmartEditorHandle>(null);

    // 폼 데이터 매핑
    const handleInputChange = (key: keyof typeof formData, value: string): void => {
        setFormData((prev) => ({
            ...prev
            , [key]: value
        }));
    };

    // 유지보수 문의 저장 이벤트
    const handleSave = (): void => {
        let message = "";

        if (!formData.requestCompanyId) message = "요청 업체를 선택하세요."
        else if (!formData.requestProjectId) message = "프로젝트를 선택하세요.";
        else if (!formData.requestCd) message = "요청 유형을 선택하세요.";
        else if (!formData.supportTitle) message = "제목을 입력하세요.";
        else if (!formData.statusCd) message = "처리 상태를 선택하세요.";
        else if (!formData.requestDate) message = "처리 기한을 선택하세요.";

        if (message) {
            openCustomModal({
                title: "알림",
                message,
                isConfirm: false
            });

            return;
        }

        openCustomModal({
            title: "확인",
            message: "저장하시겠습니까?",
            isConfirm: true,
            onConfirm: (): void => {
                if (formType === "insert") saveSupportRequest();
            },
        });
    };

    // 유지보수 문의 저장
    const saveSupportRequest = async (): Promise<void> => {
        const data = new FormData();

        Object
            .entries(formData)
            .forEach(([key, value]) => {
                data.append(key, value.toString());
            });

        // 네이버 에디터 입력 데이터
        const content = editorRef.current?.getContent() ?? "";
        data.append("supportEditor", content);

        fileList
            .filter((file): file is NewFileItem => file.isNew && !!file.file)
            .forEach((file) => file.file && data.append("supportFile", file.file));

        await saveSupportRequestApi(data);

        openCustomModal({
            title: "알림",
            message: "저장이 완료되었습니다.",
            isConfirm: false,
            redirectUrl: "/admin/support/list",
        });
    };

    return (
        <>
            <Empty/>

            <Container className="mt--7" fluid>
                <Row>
                    <Col xl="12">
                        <Card className="card-profile shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        {formType === "insert" &&
                                            <h2 className="mb-0">프로젝트 문의</h2>
                                        }
                                    </Col>
                                    <Col xs="4" className="text-right">
                                        <Button
                                            color="default"
                                            onClick={confirmCancel}
                                        >
                                            목록
                                        </Button>
                                        <Button
                                            color="success"
                                            onClick={handleSave}
                                        >
                                            저장
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <div className="pl-lg-4">
                                        <h3 className="heading mb-4">문의 정보</h3>
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label">요청 업체</label>

                                                    <CpmsCompanySelect
                                                        value={formData.requestCompanyId}
                                                        onChange={
                                                            (e) => handleInputChange("requestCompanyId", e.target.value)
                                                        }
                                                        initText="요청 업체 선택"
                                                        classNm="my-custom-select form-control"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label">문의 프로젝트</label>

                                                    <CpmsProjectSelect
                                                        value={formData.requestProjectId}
                                                        onChange={
                                                            (e) => handleInputChange("requestProjectId", e.target.value)
                                                        }
                                                        classNm="my-custom-select form-control"
                                                        initText="프로젝트 선택"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label">요청 유형</label>

                                                    <CmmnCodeSelect
                                                        groupCode="10"
                                                        value={formData.requestCd}
                                                        onChange={
                                                            (e) => handleInputChange("requestCd", e.target.value)
                                                        }
                                                        classNm="my-custom-select form-control"
                                                        initText="요청 유형 선택"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label">처리 기한</label>

                                                    <InputGroup>
                                                        <LitePicker
                                                            placeholder="처리 기한 선택"
                                                            onDateChange={
                                                                (startDate) => handleInputChange("requestDate", startDate)
                                                            }
                                                        />
                                                        <InputGroupAddon addonType="append">
                                                            <InputGroupText>
                                                                <i className="ni ni-calendar-grid-58 text-primary" />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label">처리 상태</label>

                                                    <CmmnCodeSelect
                                                        groupCode="20"
                                                        value={formData.statusCd}
                                                        onChange={
                                                            (e) => handleInputChange("statusCd", e.target.value)
                                                        }
                                                        classNm="my-custom-select form-control"
                                                        initText="처리 상태 선택"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="pl-lg-4 section-space">
                                        <h3 className="heading mb-4">상세 요청 내용</h3>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label className="form-control-label">요청 제목</label>

                                                    <Input
                                                        type="text"
                                                        className="my-input-text"
                                                        placeholder="문의하실 글의 제목을 입력하세요."
                                                        value={formData.supportTitle}
                                                        onChange={
                                                            (e) => handleInputChange("supportTitle", e.target.value)
                                                        }
                                                        maxLength={50}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label className="form-control-label">상세 내용</label>
                                                    
                                                    <SmartEditor
                                                        id="editorTxt"
                                                        row={20}
                                                        ref={editorRef}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>

                                    <RequestFile
                                        formType={formType}
                                        fileList={fileList}
                                        setFileList={setFileList}
                                    />
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

const getInitSupport = (): ReqSupportDTO => ({
    requestCompanyId: 0,
    requestProjectId: 0,
    requestCd: 0,
    statusCd: 3, // 초기에는 접수대기
    supportTitle: "",
    requestDate: "",
});

export default RequestForm;