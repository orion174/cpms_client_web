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
    Col, InputGroupText, InputGroupAddon, InputGroup,
} from "reactstrap";
import { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';

import Header from "@/components/Headers/Header.jsx";

import { getEditorContent, initializeSmartEditor } from "@/utils/smartEditor.js";
import FileUpload from "@/components/Module/FileUpload.tsx";
import ComCodeSelect from "@/components/Module/ComCodeSelect.tsx";
import LitePicker from "@/components/Module/LitePicker.tsx";
import useModalHook from '@/hook/useModal';

import { callAPI } from "@/utils/interceptor";

// 등록/수정 UI 분기
interface FormType {
    formType: 'insert' | 'update';
}

// 첨부파일 인터페이스
interface FileItem {
    id: number;
    file: File;
    name: string;
}

/**
 * 유지보수 신규 등록 / 수정 폼
 * @constructor
 */
const SuportForm: React.FC = () => {
    // 폼 이동
    const location = useLocation();
    const {formType} = location.state as FormType;

    // Redux 기반 커스텀 알림 모달
    const {openCustomModal} = useModalHook();

    // 파일 리스트 상태
    const [fileList, setFileList] = useState<FileItem[]>([]);

    // 파일 리스트 변경 시 호출되는 함수
    const handleFileChange = (files: FileItem[]) => {
        setFileList(files);
    };

    // 에디터 관련
    const oEditors = useRef<never[]>([]);

    useEffect(() => {
        const loadScripts = () => {
            const editorScript = document.createElement('script');

            editorScript.src = '/smarteditor/js/HuskyEZCreator.js';
            editorScript.type = 'text/javascript';
            editorScript.charset = 'utf-8';

            editorScript.onload = () => {
                initializeSmartEditor('editorTxt', oEditors.current)
                    .then(() => {
                        console.log("SmartEditor가 성공적으로 초기화되었습니다.");
                    })
                    .catch((error: Error) => {
                        console.error('SmartEditor 초기화 중 오류 발생:', error);
                    });
            };

            document.body.appendChild(editorScript);

            return () => {
                document.body.removeChild(editorScript);
            };
        };

        loadScripts();
    }, []);

    // 목록으로 이동
    const handleList = () => {
        openCustomModal({
            title: '알림',
            message: '목록으로 돌아가겠습니까?',
            isConfirm: false,
            redirectUrl: '/admin/suport',
        });
    }

    // 입력 데이터 상태관리
    const [companyId, setCompanyId] = useState("");
    const [projectId, setProjectId] = useState("");
    const [requestCd, setRequestCd] = useState<string>("10");
    const [statusCd, setStatusCd] = useState<string>("10");
    const [suportTitle, setSuportTitle] = useState("");

    // 작성된 내용을 저장한다.
    const handleSave = () => {
        // 필수 값
        if (!companyId) {
            openCustomModal({ title: '알림', message: '업체를 선택해주세요.', isConfirm: false });
            return;
        }
        if (!projectId) {
            openCustomModal({ title: '알림', message: '프로젝트를 선택해주세요.', isConfirm: false });
            return;
        }
        if (!requestCd) {
            openCustomModal({ title: '알림', message: '요청 유형을 선택해주세요.', isConfirm: false });
            return;
        }
        if (!statusCd) {
            openCustomModal({ title: '알림', message: '처리 상태를 선택해주세요.', isConfirm: false });
            return;
        }
        if (!suportTitle) {
            openCustomModal({ title: '알림', message: '제목을 입력해주세요.', isConfirm: false });
            return;
        }

        openCustomModal({
            title: '확인',
            message: '저장하시겠습니까?',
            isConfirm: true,
            onConfirm: () => {
                if (formType === 'insert') {
                    insertReqSupport();
                }
            }
        });
    };

    // 유지보수 문의 저장 액션
    const insertReqSupport = async () => {
        const formData = new FormData();

        formData.append("reqCompanyId", companyId);
        formData.append("reqProjectId", projectId);
        formData.append("requestCd", requestCd);
        formData.append("reqDate", (document.getElementById("reqDate") as HTMLInputElement).value);
        formData.append("statusCd", statusCd);
        formData.append("suportTitle", suportTitle);

        const editorContent = getEditorContent(oEditors.current);
        formData.append("suportEditor", editorContent);

        fileList.forEach((fileItem) => {
            formData.append("suportFile", fileItem.file);
        });

        // API 호출
        const response = await callAPI.post("/api/suport/insert", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        // 저장 성공 시
        if (response.status === 200) {
            openCustomModal({
                title: '알림',
                message: '저장이 완료되었습니다.',
                isConfirm: false,
                redirectUrl: '/admin/suport',
            });
        }
    };

    return (
        <>
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        {formType === 'insert' && (
                                            <h2 className="mb-0">프로젝트 문의</h2>
                                        )}
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="default"
                                            onClick={handleList}
                                        >목록
                                        </Button>
                                        <Button
                                            color="info"
                                            onClick={handleSave}
                                        >저장
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <div className="pl-lg-4">
                                        <h3 className="heading text-muted mb-4">기본 정보</h3>
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="">업체 선택</label>
                                                    <Input id="companyId" type="select" className="my-input-text"
                                                           value={companyId} onChange={(e) => setCompanyId(e.target.value)}
                                                    >
                                                        <option value="">선택</option>
                                                        <option value="1">강남구청</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="">프로젝트 선택</label>
                                                    <Input id="projectId" type="select" className="my-input-text"
                                                           value={projectId} onChange={(e) => setProjectId(e.target.value)}
                                                    >
                                                        <option value="">선택</option>
                                                        <option value="1">강남구청 행정포털</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="">요청유형 선택</label>
                                                    <ComCodeSelect
                                                        masterCodeId="10"
                                                        selectId="requestCd"
                                                        value={requestCd}
                                                        onChange={(e) => setRequestCd(e.target.value)}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="">처리 기한</label>
                                                    <InputGroup>
                                                        <LitePicker initDay={7} inputId="reqDate" />
                                                        <InputGroupAddon addonType="append">
                                                            <InputGroupText>
                                                                <i className="ni ni-calendar-grid-58 text-primary"/>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="">처리상태</label>
                                                    <ComCodeSelect
                                                        masterCodeId="20"
                                                        selectId="statusCd"
                                                        value={statusCd}
                                                        onChange={(e) => setStatusCd(e.target.value)}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                {formType !== 'insert' && (
                                                    <FormGroup>
                                                        <label className="form-control-label" htmlFor="">담당자</label>
                                                        <Input id="userId" type="select" className="my-input-text">
                                                            <option value="">선택</option>
                                                        </Input>
                                                    </FormGroup>
                                                )}
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="pl-lg-4">
                                        <h3 className="heading text-muted mb-4">요청 상세 작성</h3>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="">요청 제목</label>
                                                    <Input
                                                        id="suportTitle"
                                                        type="text"
                                                        className="my-input-text"
                                                        value={suportTitle}
                                                        onChange={(e) => setSuportTitle(e.target.value)}
                                                        placeholder="문의하실 글의 제목을 입력하세요."
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="">상세 내용</label>
                                                    <div id="smarteditor">
                                                        <textarea
                                                            name="editorTxt"
                                                            id="editorTxt"
                                                            rows={20}
                                                            cols={10}
                                                            style={{width: '100%'}}
                                                        />
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        <FileUpload formType="insert" onFileChange={handleFileChange}/>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default SuportForm;
