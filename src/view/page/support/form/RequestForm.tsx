import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
    InputGroupText,
    InputGroupAddon,
    InputGroup
} from "reactstrap";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import useModalHook from "@/hook/useModal.ts";
import { getEditorContent, initializeSmartEditor } from "@/utils/smartEditor.js";

import Header from "@/view/layout/Headers/Header.jsx";
import CommonCodeSelect from "@/components/Module/CommonCodeSelect.tsx";
import LitePicker from "@/components/Module/LitePicker.tsx";
import CpmsCompanySelect from "@/components/Module/CpmsCompanySelect.tsx";
import CpmsProjectSelect from "@/components/Module/CpmsProjectSelect.tsx";
import RequestFile from "./components/RequestFile.tsx";

import { FileItem, NewFileItem } from "@/definition/common.types.ts";
import { apiClient } from "@/core/api/client.ts";

interface FormType {
    formType: "insert" | "update";
}

const RequestForm: React.FC = () => {
    const location = useLocation();
    const { openCustomModal } = useModalHook();

    const { formType } = location.state as FormType;

    const [ formData, setFormData ] = useState({
        requestCompanyId: 1,
        requestProjectId: 0,
        requestCd: 0,
        statusCd: 3,
        supportTitle: "",
        requestDate: "",
    });

    // const editorRef = useRef<never[]>([]);
    const oEditors = useRef<never[]>([]);
    useEffect(() => {
        const loadScripts = () => {
            const script = document.createElement("script");
            script.src = "/smarteditor/js/HuskyEZCreator.js";
            script.type = "text/javascript";
            script.charset = "utf-8";

            script.onload = () => {
                initializeSmartEditor("editorTxt", oEditors.current)
                    .then(() => console.log("SmartEditor initialized."))
                    .catch((error) => console.error("SmartEditor error:", error));
            };

            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        };

        loadScripts();
    }, []);

    const [ fileList, setFileList ] = useState<FileItem[]>([]);

    // 폼 데이터 매핑
    const handleInputChange = (key: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    // 유지보수 문의 저장 이벤트
    const handleSave = () => {
        let message = "";

        if (!formData.requestProjectId) message = "프로젝트를 선택하세요.";
        else if (!formData.requestCd) message = "요청 유형을 선택하세요.";
        else if (!formData.supportTitle) message = "제목을 입력하세요.";
        else if (!formData.statusCd) message = "처리 상태를 선택하세요.";
        else if (!formData.requestDate) message = "처리 기한을 선택하세요.";

        if (message) {
            openCustomModal({ title: "알림", message, isConfirm: false });
            return;
        }

        openCustomModal({
            title: "확인",
            message: "저장하시겠습니까?",
            isConfirm: true,
            onConfirm: () => {
                if (formType === "insert") saveSupportRequest();
            },
        });
    };

    // 유지보수 문의 저장 api
    const saveSupportRequest = async () => {
        const data = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value.toString());
        });

        data.append("supportEditor", getEditorContent(oEditors.current));

        fileList.filter((file): file is NewFileItem => file.isNew && !!file.file)
            .forEach((file) => file.file && data.append("supportFile", file.file));

        const endPoint = `/api/support/insert`;

        await apiClient.postForm<null>(endPoint, data);

        openCustomModal({
            title: "알림",
            message: "저장이 완료되었습니다.",
            isConfirm: false,
            redirectUrl: "/admin/support/list",
        });
    };

    // 목록 화면 이동
    const handleList = () => {
        openCustomModal({
            title: "알림",
            message: "목록으로 돌아가겠습니까?",
            isConfirm: true,
            redirectUrl: "/admin/support/list",
        });
    };

    return (
        <>
            <Header/>

            <Container className="mt--7" fluid>
                <Row>
                    <Col xl="12">
                        <Card className="card-profile shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        {formType === "insert" && <h2 className="mb-0">프로젝트 문의</h2>}
                                    </Col>
                                    <Col xs="4" className="text-right">
                                        <Button color="default" onClick={handleList}>목록</Button>
                                        <Button color="success" onClick={handleSave}>저장</Button>
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
                                                        selectId="requestCompanyId"
                                                        value={formData.requestCompanyId}
                                                        onChange={(e) => handleInputChange("requestCompanyId", e.target.value)}
                                                        initText="요청 업체 선택"
                                                        classNm="my-input-text form-control"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label">문의 프로젝트</label>
                                                    <CpmsProjectSelect
                                                        selectId="requestProjectId"
                                                        value={formData.requestProjectId}
                                                        onChange={(e) => handleInputChange("requestProjectId", e.target.value)}
                                                        classNm="my-input-text form-control"
                                                        initText="프로젝트 선택"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label">요청 유형</label>
                                                    <CommonCodeSelect
                                                        groupCode="10"
                                                        selectId="requestCd"
                                                        value={formData.requestCd}
                                                        onChange={(e) => handleInputChange("requestCd", e.target.value)}
                                                        classNm="my-input-text form-control"
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
                                                            inputId="requestDate"
                                                            placeholder="처리 기한 선택"
                                                            onDateChange={(startDate) => handleInputChange("requestDate", startDate)}
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
                                                    <CommonCodeSelect
                                                        groupCode="20"
                                                        selectId="statusCd"
                                                        value={formData.statusCd}
                                                        onChange={(e) => handleInputChange("statusCd", e.target.value)}
                                                        classNm="my-input-text form-control"
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
                                                        onChange={(e) => handleInputChange("supportTitle", e.target.value)}
                                                        maxLength={50}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label className="form-control-label">상세 내용</label>
                                                    <div id="smarteditor">
                                                        <textarea
                                                            name="editorTxt"
                                                            id="editorTxt"
                                                            rows={20}
                                                            style={{width: "100%"}}
                                                        />
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        {/*<RequestEditor editorRef={editorRef}/>*/}
                                    </div>

                                    <RequestFile formType={formType} fileList={fileList} setFileList={setFileList}/>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default RequestForm;